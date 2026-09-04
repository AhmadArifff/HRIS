import os
import time
from typing import List, Optional
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import uvicorn

try:
    from src.pipeline import (
        DEFAULT_MODEL,
        DEFAULT_DETECTOR,
        DEFAULT_THRESHOLD,
        base64_to_cv2,
        extract_face_embedding,
        compute_cosine_distance,
        check_anti_spoofing,
        process_enrollment_frames,
        assess_face_quality,
    )
except ImportError:
    from pipeline import (
        DEFAULT_MODEL,
        DEFAULT_DETECTOR,
        DEFAULT_THRESHOLD,
        base64_to_cv2,
        extract_face_embedding,
        compute_cosine_distance,
        check_anti_spoofing,
        process_enrollment_frames,
        assess_face_quality,
    )

app = FastAPI(
    title="HRIS Enterprise Biometrics Service (DeepFace Engine)",
    version="1.0.0",
    description="High-Accuracy, Low-Latency & Noise-Resistant Face Biometric Engine",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request Models
class RepresentRequest(BaseModel):
    image_base64: str
    model_name: Optional[str] = DEFAULT_MODEL
    detector_backend: Optional[str] = DEFAULT_DETECTOR

class VerifyRequest(BaseModel):
    image1_base64: Optional[str] = None
    image2_base64: Optional[str] = None
    embedding1: Optional[List[float]] = None
    embedding2: Optional[List[float]] = None
    threshold: Optional[float] = DEFAULT_THRESHOLD

class EnrollRequest(BaseModel):
    employee_id: str
    images_base64: List[str] = Field(..., min_length=1)
    model_name: Optional[str] = DEFAULT_MODEL
    detector_backend: Optional[str] = DEFAULT_DETECTOR

class AntiSpoofRequest(BaseModel):
    image_base64: str

# Endpoints
@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "hris-biometrics-service",
        "engine": "DeepFace",
        "default_model": DEFAULT_MODEL,
        "default_detector": DEFAULT_DETECTOR,
        "timestamp": time.time(),
    }

@app.post("/api/v1/represent")
def represent_face(req: RepresentRequest):
    t0 = time.time()
    try:
        img_cv = base64_to_cv2(req.image_base64)
        
        # 1. Anti-spoofing test
        spoof_res = check_anti_spoofing(img_cv)
        if not spoof_res["is_real"]:
            return {
                "success": False,
                "is_real": False,
                "spoof_score": spoof_res["score"],
                "message": "Terdeteksi manipulasi foto / rekaman layar (Anti-Spoofing)",
            }
        
        # 2. Extract 512-d normalized embedding
        embedding, fqa = extract_face_embedding(
            img_cv,
            model_name=req.model_name or DEFAULT_MODEL,
            detector_backend=req.detector_backend or DEFAULT_DETECTOR,
        )
        latency_ms = round((time.time() - t0) * 1000, 1)

        return {
            "success": True,
            "is_real": True,
            "embedding": embedding,
            "dimension": len(embedding),
            "model_name": req.model_name or DEFAULT_MODEL,
            "detector_backend": req.detector_backend or DEFAULT_DETECTOR,
            "quality": fqa,
            "latency_ms": latency_ms,
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=f"Gagal memproses citra wajah: {str(e)}",
        )

@app.post("/api/v1/verify")
def verify_faces(req: VerifyRequest):
    t0 = time.time()
    try:
        threshold = req.threshold or DEFAULT_THRESHOLD
        emb1 = req.embedding1
        emb2 = req.embedding2

        # Extract embeddings from images if not provided directly
        if emb1 is None and req.image1_base64:
            img1 = base64_to_cv2(req.image1_base64)
            emb1, _ = extract_face_embedding(img1)
        
        if emb2 is None and req.image2_base64:
            img2 = base64_to_cv2(req.image2_base64)
            emb2, _ = extract_face_embedding(img2)

        if emb1 is None or emb2 is None:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Dua citra atau dua vektor embedding harus disediakan untuk verifikasi",
            )

        distance = compute_cosine_distance(emb1, emb2)
        is_verified = distance <= threshold
        similarity = round(max(0.0, min(1.0, 1.0 - distance)), 4)
        latency_ms = round((time.time() - t0) * 1000, 1)

        return {
            "success": True,
            "verified": is_verified,
            "distance": round(distance, 4),
            "similarity": similarity,
            "threshold": threshold,
            "metric": "cosine",
            "latency_ms": latency_ms,
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Terjadi kesalahan verifikasi: {str(e)}",
        )

@app.post("/api/v1/enroll")
def enroll_employee(req: EnrollRequest):
    t0 = time.time()
    try:
        result = process_enrollment_frames(
            frames_b64=req.images_base64,
            model_name=req.model_name or DEFAULT_MODEL,
            detector_backend=req.detector_backend or DEFAULT_DETECTOR,
        )
        latency_ms = round((time.time() - t0) * 1000, 1)
        result["latency_ms"] = latency_ms
        return result
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=f"Enrollment gagal: {str(e)}",
        )

@app.post("/api/v1/anti-spoof")
def anti_spoof_check(req: AntiSpoofRequest):
    try:
        img_cv = base64_to_cv2(req.image_base64)
        res = check_anti_spoofing(img_cv)
        return {
            "success": True,
            "is_real": res["is_real"],
            "score": res["score"],
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=f"Analisis anti-spoofing gagal: {str(e)}",
        )

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5005))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
