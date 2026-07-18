import https from 'https';
import fs from 'fs';
import path from 'path';

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

const apiKey = process.env.GEMINI_API_KEY;
const isSimulatorMode = !apiKey || apiKey === "YOUR_GEMINI_API_KEY";

if (isSimulatorMode) {
  console.log("No valid GEMINI_API_KEY found. Operating in local intelligent simulation mode.");
} else {
  console.log("Valid GEMINI_API_KEY found. Live Google Gemini API integrated.");
}

// ----------------------------------------------------
// HTTPS Request Wrapper for Gemini
// ----------------------------------------------------
function callGeminiAPI(systemInstruction, prompt, useJson = false) {
  return new Promise((resolve, reject) => {
    if (isSimulatorMode) {
      reject(new Error("Simulator mode active"));
      return;
    }

    const model = "gemini-2.5-flash";
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const payload = {
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt }]
        }
      ]
    };

    if (systemInstruction) {
      payload.systemInstruction = {
        parts: [{ text: systemInstruction }]
      };
    }

    if (useJson) {
      payload.generationConfig = {
        responseMimeType: "application/json"
      };
    }

    const requestData = JSON.stringify(payload);

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(requestData)
      }
    };

    const req = https.request(url, options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            const parsed = JSON.parse(body);
            const textResponse = parsed.candidates?.[0]?.content?.parts?.[0]?.text;
            if (textResponse) {
              resolve(textResponse.trim());
            } else {
              reject(new Error("No text response in Gemini output structure"));
            }
          } catch (e) {
            reject(new Error("Failed to parse Gemini response: " + e.message));
          }
        } else {
          reject(new Error(`API Error ${res.statusCode}: ${body}`));
        }
      });
    });

    req.on('error', (e) => reject(e));
    req.write(requestData);
    req.end();
  });
}

// ----------------------------------------------------
// Simulator / Fallback Helper
// Generates highly realistic emergency coordination details
// ----------------------------------------------------
function getMockIncidentAnalysis(type, description, location, peopleAffected) {
  const normalizedType = type.toLowerCase();
  let severity = "Medium";
  let summary = `Reported ${type} at ${location}.`;
  let recommendedResponse = "Dispatch nearby staff to investigate and establish contact.";
  let estimatedResponseTime = "3 minutes";
  let protocol = "1. Confirm location details.\n2. Dispatched staff to report visual status.\n3. Remain in communication.";

  if (normalizedType.includes("medical")) {
    severity = peopleAffected > 2 ? "High" : "Medium";
    summary = `Spectator needs medical assistance in ${location} due to: ${description.substring(0, 50)}...`;
    recommendedResponse = `Dispatch nearest Medical Team. Carry trauma kit and check for consciousness.`;
    estimatedResponseTime = "2 minutes";
    protocol = "1. Dispatch Medical Team immediately.\n2. Clear aisles leading to Section/Location.\n3. Assist medical staff with patient transfer.\n4. Standby with AED.";
  } else if (normalizedType.includes("fire")) {
    severity = "High";
    summary = `Active fire report in ${location}: ${description.substring(0, 50)}...`;
    recommendedResponse = `Dispatch Fire marshal and Security. Evacuate adjacent rows. Deploy nearby dry chemical fire extinguishers.`;
    estimatedResponseTime = "1.5 minutes";
    protocol = "1. Sound local sector alarm.\n2. Instruct personnel to deploy fire extinguishers immediately.\n3. Contain concession utilities if located near food stalls.\n4. Cordon off the affected zone and start local evacuation.";
  } else if (normalizedType.includes("stampede") || normalizedType.includes("crowd")) {
    severity = "Critical";
    summary = `Crowd crush / surge incident at ${location}. High density bottleneck.`;
    recommendedResponse = `Immediately open all secondary gates. Deploy security to divide crowd flow. Issue bilingual PA announcements.`;
    estimatedResponseTime = "1 minute";
    protocol = "1. Open emergency overflow gates immediately.\n2. Direct volunteer teams to guide spectators away from the choke point.\n3. Instruct PA announcer to play the 'Redirection/Pulsing Exit' bulletin.\n4. Dispatch medical teams to treat crushed spectators.";
  } else if (normalizedType.includes("child")) {
    severity = "Low";
    summary = `Lost child reported at ${location}: ${description.substring(0, 50)}...`;
    recommendedResponse = `Alert all Section Volunteers. Take child to Information Booth in Zone.`;
    estimatedResponseTime = "Immediate";
    protocol = "1. Share child description and photo with all nearby guards/volunteers.\n2. Accompany parents to the nearest sector operations office.\n3. Keep the child safe at the designated information booth.\n4. Verify matching ID/ticket stub before releasing the child.";
  } else if (normalizedType.includes("suspicious")) {
    severity = "High";
    summary = `Possible suspicious item discovered at ${location}: ${description.substring(0, 50)}...`;
    recommendedResponse = `Isolate the object. Cordon off rows around the location. Do not handle or disturb the item.`;
    estimatedResponseTime = "3 minutes";
    protocol = "1. Establish a 15-meter cordon around the object.\n2. Ask surrounding spectators if anyone owns the item.\n3. Dispatch Security Unit equipped with inspection radio.\n4. Prepare local exit routes in case a sector evacuation is triggered.";
  } else if (normalizedType.includes("security") || normalizedType.includes("threat") || normalizedType.includes("fight")) {
    severity = "High";
    summary = `Active security disruption at ${location}. Spectators involved in altercation or breach.`;
    recommendedResponse = `Dispatch Security Quick Response Force (QRF). Subdue combatants and restore perimeter integrity.`;
    estimatedResponseTime = "2 minutes";
    protocol = "1. Send Security Guards immediately to intervene.\n2. Separate conflicting parties.\n3. Document spectator seat/ticket details.\n4. Escort violators out of stadium gates if necessary.";
  }

  return { severity, summary, recommendedResponse, estimatedResponseTime, protocol };
}

