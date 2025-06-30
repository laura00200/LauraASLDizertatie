# services/asl_service.py

import logging
import pickle
import cv2
import mediapipe as mp
import torch

from asl_model.hand_utils import preprocess_for_model
from asl_model.model import HandLandmarkNet

class InferenceService:
    def __init__(self):
        # load label encoder
        with open('asl_model/trained_models/label_encoder.pkl', 'rb') as f:
            self.le = pickle.load(f)

        # load trained PyTorch model
        self.model = HandLandmarkNet(num_classes=48, input_size=42)
        self.model.load_state_dict(torch.load(
            'asl_model/trained_models/best_asl_model.pth',
            map_location=torch.device('cpu')
        ))
        self.model.eval()

        # set up MediaPipe Hands
        self.mp_hands = mp.solutions.hands
        self.hands = self.mp_hands.Hands(
            static_image_mode=False,
            max_num_hands=2,
            min_detection_confidence=0.3
        )

        logging.info("Successfully loaded the inference models.")

    def process_video(self, video_path: str):
        predicted_labels = []
        cap = cv2.VideoCapture(video_path)
        if not cap.isOpened():
            raise ValueError(f"Error opening video stream or file: {video_path}")

        try:
            while True:
                ret, frame = cap.read()
                if not ret:
                    break

                frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
                results = self.hands.process(frame_rgb)

                if results.multi_hand_landmarks:
                    for hand_landmarks in results.multi_hand_landmarks:
                        lm_array = preprocess_for_model(hand_landmarks)
                        with torch.no_grad():
                            logits = self.model(lm_array)
                            cls = torch.argmax(logits, dim=1).cpu().item()
                            label = self.le.inverse_transform([cls])[0]
                            predicted_labels.append(label)
        finally:
            cap.release()               # ← guarantee release
            cv2.destroyAllWindows()

        # Debounce repeated frames
        final = []
        prev = None
        count = 0
        threshold = 5
        for lbl in predicted_labels:
            if lbl == prev:
                count += 1
            else:
                prev, count = lbl, 1
            if count == threshold:
                final.append(lbl)
                count = 0

        return final
