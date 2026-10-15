# DocConnect Assignment

This project contains the required two screens only:
- Home screen: current user profile + 5-post feed
- Discover screen: people list with Connect / Requested state

It includes a Node.js + Express + MongoDB backend with seeded data and a React Native Expo mobile app.

## Project structure

- `backend/` — Express API, MongoDB models, seed script
- `app/` — Expo React Native app
- `README.md` — run instructions

## 1) MongoDB setup

You need MongoDB running locally.

### Option A: Local MongoDB
1. Install MongoDB Community Server
2. Start MongoDB
3. Default connection string:

```bash
mongodb://127.0.0.1:27017/docconnect
```

### Option B: MongoDB Atlas
1. Create a free cluster
2. Copy the connection string
3. Update the backend `.env` file with that value

The backend uses this environment variable:

```env
MONGO_URI=mongodb://127.0.0.1:27017/docconnect
```

## 2) Backend setup

Open a terminal in the project root and run:

```bash
cd backend
npm install
```

Then seed the database:

```bash
npm run seed
```

This will:
- clear existing data
- create 5 users
- create 5 posts
- create the default logged-in user

Start the backend server:

```bash
npm start
```

The API runs at:

```text
http://localhost:4000
```

### Backend endpoints

- `GET /posts` — returns all posts with author details
- `GET /users` — returns current user, other users, and requested user IDs
- `POST /connect` — stores a connection request from one user to another
- `GET /images/*` — serves static images from the backend

### Logged-in user

The app treats the first seeded user as the logged-in user.

Hardcoded ID:

```text
64f000000000000000000001
```

This is used in both the backend and the app.

## 3) App setup

Open a new terminal and run:

```bash
cd app
npm install
```

Set the backend URL in the app `.env` file.

### If using a phone on the same Wi‑Fi network
Use your computer's local IP:

```env
EXPO_PUBLIC_API_URL=http://192.168.1.7:4000
```

Replace `192.168.1.7` with your computer's actual Wi‑Fi IP.

To find it on Windows:

```bash
ipconfig
```

Look for the IPv4 Address under Wi‑Fi.

### If using Android emulator
```env
EXPO_PUBLIC_API_URL=http://10.0.2.2:4000
```

### If using iOS simulator
```env
EXPO_PUBLIC_API_URL=http://localhost:4000
```

Then start the Expo app:

```bash
npx expo start
```

Scan the QR code with Expo Go, or press:
- `a` for Android emulator
- `i` for iOS simulator

## 4) Run sequence (recommended)

1. Start MongoDB
2. In backend terminal:

```bash
cd backend
npm install
npm run seed
npm start
```

3. In app terminal:

```bash
cd app
npm install
npx expo start
```

4. Open the app in Expo Go or emulator

## 5) Notes

- The app intentionally contains only the two required screens: Home and Discover.
- The Connect button changes to Requested and stays requested after reopening the app because the backend returns the requested user IDs on every `/users` call.
- No login or authentication is included, as required by the assignment.

## 6) GitHub submission requirement

Before the deadline, push both the app and backend to a public GitHub repo, then send an email to:

```text
hr@thebrandopedia.in
```

with the subject:

```text
Assignment Submission - [Your Name]
```

Include:
1. GitHub repository link
2. README with run instructions
3. Screen recording of the working output

## 7) Troubleshooting

### Backend port already in use
If port 4000 is already busy, stop the old Node process and rerun:

```bash
cd backend
npm start
```

### App shows the error state
Check:
- MongoDB is running
- backend is running on port 4000
- `.env` uses the correct device-reachable IP
- the phone and computer are on the same Wi‑Fi network

### Feed or people list not loading
Run the seed script again:

```bash
cd backend
npm run seed
```

Then restart the backend.