function getMockResourceAllocation(incident, teams) {
  // Matching heuristics based on locations
  const nearestMedical = teams.medical ? (teams.medical.find(t => t.status === "Available") || teams.medical[0])?.name || "Medical Team Gamma" : "Medical Team Gamma";
  const nearestSecurity = teams.security ? (teams.security.find(t => t.status === "Available") || teams.security[0])?.name || "Guard Unit 2" : "Guard Unit 2";
  const nearestVolunteer = teams.volunteers ? (teams.volunteers.find(t => t.status === "Available") || teams.volunteers[0])?.name || "Vol Group Red" : "Vol Group Red";
  
  let equipment = ["Radio", "First Aid Kit"];
  let backup = "No immediate backup needed. Standby status.";

  if (incident.type.toLowerCase().includes("medical")) {
    equipment = ["AED (Defibrillator)", "Trauma Bag", "Stretcher"];
    backup = "Ambulance Crew (Unit 3) on outer gate standby.";
  } else if (incident.type.toLowerCase().includes("fire")) {
    equipment = ["Dry Chemical Fire Extinguisher", "Fire Blanket", "Thermal Visor"];
    backup = "City Fire Truck dispatched (Estimated ETA: 6 mins).";
  } else if (incident.type.toLowerCase().includes("stampede")) {
    equipment = ["Megaphones", "Barricades", "Loudspeakers"];
    backup = "Reserve Security Platoon 4 mobilized at Gate 5.";
  } else if (incident.type.toLowerCase().includes("suspicious")) {
    equipment = ["EOD containment blanket", "Standoff Shield"];
    backup = "Bomb squad unit dispatched to outer perimeter.";
  }

  return {
    nearestMedicalTeam: nearestMedical,
    nearestSecurityPersonnel: nearestSecurity,
    nearestVolunteer: nearestVolunteer,
    equipmentRequired: equipment,
    additionalBackup: backup
  };
}

