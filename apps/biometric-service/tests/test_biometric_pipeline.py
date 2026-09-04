import numpy as np
import cv2
import pytest
from fastapi.testclient import TestClient
from src.main import app
from src.pipeline import (
    compute_cosine_distance,
    calculate_sharpness,
    calculate_illumination,
    apply_clahe_normalization,
    assess_face_quality,
    check_anti_spoofing,
)

client = TestClient(app)

def test_health_endpoint():
    """Verify that FastAPI biometric service health check returns active status."""
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert data["service"] == "hris-biometrics-service"
    assert data["engine"] == "DeepFace"
    assert data["default_model"] == "ArcFace"
    assert "timestamp" in data

def test_cosine_distance_mathematical_properties():
    """Verify Cosine Distance: 0.0 for identical, 1.0 for orthogonal."""
    vec_a = [1.0, 0.0, 0.0]
    vec_b = [1.0, 0.0, 0.0]
    vec_c = [0.0, 1.0, 0.0]

    # Identical vectors should have 0 distance
    dist_identical = compute_cosine_distance(vec_a, vec_b)
    assert abs(dist_identical) < 1e-5

    # Orthogonal vectors should have distance of 1.0
    dist_orthogonal = compute_cosine_distance(vec_a, vec_c)
    assert abs(dist_orthogonal - 1.0) < 1e-5

def test_laplacian_sharpness_discrimination():
    """Verify that sharp synthetic image produces significantly higher variance than blurred."""
    # Create high-contrast checkerboard (sharp edges)
    img_sharp = np.zeros((100, 100, 3), dtype=np.uint8)
    img_sharp[::10, :] = 255
    img_sharp[:, ::10] = 255

    # Heavy gaussian blur
    img_blurry = cv2.GaussianBlur(img_sharp, (25, 25), 10.0)

    sharpness_sharp = calculate_sharpness(img_sharp)
    sharpness_blurry = calculate_sharpness(img_blurry)

    assert sharpness_sharp > sharpness_blurry * 5
    assert sharpness_blurry < 80.0  # Should trigger blur threshold

def test_illumination_calculation():
    """Verify luminance detection in LAB color space."""
    dark_img = np.zeros((100, 100, 3), dtype=np.uint8)  # pure black
    bright_img = np.full((100, 100, 3), 200, dtype=np.uint8)

    mean_l_dark, is_dark_good = calculate_illumination(dark_img)
    mean_l_bright, is_bright_good = calculate_illumination(bright_img)

    assert mean_l_dark < 10.0
    assert not is_dark_good
    assert is_bright_good

def test_clahe_normalization():
    """Verify CLAHE normalization retains image dimensions and color channels."""
    test_img = np.random.randint(50, 150, (120, 120, 3), dtype=np.uint8)
    enhanced = apply_clahe_normalization(test_img)

    assert enhanced.shape == test_img.shape
    assert enhanced.dtype == test_img.dtype

def test_face_quality_assessment_contract():
    """Verify FQA dictionary format and score range."""
    test_img = np.full((150, 150, 3), 128, dtype=np.uint8)
    fqa = assess_face_quality(test_img)

    assert "sharpness" in fqa
    assert "illumination" in fqa
    assert "quality_score" in fqa
    assert "is_acceptable" in fqa
    assert 0.0 <= fqa["quality_score"] <= 1.0

def test_anti_spoofing_frequency_analysis():
    """Verify frequency spectrum heuristic runs without crash."""
    natural_sample = np.random.randint(80, 180, (200, 200, 3), dtype=np.uint8)
    res = check_anti_spoofing(natural_sample)
    assert "is_real" in res
    assert "score" in res
