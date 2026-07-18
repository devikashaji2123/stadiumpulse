import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as db from './db.js';
import * as gemini from './geminiService.js';

// Simple custom .env loader
try {
  const envPath = path.join(process.cwd(), '.env');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf-8').split('\n');
    lines.forEach(line => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const eqIdx = trimmed.indexOf('=');
        if (eqIdx > 0) {
          const key = trimmed.substring(0, eqIdx).trim();
          let value = trimmed.substring(eqIdx + 1).trim();
          if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
            value = value.substring(1, value.length - 1);
          }
          process.env[key] = value;
        }
      }
    });
  }
} catch (e) {
  console.error("Custom env load error:", e);
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 5000;

// SSE Client Connection List
let sseClients = [];

function generateUuid(prefix = 'inc') {
  return `${prefix}-${Math.random().toString(36).substring(2, 11)}-${Date.now().toString(36)}`;
}

// Helper to broadcast SSE event
function broadcastEvent(type, data) {
  const message = `data: ${JSON.stringify({ type, data })}\n\n`;
  sseClients.forEach(client => {
    try {
      client.res.write(message);
    } catch (e) {
      console.error("SSE write error:", e);
    }
  });
}

// Body parsing helper
function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      if (!body) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(body));
      } catch (e) {
        reject(e);
      }
    });
  });
}

// Content Type map for static files
const CONTENT_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