function getMockEvacuationPlan(incident, closedExits) {
  const loc = incident.location || "Section C4";
  let mainRoute = "Route down Aisle C, exit through Tunnel C, proceed to gate 3.";
  let altRoute = "Route up stairs, exit through upper deck concourse to Gate 2.";
  let time = "4 minutes";

  if (loc.includes("D") || loc.includes("Gate 5")) {
    mainRoute = "Exit through Tunnel D, route to Gate 6. Gate 5 is CLOSED.";
    altRoute = "Move west across Outer Concourse, exit through Gate 7.";
    time = "6 minutes";
  } else if (loc.includes("A")) {
    mainRoute = "Exit down Ramp A directly to Gate 1 plaza.";
    altRoute = "Exit through VIP Tunnel A, proceed to South Gate.";
    time = "3 minutes";
  }

  return {
    safestEvacuationRoute: mainRoute,
    alternativeRoutes: altRoute,
    estimatedEvacuationTime: time
  };
}

const mockTranslations = {
  English: (text) => text,
  Spanish: (text) => {
    if (text.includes("Gate 5")) return "Atención. Por favor, no se dirijan hacia la Puerta 5. Diríjase a la Puerta 6.";
    return "[Spanish] " + text;
  },
  French: (text) => {
    if (text.includes("Gate 5")) return "Attention. Veuillez ne pas vous diriger vers la Porte 5. Dirigez-vous vers la Porte 6.";
    return "[French] " + text;
  },
  Arabic: (text) => {
    if (text.includes("Gate 5")) return "تنبيه. يرجى عدم التوجه نحو البوابة 5. يرجى التوجه إلى البوابة 6.";
    return "[Arabic] " + text;
  },
  Portuguese: (text) => {
    if (text.includes("Gate 5")) return "Atenção. Não se dirija ao Portão 5. Dirija-se ao Portão 6.";
    return "[Portuguese] " + text;
  }
};

// ----------------------------------------------------
// Public Service Operations
// ----------------------------------------------------

export async function analyzeIncident(type, description, location, peopleAffected) {
  if (isSimulatorMode) {
    return getMockIncidentAnalysis(type, description, location, peopleAffected);
  }

  try {
    const sysPrompt = "You are the emergency dispatch coordinator for the FIFA World Cup 2026. Respond strictly in JSON format.";
    const userPrompt = `
      Analyze this incident report and output JSON details:
      - Type: ${type}
      - Description: ${description}
      - Location (Stadium Section): ${location}
      - Spectators Affected: ${peopleAffected}

      Structure JSON:
      {
        "severity": "Low" | "Medium" | "High" | "Critical",
        "summary": "Short 1-sentence summary",
        "recommendedResponse": "Immediate deployment action description",
        "estimatedResponseTime": "Estimated arrival time e.g. '2 minutes' or 'Immediate'",
        "protocol": "Numbered steps of security and medical protocol to enforce, separated by newline characters"
      }
    `;

    const res = await callGeminiAPI(sysPrompt, userPrompt, true);
    return JSON.parse(res);
  } catch (error) {
    console.error("Gemini analysis error, falling back:", error.message);
    return getMockIncidentAnalysis(type, description, location, peopleAffected);
  }
}

export async function recommendResources(incident, teams) {
  if (isSimulatorMode) {
    return getMockResourceAllocation(incident, teams);
  }

  try {
    const sysPrompt = "You are the Smart Resource Allocator for FIFA World Cup 2026. Respond strictly in JSON format.";
    const userPrompt = `
      Given this active incident:
      - Type: ${incident.type}
      - Description: ${incident.description}
      - Location: ${incident.location}
      
      And the list of teams:
      ${JSON.stringify(teams, null, 2)}

      Select the best available nearest resources.
      Structure JSON:
      {
        "nearestMedicalTeam": "Name of the recommended medical team",
        "nearestSecurityPersonnel": "Name of the recommended security team",
        "nearestVolunteer": "Name of the recommended volunteer team",
        "equipmentRequired": ["Array of specific equipment items they must carry"],
        "additionalBackup": "A brief note on whether ambulance/police backup is required"
      }
    `;

    const res = await callGeminiAPI(sysPrompt, userPrompt, true);
    return JSON.parse(res);
  } catch (error) {
    console.error("Gemini resource recommendation error, falling back:", error.message);
    return getMockResourceAllocation(incident, teams);
  }
}

