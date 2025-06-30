import os
from fastapi.testclient import TestClient

from server import app
from api.asl_routes import get_inference_service


class StubInferenceService:
    def process_video(self, path: str):

        return ["A", "A", "A", "A", "A"]


app.dependency_overrides[get_inference_service] = lambda: StubInferenceService()

client = TestClient(app)

SAMPLE_DIR = os.path.join(os.path.dirname(__file__), "samples")

def test_single_letter_prediction():
    video_path = os.path.join(SAMPLE_DIR, "asl-a.mp4")
    assert os.path.exists(video_path), f"Missing sample: {video_path}"

    with open(video_path, "rb") as f:
        files = {"file": ("asl-a.mp4", f, "video/mp4")}
        resp = client.post("/asl/predict", files=files)

    assert resp.status_code == 200
    json = resp.json()
    # since our stub returns ["A","A","A","A","A"], Counter → {"A":5}
    assert json["predicted_labels"] == {"A": 5}
