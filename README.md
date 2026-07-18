# 🏟️ StadiumPulse AI
### AI-Powered Smart Stadium Emergency Response & Crowd Management System

StadiumPulse AI is an intelligent stadium operations platform developed for the **Google Antigravity Challenge**. It leverages **Google Gemini AI**, **Firebase**, and **Node.js** to provide real-time emergency response, crowd management, multilingual assistance, and AI-powered operational insights during large sporting events such as the FIFA World Cup 2026.

---

## 🚀 Features

- 🚨 AI-powered Emergency Dispatch
- 🧠 Google Gemini AI Incident Analysis
- 👥 Real-time Crowd Management
- 🌍 Multilingual Fan Assistance
- 📍 Stadium Navigation Support
- 📊 Live Safety & Operational Dashboard
- ☁️ Firebase Integration
- 📱 Responsive User Interface

---

## 🛠️ Tech Stack

### Frontend
- HTML5
- CSS3
- JavaScript

### Backend
- Node.js
- Express.js

### AI
- Google Gemini API

### Database
- Firebase

### Deployment
- Firebase Hosting
- Render

---

## 📂 Project Structure

```
stadiumpulse-ai/
│
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── server.js
├── db.js
├── package.json
├── package-lock.json
├── .env
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/devikashaji2123/stadiumpulse.git
cd stadiumpulse/scratch/stadiumpulse-ai
```

### Install Dependencies

```bash
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file.

Example:

```env
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
FIREBASE_PROJECT_ID=YOUR_FIREBASE_PROJECT_ID
```

> Do **not** upload your `.env` file to GitHub.

---

## ▶️ Run Locally

Start the server:

```bash
npm start
```

or

```bash
node server.js
```

Open:

```
http://localhost:3000
```

---

# ☁️ Backend Deployment (Render)

### Root Directory

```
scratch/stadiumpulse-ai
```

### Build Command

```bash
npm install
```

### Start Command

```bash
npm start
```

Add the required environment variables in the Render dashboard before deploying.

---

# 🔥 Frontend Deployment (Firebase)

Install Firebase CLI

```bash
npm install -g firebase-tools
```

Login

```bash
firebase login
```

Initialize Hosting

```bash
firebase init hosting
```

Select:

- Use Existing Project
- Public Directory → `public`
- Single Page App → Yes
- Automatic GitHub Deployment → No

Deploy

```bash
firebase deploy
```

---

# 🌐 Live Demo

### Frontend

https://stadiumpulse-cbc8e.web.app

### Backend API

https://stadiumpulse-55gu.onrender.com

---

# 📸 Screenshots

Add screenshots inside a folder named:

```
screenshots/
```

Example:

```
screenshots/homepage.png
screenshots/dashboard.png
screenshots/emergency-dispatch.png
```

---

# 📖 How It Works

1. User reports an emergency.
2. The request is sent to the Node.js backend.
3. Google Gemini AI analyzes the incident.
4. AI generates emergency recommendations.
5. The dashboard displays the response.
6. Stadium staff receive actionable insights in real time.

---

# 🎯 Use Cases

- FIFA World Cup 2026
- Sports Stadiums
- Concert Venues
- Smart Cities
- Public Safety Operations

---

# 👩‍💻 Team

**Devika Shaji**

B.Tech Artificial Intelligence & Data Science

D. Y. Patil University

---

# 📜 License

This project is developed for educational and hackathon purposes.

---

# 🙏 Acknowledgements

- Google Antigravity
- Google Gemini AI
- Firebase
- Render
- Node.js
- Express.js
- OpenAI ChatGPT

---

## ⭐ Future Enhancements

- Voice-based emergency reporting
- AI-powered CCTV monitoring
- Live GPS-based responder tracking
- Predictive crowd congestion analysis
- Wearable device integration
- Real-time multilingual voice assistant

---

## 📧 Contact

**Devika Shaji**

GitHub: https://github.com/devikashaji2123

Email: devikashaji2123@gmail.com
