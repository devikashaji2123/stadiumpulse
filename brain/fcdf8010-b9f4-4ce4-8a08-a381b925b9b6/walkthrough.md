# Walkthrough - StadiumPulse AI – Emergency Coordinator

I have built and verified a fully-functional, responsive, Generative AI web dashboard called **StadiumPulse AI – Emergency Coordinator** inside `C:\Users\devik\.gemini\antigravity\scratch\stadiumpulse-ai`.

---

## 🛠️ Technology Stack & Smart Adaptations
Since Node.js/npm was not installed globally on the Windows host, the project is designed with a **zero-dependency, zero-configuration architecture** to ensure it runs out-of-the-box:
1. **Backend**: Built with **pure Node.js** standard library modules (`http`, `https`, `fs`, `path`). It parses request bodies, maps API routes, manages Server-Sent Events (SSE) for live alerts, loads `.env` files via a custom parser, and serves static files.
2. **Frontend**: Built with **React and Tailwind CSS** served from CDN. JSX compilation is performed in-browser by Babel, avoiding the need for front-end build pipelines or compiling steps.
3. **Generative AI**: Integrates with Google Gemini API directly using Node's standard `https` module. If no key is set, it falls back to a realistic local simulation mode.

---

## 📂 Project Structure

- [server.js](file:///C:/Users/devik/.gemini/antigravity/scratch/stadiumpulse-ai/server.js): Main HTTP server handling routing, static files, and Server-Sent Events.
- [db.js](file:///C:/Users/devik/.gemini/antigravity/scratch/stadiumpulse-ai/db.js): Database layer persisting data to a local JSON file, pre-seeded with World Cup 2026 emergency scenarios.
- [geminiService.js](file:///C:/Users/devik/.gemini/antigravity/scratch/stadiumpulse-ai/geminiService.js): Google Gemini API client containing prompt schemas and mock simulations.
- [public/index.html](file:///C:/Users/devik/.gemini/antigravity/scratch/stadiumpulse-ai/public/index.html): HTML base importing CSS, React, Lucide Icons, and Recharts.
- [public/app.js](file:///C:/Users/devik/.gemini/antigravity/scratch/stadiumpulse-ai/public/app.js): React dashboard logic containing state management, interactive map rendering, forms, and widgets.
- [.env](file:///C:/Users/devik/.gemini/antigravity/scratch/stadiumpulse-ai/.env): Environmental config containing ports and API key tokens.

---

## 🚀 Running Instructions

To launch the dashboard, use the Cursor-bundled Node binary that is already verified to run on your system.

1. Open a PowerShell terminal.
2. Navigate to the project folder:
   ```powershell
   cd "C:\Users\devik\.gemini\antigravity\scratch\stadiumpulse-ai"
   ```
3. Start the server:
   ```powershell
   & "C:\Users\devik\AppData\Local\Programs\cursor\resources\app\resources\helpers\node.exe" server.js
   ```
4. Open your web browser and navigate to:
   **[http://localhost:5000](http://localhost:5000)**

---

## 🔍 Validation & Verification Results

The API has been programmatically verified using PowerShell command-line triggers:

### 1. Incidents Retrieval (`GET /api/incidents`)
Successfully returns the pre-seeded incidents (Medical, Suspicious Object, Crowd Stampede) with detailed AI summaries, rescue teams, and coordinates.

### 2. Incident Creation & AI Analysis (`POST /api/incidents`)
Sending a new report successfully processes it and returns an analyzed dispatch object:
```json
{
  "id": "inc-h41w5kk8k-mrjb8t87",
  "type": "Fire",
  "description": "Small smoke rising in concession stand, Section D1. People leaving the line in a panic.",
  "location": "Section D1",
  "severity": "High",
  "summary": "Active fire report in Section D1: Small smoke rising in concession stand...",
  "recommendedResponse": "Dispatch Fire marshal and Security. Evacuate adjacent rows. Deploy nearby dry chemical fire extinguishers.",
  "estimatedResponseTime": "1.5 minutes",
  "assignedResources": {
    "medical": "Team Gamma",
    "security": "Guard Unit 2",
    "volunteers": "Vol Group Red"
  },
  "evacuationRoute": "Exit through Tunnel D, route to Gate 6. Gate 5 is CLOSED."
}
```

### 3. Translation and Announcement Broadcaster (`POST /api/translate`)
Successfully returns Spanish, French, Arabic, and Portuguese translations for stadium bulletins.

### 4. Interactive Chatbot (`POST /api/chat`)
Replies successfully with emergency instructions and guidelines.

---

## 🌐 Deployment Plan

Since this is a full-stack application (React static files + Node.js API server), a standard static deployment (like Firebase Hosting) will host the frontend assets but not run the Node server process. 

To run the full-stack system in production:

### 1. Deploying the Backend Server
Deploy the Node server to a backend hosting provider (e.g. Render, Railway, Fly.io, or Heroku):
1. Create a GitHub repository and push your project directory files (`server.js`, `db.js`, `geminiService.js`, `data.json`, `package.json`, and the `public/` directory).
2. Connect your repo to the backend provider (e.g. Render).
3. Configure the environment variables in the provider dashboard:
   - `PORT`: `5000` (or dynamically allocated)
   - `GEMINI_API_KEY`: Your live Google AI Studio API Key.
4. Set the Start Command to: `node server.js`
5. Note the generated domain URL (e.g., `https://stadiumpulse-api.render.com`).

### 2. Deploying the Frontend to Firebase Hosting
Deploy the static client app to Firebase Hosting:
1. In `public/app.js` line 16, replace `'https://YOUR_BACKEND_URL_HERE'` with your deployed backend URL.
2. Install `firebase-tools` CLI globally on your host machine:
   ```bash
   npm install -g firebase-tools
   ```
3. Authenticate with your Firebase account:
   ```bash
   firebase login
   ```
4. Initialize the hosting environment:
   ```bash
   firebase init hosting
   ```
   - Select your existing Firebase project.
   - Choose `public` as your public directory.
   - Configure as a single-page app: `Yes`.
   - Overwrite `index.html`: `No`.
5. Run the deployment trigger:
   ```bash
   firebase deploy
   ```
This maps all paths to `index.html` and distributes the files to Firebase's global CDN edge.