// ----------------------------------------------------
// Main HTTP Request Handler
// ----------------------------------------------------
const server = http.createServer(async (req, res) => {
  // Add CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-api-key');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const urlPath = req.url.split('?')[0];

  // ----------------------------------------------------
  // 1. API: SERVER-SENT EVENTS
  // ----------------------------------------------------
  if (urlPath === '/api/events' && req.method === 'GET') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    });

    const clientId = Date.now();
    const newClient = { id: clientId, res };
    sseClients.push(newClient);

    req.on('close', () => {
      sseClients = sseClients.filter(c => c.id !== clientId);
    });
    return;
  }

  // ----------------------------------------------------
  // 2. API: INCIDENTS ENDPOINTS
  // ----------------------------------------------------
  if (urlPath === '/api/incidents') {
    if (req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(db.getIncidents()));
      return;
    }

    if (req.method === 'POST') {
      try {
        const body = await parseBody(req);
        const { type, description, location, peopleAffected, imageUrl } = body;

        if (!type || !description || !location) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: "Missing required fields: type, description, location." }));
          return;
        }

        const count = parseInt(peopleAffected) || 0;

        // Gemini AI Analysis
        const aiAnalysis = await gemini.analyzeIncident(type, description, location, count);

        // Smart Resource Allocation
        const teams = db.getTeams();
        const recommendedResources = await gemini.recommendResources(
          { type, description, location, ...aiAnalysis },
          teams
        );

        // Smart Evacuation Route
        const activeIncidents = db.getIncidents().filter(inc => inc.status !== "Resolved");
        const closedGates = activeIncidents.filter(inc => inc.severity === "Critical").map(inc => inc.location);
        const evacuationPlan = await gemini.generateEvacuationPlan(
          { type, location },
          activeIncidents.map(i => i.location),
          "High Density",
          closedGates
        );

        const newIncident = {
          id: generateUuid('inc'),
          type,
          description,
          location,
          peopleAffected: count,
          imageUrl: imageUrl || "",
          status: "Active",
          createdAt: new Date().toISOString(),
          ...aiAnalysis,
          assignedResources: {
            medical: recommendedResources.nearestMedicalTeam || "TBD",
            security: recommendedResources.nearestSecurityPersonnel || "TBD",
            volunteers: recommendedResources.nearestVolunteer || "TBD"
          },
          equipmentRequired: recommendedResources.equipmentRequired || [],
          additionalBackup: recommendedResources.additionalBackup || "None",
          evacuationRoute: evacuationPlan.safestEvacuationRoute || "Follow security guidance.",
          alternativeRoute: evacuationPlan.alternativeRoutes || "Proceed to designated gate.",
          estimatedEvacuationTime: evacuationPlan.estimatedEvacuationTime || "5 minutes"
        };

        // Automatically mark assigned teams as dispatched in database
        const currentTeams = db.getTeams();
        const matchAndDispatch = (teamName, teamType) => {
          const match = currentTeams[teamType]?.find(t => t.name === teamName);
          if (match) db.updateTeamStatus(match.id, teamType, "Dispatched");
        };

        if (recommendedResources.nearestMedicalTeam) matchAndDispatch(recommendedResources.nearestMedicalTeam, 'medical');
        if (recommendedResources.nearestSecurityPersonnel) matchAndDispatch(recommendedResources.nearestSecurityPersonnel, 'security');
        if (recommendedResources.nearestVolunteer) matchAndDispatch(recommendedResources.nearestVolunteer, 'volunteers');

        db.saveIncident(newIncident);
        broadcastEvent('INCIDENT_CREATED', newIncident);

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(newIncident));
      } catch (err) {
        console.error("Incident creation error:", err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: "Failed to create and analyze incident." }));
      }
      return;
    }
  }

  // Matches /api/incidents/:id (e.g. /api/incidents/inc-12345)
  const incidentMatch = urlPath.match(/^\/api\/incidents\/([a-zA-Z0-9\-]+)$/);
  if (incidentMatch) {
    const id = incidentMatch[1];

    if (req.method === 'PUT') {
      try {
        const updates = await parseBody(req);
        const incidents = db.getIncidents();
        const existing = incidents.find(inc => inc.id === id);

        if (!existing) {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: "Incident not found" }));
          return;
        }

        const updatedIncident = { ...existing, ...updates };
        db.saveIncident(updatedIncident);

        // If incident resolved, free up the teams
        if (updates.status === "Resolved") {
          const teams = db.getTeams();
          const releaseTeam = (teamName, teamType) => {
            const match = teams[teamType]?.find(t => t.name === teamName);
            if (match) db.updateTeamStatus(match.id, teamType, "Available");
          };
          if (existing.assignedResources.medical) releaseTeam(existing.assignedResources.medical, 'medical');
          if (existing.assignedResources.security) releaseTeam(existing.assignedResources.security, 'security');
          if (existing.assignedResources.volunteers) releaseTeam(existing.assignedResources.volunteers, 'volunteers');
        }

        broadcastEvent('INCIDENT_UPDATED', updatedIncident);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(updatedIncident));
      } catch (err) {
        console.error("Incident update error:", err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: "Failed to update incident." }));
      }
      return;
    }

    if (req.method === 'DELETE') {
      db.deleteIncident(id);
      broadcastEvent('INCIDENT_DELETED', { id });
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true }));
      return;
    }
  }

  // ----------------------------------------------------
  // 3. API: TEAMS ENDPOINTS
  // ----------------------------------------------------
  if (urlPath === '/api/teams' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(db.getTeams()));
    return;
  }

  const teamMatch = urlPath.match(/^\/api\/teams\/([a-zA-Z0-9\-]+)$/);
  if (teamMatch && req.method === 'PUT') {
    try {
      const id = teamMatch[1];
      const { type, status, location } = await parseBody(req);
      const updatedTeam = db.updateTeamStatus(id, type, status, location);

      if (updatedTeam) {
        broadcastEvent('TEAM_UPDATED', { type, team: updatedTeam });
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(updatedTeam));
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: "Team not found" }));
      }
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: "Failed to update team status." }));
    }
    return;
  }

  // ----------------------------------------------------
  // 4. API: ANNOUNCEMENTS & TRANSLATIONS
  // ----------------------------------------------------
  if (urlPath === '/api/announcements') {
    if (req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(db.getAnnouncements()));
      return;
    }

    if (req.method === 'POST') {
      try {
        const { text } = await parseBody(req);
        if (!text) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: "Announcement text is required." }));
          return;
        }

        const languages = ["English", "Spanish", "French", "Arabic", "Portuguese"];
        const translations = {};

        // Run translations concurrently
        await Promise.all(languages.map(async (lang) => {
          translations[lang] = await gemini.translateText(text, lang);
        }));

        const newAnnouncement = {
          id: generateUuid('ann'),
          originalText: text,
          translations,
          createdAt: new Date().toISOString()
        };

        db.saveAnnouncement(newAnnouncement);
        broadcastEvent('ANNOUNCEMENT_CREATED', newAnnouncement);

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(newAnnouncement));
      } catch (err) {
        console.error("Announcement creation error:", err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: "Failed to broadcast announcement." }));
      }
      return;
    }
  }

  if (urlPath === '/api/translate' && req.method === 'POST') {
    try {
      const { text, targetLang } = await parseBody(req);
      if (!text || !targetLang) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: "Text and targetLang are required." }));
        return;
      }

      const translation = await gemini.translateText(text, targetLang);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ text, targetLang, translation }));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: "Translation failed." }));
    }
    return;
  }

  // ----------------------------------------------------
  // 5. API: ASSISTANT CHAT
  // ----------------------------------------------------
  if (urlPath === '/api/chat' && req.method === 'POST') {
    try {
      const { history, message } = await parseBody(req);
      if (!message) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: "Message is required." }));
        return;
      }

      const reply = await gemini.handleAssistantChat(history || [], message);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ reply }));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: "Chat service failed." }));
    }
    return;
  }

  // ----------------------------------------------------
  // 6. STATIC FILES SERVER
  // ----------------------------------------------------
  let filePath = path.join(__dirname, 'public', urlPath === '/' ? 'index.html' : urlPath);

  // Security check to avoid accessing outside public directory
  const relative = path.relative(path.join(__dirname, 'public'), filePath);
  if (relative.startsWith('..') || path.isAbsolute(relative)) {
    res.writeHead(403);
    res.end('Access Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Fallback to index.html for React routing
      filePath = path.join(__dirname, 'public', 'index.html');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = CONTENT_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content, 'utf-8');
      }
    });
  });
});

// Start Server
server.listen(PORT, () => {
  const isSim = !process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'YOUR_GEMINI_API_KEY';
  console.log(`\n=============================================================`);
  console.log(`StadiumPulse AI Emergency Coordinator Server running!`);
  console.log(`Dashboard Access: http://localhost:${PORT}`);
  console.log(`Simulator Mode:  ${isSim ? 'ACTIVE (Zero-Config)' : 'INACTIVE (Live Gemini API)'}`);
  console.log(`=============================================================\n`);
});
