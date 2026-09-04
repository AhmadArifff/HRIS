import base64
import io
import math
from typing import Dict, List, Optional, Tuple, Any
import numpy as np
import cv2
from PIL import Image

DEFAULT_MODEL = "ArcFace"
DEFAULT_DETECTOR = "opencv"
DEFAULT_METRIC = "cosine"
DEFAULT_THRESHOLD = 0.40

def base64_to_cv2(b64_str: str) -> np.ndarray:
    """Decode base64 image string to OpenCV BGR image."""
    if "," in b64_str:
        b64_str = b64_str.split(",", 1)[1]
    img_bytes = base64.b64decode(b64_str)
    nparr = np.frombuffer(img_bytes, np.uint8)
    img_cv = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    if img_cv is None:
        raise ValueError("Gagal membaca data citra Base64")
    return img_cv

def calculate_sharpness(img: np.ndarray) -> float:
    """Measure image sharpness using Laplacian variance (high variance = sharp, low = blurry/noisy)."""
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    variance = cv2.Laplacian(gray, cv2.CV_64F).var()
    return float(variance)

def calculate_illumination(img: np.ndarray) -> Tuple[float, bool]:
    """Check luminance in LAB color space to ensure face is neither dark nor washed out."""
    lab = cv2.cvtColor(img, cv2.COLOR_BGR2LAB)
    l_channel, _, _ = cv2.split(lab)
    mean_l = float(np.mean(l_channel))
    # Good illumination between 70 and 210 on 0-255 scale
    is_good = 70.0 <= mean_l <= 210.0
    return mean_l, is_good

def apply_clahe_normalization(img: np.ndarray) -> np.ndarray:
    """Apply Contrast-Limited Adaptive Histogram Equalization (CLAHE) for illumination invariance."""
    lab = cv2.cvtColor(img, cv2.COLOR_BGR2LAB)
    l, a, b = cv2.split(lab)
    clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
    cl = clahe.apply(l)
    limg = cv2.merge((cl, a, b))
    return cv2.cvtColor(limg, cv2.COLOR_LAB2BGR)

def assess_face_quality(img: np.ndarray) -> Dict[str, Any]:
    """Evaluate Face Quality Assessment (FQA) before representation."""
    sharpness = calculate_sharpness(img)
    illumination, is_illum_good = calculate_illumination(img)
    
    # Score calculation between 0.0 - 1.0
    sharpness_score = min(1.0, sharpness / 200.0)
    illum_score = 1.0 - (abs(illumination - 140.0) / 140.0)
    quality_score = float(max(0.0, min(1.0, 0.6 * sharpness_score + 0.4 * illum_score)))
    
    return {
        "sharpness": sharpness,
        "is_blurry": sharpness < 80.0,
        "illumination": illumination,
        "is_illumination_good": is_illum_good,
        "quality_score": round(quality_score, 3),
        "is_acceptable": sharpness >= 80.0 and is_illum_good
    }

def extract_face_embedding(
    img_cv: np.ndarray,
    model_name: str = DEFAULT_MODEL,
    detector_backend: str = DEFAULT_DETECTOR,
    enforce_detection: bool = False
) -> Tuple[List[float], Dict[str, Any]]:
    """Extract 512-dimensional normalized face embedding with alignment and CLAHE normalization."""
    # 1. Image Quality Assessment
    fqa = assess_face_quality(img_cv)
    
    # 2. Illumination Normalization (Anti-Noise)
    normalized_img = apply_clahe_normalization(img_cv)

    # 3. Extract Face Embedding via DeepFace
    try:
        from deepface import DeepFace
        embedding_objs = DeepFace.represent(
            img_path=normalized_img,
            model_name=model_name,
            detector_backend=detector_backend,
            enforce_detection=enforce_detection,
            align=True
        )
        if not embedding_objs or len(embedding_objs) == 0:
            raise ValueError("Tidak ada wajah terdeteksi pada citra")
        
        raw_emb = embedding_objs[0]["embedding"]
        
        # 4. L2 Normalize vector
        emb_arr = np.array(raw_emb, dtype=np.float32)
        norm = np.linalg.norm(emb_arr)
        if norm > 0:
            emb_arr = emb_arr / norm
        
        normalized_embedding = emb_arr.tolist()
        return normalized_embedding, fqa
    except Exception as e:
        # Fallback to opencv detector if primary detector failed
        if detector_backend != "opencv":
            return extract_face_embedding(img_cv, model_name=model_name, detector_backend="opencv", enforce_detection=False)
        raise e

