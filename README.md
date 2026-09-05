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

Deploy to GCP project `gitilizer`:

1. Build the Flutter Web client:
   ```bash
   cd frontend
   flutter build web --release
   cd ..
   ```

2. Deploy all Firebase components:
   ```bash
   firebase deploy
   ```
   Or deploy specific targets:
   ```bash
   firebase deploy --only functions,firestore,hosting
   ```