export async function generateEvacuationPlan(incident, activeIncidents, crowdDensity, closedExits) {
  if (isSimulatorMode) {
    return getMockEvacuationPlan(incident, closedExits);
  }

  try {
    const sysPrompt = "You are the Emergency Evacuation Planner at FIFA World Cup 2026. Respond strictly in JSON format.";
    const userPrompt = `
      Create a safe evacuation route avoiding other incident locations and closed exits.
      - Incident: ${incident.type} at ${incident.location}
      - Other incident spots to avoid: ${JSON.stringify(activeIncidents)}
      - Current density: ${crowdDensity}
      - Closed gates: ${JSON.stringify(closedExits)}

      Structure JSON:
      {
        "safestEvacuationRoute": "Detailed directions for primary route",
        "alternativeRoutes": "Detailed directions for secondary route",
        "estimatedEvacuationTime": "e.g. '5 minutes'"
      }
    `;

    const res = await callGeminiAPI(sysPrompt, userPrompt, true);
    return JSON.parse(res);
  } catch (error) {
    console.error("Gemini evacuation planning error, falling back:", error.message);
    return getMockEvacuationPlan(incident, closedExits);
  }
}

export async function translateText(text, targetLang) {
  if (isSimulatorMode) {
    if (mockTranslations[targetLang]) {
      return mockTranslations[targetLang](text);
    }
    return `[${targetLang}] ${text}`;
  }

  try {
    const sysPrompt = `Translate the emergency stadium bulletin text into ${targetLang}. Respond ONLY with the translation.`;
    const userPrompt = `Text to translate:\n"${text}"`;
    return await callGeminiAPI(sysPrompt, userPrompt, false);
  } catch (error) {
    console.error("Gemini translation error, falling back:", error.message);
    if (mockTranslations[targetLang]) {
      return mockTranslations[targetLang](text);
    }
    return `[${targetLang}] ${text}`;
  }
}

export async function handleAssistantChat(history, message) {
  if (isSimulatorMode) {
    return `[Simulator Mode] I am the StadiumPulse AI Coordinator. I received your request: "${message}". 
    To help you coordinate: Security is currently standing by. All gates except Gate 5 are open. Medical Teams Alpha and Beta are dispatched. Let me know if you'd like to assign new resources or require specific protocols.`;
  }

  try {
    const sysPrompt = "You are the StadiumPulse AI Coordinator, a conversational artificial intelligence operating at the FIFA World Cup 2026 Stadium Control Room. Your target audience is security personnel, stadium marshals, paramedics, and organizers. Keep answers concise, clear, and professional. Give direct, actionable emergency advice, protocols, or status reports.";
    
    // Format chat history for prompt
    let conversationContext = "Previous conversation history:\n";
    history.forEach(h => {
      conversationContext += `${h.sender === 'user' ? 'User' : 'Assistant'}: ${h.text}\n`;
    });
    conversationContext += `\nNew User Message: ${message}`;

    return await callGeminiAPI(sysPrompt, conversationContext, false);
  } catch (error) {
    console.error("Gemini assistant chat error, falling back:", error.message);
    return `[AI Error Recovery] I am online, but had trouble reaching the main engine. Emergency Protocols: 1. Dispatch guards to any active incident. 2. Keep Gates 1-4 clear. 3. Monitor Section C4 medical reports.`;
  }
}