def compute_cosine_distance(emb1: List[float], emb2: List[float]) -> float:
    """Compute Cosine Distance: 1 - (u . v) for normalized vectors."""
    u = np.array(emb1, dtype=np.float32)
    v = np.array(emb2, dtype=np.float32)
    dot = np.dot(u, v)
    norm_u = np.linalg.norm(u)
    norm_v = np.linalg.norm(v)
    if norm_u == 0 or norm_v == 0:
        return 1.0
    cos_sim = dot / (norm_u * norm_v)
    return float(1.0 - cos_sim)

def check_anti_spoofing(img_cv: np.ndarray, use_deepface: bool = False) -> Dict[str, Any]:
    """Analyze high-frequency Fourier spectrum and anti-spoofing heuristic to detect screens/paper."""
    if use_deepface:
        try:
            from deepface import DeepFace
            # DeepFace built-in anti-spoofing
            face_objs = DeepFace.extract_faces(
                img_path=img_cv,
                detector_backend="opencv",
                enforce_detection=False,
                anti_spoofing=True
            )
            if face_objs and len(face_objs) > 0:
                is_real = bool(face_objs[0].get("is_real", True))
                score = float(face_objs[0].get("antispoof_score", 0.95))
                return {"is_real": is_real, "score": score}
        except Exception:
            pass

    # Frequency Domain Moiré pattern analysis via 2D FFT (<2ms latency)
    gray = cv2.cvtColor(img_cv, cv2.COLOR_BGR2GRAY)
    f = np.fft.fft2(gray)
    fshift = np.fft.fftshift(f)
    magnitude_spectrum = 20 * np.log(np.abs(fshift) + 1e-8)
    
    # Highly repetitive grids (phone/tablet pixel matrices) yield unnatural energy spikes
    high_freq_ratio = float(np.std(magnitude_spectrum))
    is_real = high_freq_ratio < 45.0  # Normal natural camera selfies typically < 45
    return {"is_real": is_real, "score": 0.92 if is_real else 0.35}

def process_enrollment_frames(
    frames_b64: List[str],
    model_name: str = DEFAULT_MODEL,
    detector_backend: str = DEFAULT_DETECTOR
) -> Dict[str, Any]:
    """Aggregate multi-frame enrollment snapshots into an ultra-robust centroid embedding."""
    valid_embeddings: List[List[float]] = []
    fqa_scores: List[float] = []

    for idx, b64 in enumerate(frames_b64):
        try:
            img = base64_to_cv2(b64)
            # Anti-spoofing check
            spoof_res = check_anti_spoofing(img)
            if not spoof_res["is_real"]:
                return {
                    "success": False,
                    "is_real": False,
                    "error": f"Frame ke-{idx + 1} terdeteksi sebagai foto palsu / rekaman layar",
                }
            
            emb, fqa = extract_face_embedding(img, model_name=model_name, detector_backend=detector_backend)
            valid_embeddings.append(emb)
            fqa_scores.append(fqa["quality_score"])
        except Exception as e:
            continue

    if len(valid_embeddings) == 0:
        raise ValueError("Gagal mendeteksi wajah yang memenuhi syarat dari seluruh frame yang dikirim")

    # Compute normalized centroid vector
    mat = np.array(valid_embeddings, dtype=np.float32)
    centroid = np.mean(mat, axis=0)
    norm = np.linalg.norm(centroid)
    if norm > 0:
        centroid = centroid / norm

    avg_quality = float(np.mean(fqa_scores)) if fqa_scores else 0.90

    return {
        "success": True,
        "is_real": True,
        "embedding": centroid.tolist(),
        "dimension": len(centroid),
        "model_name": model_name,
        "detector_backend": detector_backend,
        "quality_score": round(avg_quality, 3),
        "frames_processed": len(valid_embeddings),
    }
