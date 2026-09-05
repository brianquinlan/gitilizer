# Gitilizer

Gitilizer is a serverless GitHub issue prioritization and developer task tracking platform combining **Firebase Cloud Functions (Python v2)**, **Cloud Firestore**, **Pydantic AI**, and a cross-platform **Flutter Web/Desktop/Mobile Client**.

---

## 🚀 Local Development

### 1. Start Firebase Emulators
Start the local Firebase Emulator Suite (Auth, Firestore, Functions, Hosting):

```bash
firebase emulators:start
```

- **Auth Emulator**: `http://127.0.0.1:9099`
- **Firestore Emulator**: `http://127.0.0.1:8080`
- **Functions Emulator**: `http://127.0.0.1:5001`
- **Emulator UI Suite**: `http://127.0.0.1:4000`

### 2. Run the Flutter Client Locally

```bash
cd frontend
flutter run -d chrome
```

The Flutter app automatically connects to local Firebase Emulators (`127.0.0.1:9099` and `127.0.0.1:8080`) during debug mode.

---

## 🧪 Verification & Testing

Run all backend and frontend checks with a single command from the project root:

```bash
python check.py
```

This verifies:
1. **Python Linting**: `ruff check .`
2. **Python Type Checking**: `pyright`
3. **Backend Unit Tests**: 79 tests covering auth, task ranking, and GitHub sync
4. **Flutter Static Analysis**: `flutter analyze`
5. **Flutter Unit & Widget Tests**: widget and state tests

---

## 🚢 Deployment

### 1. Automated CI/CD via Google Cloud Build

Deployments to GCP project `gitilizer` are automated via Google Cloud Build using `cloudbuild.yaml`.

- **Trigger**: Every push to the `main` branch automatically triggers the `deploy-from-github` Cloud Build trigger.
- **Pipeline stages**:
  1. **Build Flutter Web**: Uses `ghcr.io/cirruslabs/flutter:stable` to compile the web bundle into `frontend/build/web`.
  2. **Deploy via Firebase CLI**: Uses `node:20-bookworm` (with Python 3.11 for function discovery) to deploy Hosting, Firestore Rules/Indexes, and 2nd Gen Cloud Functions via Application Default Credentials (ADC).

To trigger a manual build directly from your local terminal without pushing to GitHub:
```bash
gcloud builds submit --config=cloudbuild.yaml . --project=gitilizer
```

### 2. Manual / Local Deployment

To deploy directly from your local machine:

1. Build the Flutter Web client:
   ```bash
   cd frontend
   flutter build web --release
   cd ..
   ```

2. Deploy all Firebase components:
   ```bash
   firebase deploy --project=gitilizer
   ```

---

## ⚙️ First-Time User Setup (Post-Deployment)

1. Open the deployed application at `https://gitilizer.web.app`.
2. Sign in using your Google or GitHub account.
3. Click the **Settings Gear Icon** (⚙️) in the top-right header.
4. Enter:
   - **GitHub Access Token**: Personal access token with `repo` and `read:user` permissions.
   - **Gemini API Key**: API key from Google AI Studio.
   - **Monitored Repositories**: Comma-separated list of repos (e.g. `owner/repo`).
5. Click **Save Settings**. This initiates the background issue sync and AI task prioritization.

