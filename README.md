#  Educational Sign Language and ASL Detection Mobile App

A full-stack American Sign Language (ASL) learning & practice application built with Python FastAPI on the backend and React Native + Expo on the frontend.

---

## Project Description

DizertatieASL is designed to help users of all levels learn and practice ASL through interactive features:

- **User Management**: Secure registration/login with JWT and persistent sessions.  
- **ASL Alphabet**: Practice individual letters with real-time camera feedback and instant correctness validation.  
- **Fingerspelling**: Spell predefined words (e.g. DOG, CAT, LOVE) one letter at a time, with always-visible letter grid, image cues, live prediction, retry & next controls.  
- **Live Translation**: Use your device’s camera to recognize arbitrary ASL hand signs and display the translated text.  
- **Quizzes & Dictionary**: Test your knowledge with quizzes and browse a mini-dictionary of common ASL words.  
- **Community & Resources**: Learn about Deaf culture and access curated external resources.  
- **Theme Settings**: Toggle between light & dark modes globally.  

Under the hood, the backend uses MediaPipe Hands for hand-landmark detection and a PyTorch-trained `HandLandmarkNet` model for sign classification. The frontend is a cross-platform mobile app powered by Expo, with smooth navigation and state management.

---

## Table of Contents

- [Tech Stack](#tech-stack)  
- [Prerequisites](#prerequisites)  
- [Getting Started](#getting-started)  
  - [Clone & Structure](#clone--structure)  
  - [Backend Setup](#backend-setup)  
  - [Frontend Setup](#frontend-setup)  
- [Configuration](#configuration)  
- [Running](#running)  
- [Usage](#usage)  
- [Testing](#testing)  
- [Deployment](#deployment)  
- [Contributing](#contributing)  
- [License](#license)  

---

## Tech Stack

- **Backend**:  
  - Python 3.8+, FastAPI, Uvicorn  
  - SQLAlchemy / SQLite  
  - MediaPipe Hands, OpenCV  
  - PyTorch  
- **Frontend**:  
  - React Native (Expo)  
  - React Navigation  
  - Expo Camera  
  - AsyncStorage  
  - Jest, React Native Testing Library  
- **Dev Tools**: Git/GitHub, VSCode, Android Studio/Xcode (emulators)

---

## Prerequisites

- Git & GitHub account  
- Python 3.8+ & pip  
- Node.js 14+ & npm/yarn  
- Expo CLI (`npm install -g expo-cli`)  
- A mobile device with Expo Go **or** Android/iOS simulator  

---

## Getting Started

### Clone & Structure

```bash
git clone https://github.com/laura00200/DizertatieASL.git
cd DizertatieASL
```

```
DizertatieASL/
├─ Backend/
└─ Frontend/
```

### Backend Setup

```bash
cd Backend
python -m venv .venv
# Windows
.venv\Scripts\activate
# macOS/Linux
source .venv/bin/activate

pip install -r requirements.txt
```

### Frontend Setup

```bash
cd ../Frontend
npm install      # or yarn install
```

---

## Configuration

### Backend:
Copy `.env.example` → `.env` and fill in:

```ini
DATABASE_URL=sqlite:///./asl.db
SECRET_KEY=your_secret_key
```

### Frontend:
In `app.json` or environment, set:

```json
{
  "expo": {
    "extra": {
      "API_BASE_URL": "http://<YOUR_BACKEND_IP>:8000"
    }
  }
}
```

---

## Running

### Backend

```bash
cd Backend
# activate your venv
uvicorn server:app --reload --host 0.0.0.0 --port 8000
```

API docs: [http://localhost:8000/docs](http://localhost:8000/docs)

### Frontend

```bash
cd ../Frontend
expo start
```

Scan QR with Expo Go or press `i` / `a` for iOS/Android simulator.

---

## Usage

Register or log in.

On the Home dashboard, select a module:

- “Learn Alphabet”
- “Learn Fingerspelling”
- “Translate”
- “Take a Quiz”
- “Mini Dictionary”
- “Community”
- “Settings” (toggle theme)

Follow on-screen prompts (camera views, prediction boxes, retry/next controls).

---

## Testing

### Backend

```bash
cd Backend
pytest -q
```

Place sample videos in `tests/samples/`.

### Frontend

```bash
cd Frontend
npm test
```

---

## Deployment

- **Backend**: Dockerize or deploy to Heroku/GCP/AWS.
- **Frontend**: Build standalone binaries with Expo (`expo build:android`, `expo build:ios`) or publish via Expo.

---

## Contributing

Fork & clone your fork.

Create feature branch: `git checkout -b feat/your-feature`.

Commit & push to your fork.

Open a pull request against `main`.

Please follow code style, include tests, and update docs.

---

## License

This project is licensed under the MIT License.
