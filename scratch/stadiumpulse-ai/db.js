import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, 'data.json');

const defaultData = {
  incidents: [
    {
      id: "inc-1",
      type: "Medical emergency",
      description: "Spectator in Section C4 reports sudden chest pains, difficulties breathing, and sweating. Appears to be having a cardiac event.",
      location: "Section C4",
      peopleAffected: 1,
      severity: "High",
      summary: "Potential cardiac arrest in Section C4. Spectator is conscious but has severe chest tightness.",
      recommendedResponse: "Dispatch Medical Team Beta with AED and stretcher. Direct crowd away from Section C4 aisle.",
      estimatedResponseTime: "2 minutes",
      protocol: "1. Dispatch closest medical team (Beta).\n2. Bring AED and trauma kit.\n3. Instruct nearby volunteers to clear the aisle.\n4. Call local emergency services (ambulance standby).",
      status: "Dispatched",
      createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 mins ago
      assignedResources: {
        medical: "Team Beta",
        security: "Guard Unit 2",
        volunteers: "Vol Group Blue"
      },
      equipmentRequired: ["AED (Defibrillator)", "Trauma Bag", "Stretcher"],
      additionalBackup: "Ambulance Crew (Unit 3) on outer gate standby.",
      evacuationRoute: "Evacuate through Tunnel C, exit via Gate 3.",
      alternativeRoute: "Standard gate routes.",
      estimatedEvacuationTime: "2 minutes",
      imageUrl: ""
    },
    {
      id: "inc-2",
      type: "Suspicious object",
      description: "An unattended black backpack has been left under seat 14 in Section A12 for over an hour. No one in the vicinity claims ownership.",
      location: "Section A12",
      peopleAffected: 0,
      severity: "High",
      summary: "Unattended black backpack under seat 14, Section A12. Unclaimed for >60 minutes.",
      recommendedResponse: "Dispatch Security Unit 1 to cordon off the area and assess the bag. Alert bomb disposal standby.",
      estimatedResponseTime: "3 minutes",
      protocol: "1. Cordon off seats within a 15-meter radius (Section A12, rows 10-15).\n2. Direct spectators to Section A11/A13.\n3. Dispatch Security Unit 1.\n4. Do not touch or move the bag; perform visual inspection.",
      status: "Dispatched",
      createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
      assignedResources: {
        medical: "TBD",
        security: "Guard Unit 1",
        volunteers: "Vol Group Red"
      },
      equipmentRequired: ["EOD containment blanket", "Standoff Shield"],
      additionalBackup: "Bomb squad unit dispatched to outer perimeter.",
      evacuationRoute: "Cordon Section A12. Direct flow to Gate 1.",
      alternativeRoute: "Standard gate routes.",
      estimatedEvacuationTime: "3 minutes",
      imageUrl: ""
    },
    {
      id: "inc-3",
      type: "Lost child",
      description: "A 6-year-old boy named Leo, wearing a yellow FIFA t-shirt and green cap, was separated from his parents near the concession stands in Section B2. Parents are highly distressed.",
      location: "Section B2",
      peopleAffected: 1,
      severity: "Low",
      summary: "6-year-old boy (Leo, yellow t-shirt, green cap) lost near Section B2 concessions.",
      recommendedResponse: "Alert all volunteers in Zone B. Place child under volunteer care at Section B Information Desk.",
      estimatedResponseTime: "Immediate",
      protocol: "1. Send description to all Zone B volunteers and security.\n2. Guide parents to the Zone B Information Booth.\n3. Make a localized announcement in English and Spanish.\n4. Monitor exit cameras.",
      status: "Resolved",
      createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 mins ago
      assignedResources: {
        medical: "TBD",
        security: "TBD",
        volunteers: "Vol Group Red"
      },
      equipmentRequired: ["Radio", "First Aid Kit"],
      additionalBackup: "None required.",
      evacuationRoute: "N/A",
      alternativeRoute: "N/A",
      estimatedEvacuationTime: "Immediate",
      imageUrl: ""
    },
    {
      id: "inc-4",
      type: "Crowd stampede",
      description: "Severe crowd bottleneck at Gate 5. Outflow gates were locked, causing spectators leaving Section D12 to surge. People are getting pressed against the turnstiles, risk of crushing.",
      location: "Gate 5 (Section D12)",
      peopleAffected: 50,
      severity: "Critical",
      summary: "Dangerous crowd bottleneck at Gate 5 entrance/exit due to locked gates and sudden spectator outflow surge.",
      recommendedResponse: "Immediately unlock Gate 5 secondary exit gates. Dispatch Security Unit 3 and Vol Group Blue to manage crowd flow. Announce redirection to Gate 6.",
      estimatedResponseTime: "1 minute",
      protocol: "1. Unlock all safety gates at Gate 5 immediately.\n2. Dispatch Security Unit 3 to form a crowd-breaking wedge.\n3. Use megaphones to broadcast redirection announcements in English, Spanish, and French.\n4. Direct incoming crowd to Gate 6.",
      status: "Active",
      createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 mins ago
      assignedResources: {
        medical: "Team Alpha",
        security: "Guard Unit 3",
        volunteers: "Vol Group Blue"
      },
      equipmentRequired: ["Megaphones", "Barricades", "Loudspeakers"],
      additionalBackup: "Reserve Security Platoon 4 mobilized at Gate 5.",
      evacuationRoute: "Redirect crowd from Gate 5 to Gate 6 via Outer Ring Walkway.",
      alternativeRoute: "Move west across Outer Concourse, exit through Gate 7.",
      estimatedEvacuationTime: "6 minutes",
      imageUrl: ""
    }
  ],
  teams: {
    medical: [
      { id: "med-1", name: "Team Alpha", location: "Section C2 (Field Level)", status: "Dispatched", equipment: ["AED", "Trauma Kit", "Stretcher"] },
      { id: "med-2", name: "Team Beta", location: "Section C10", status: "Dispatched", equipment: ["AED", "Trauma Kit"] },
      { id: "med-3", name: "Team Gamma", location: "Section A1", status: "Available", equipment: ["First Aid Kit", "Oxygen Tank"] }
    ],
    security: [
      { id: "sec-1", name: "Guard Unit 1", location: "Section A10", status: "Dispatched", equipment: ["Radio", "Restraints", "Shields"] },
      { id: "sec-2", name: "Guard Unit 2", location: "Section B5", status: "Available", equipment: ["Radio", "Flashlight"] },
      { id: "sec-3", name: "Guard Unit 3", location: "Gate 5 Corridor", status: "Dispatched", equipment: ["Radio", "Crowd Barriers", "Megaphone"] }
    ],
    volunteers: [
      { id: "vol-1", name: "Vol Group Red", location: "Section B2 (Info Desk)", status: "Available", languages: ["English", "Spanish", "Portuguese"] },
      { id: "vol-2", name: "Vol Group Blue", location: "Section D12", status: "Dispatched", languages: ["English", "French", "Arabic"] },
      { id: "vol-3", name: "Vol Group Green", location: "Section A5", status: "Available", languages: ["English", "Spanish", "German"] }
    ]
  },
  announcements: [
    {
      id: "ann-1",
      originalText: "Attention all spectators near Section D12. Please do not head towards Gate 5. Gate 5 is currently congested. Please redirect to Gate 6 for your safety.",
      translations: {
        English: "Attention all spectators near Section D12. Please do not head towards Gate 5. Gate 5 is currently congested. Please redirect to Gate 6 for your safety.",
        Spanish: "Atención a todos los espectadores cerca de la Sección D12. Por favor, no se dirijan hacia la Puerta 5. La Puerta 5 está congestionada actualmente. Diríjase a la Puerta 6 por su seguridad.",
        French: "Attention à tous les spectateurs près de la Section D12. Veuillez ne pas vous diriger vers la Porte 5. La Porte 5 est actuellement encombrée. Veuillez vous diriger vers la Porte 6 pour votre sécurité.",
        Arabic: "انتباه لجميع المشاهدين بالقرب من القسم D12. يرجى عدم التوجه نحو البوابة 5. البوابة 5 مزدحمة حاليًا. يرجى التوجه إلى البوابة 6 حفاظًا على سلامتكم.",
        Portuguese: "Atenção a todos os espectadores próximos à Seção D12. Por favor, não se dirijam ao Portão 5. O Portão 5 está congestionado no momento. Por favor, vá para o Portão 6 para sua segurança."
      },
      createdAt: new Date(Date.now() - 1000 * 60 * 4).toISOString()
    }
  ]
};

if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(defaultData, null, 2), 'utf-8');
}

export function readData() {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (error) {
    console.error("Error reading database file, resetting:", error);
    return defaultData;
  }
}

export function writeData(data) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error("Error writing to database file:", error);
    return false;
  }
}

export function getIncidents() {
  return readData().incidents;
}

export function saveIncident(incident) {
  const data = readData();
  const index = data.incidents.findIndex(inc => inc.id === incident.id);
  if (index >= 0) {
    data.incidents[index] = { ...data.incidents[index], ...incident };
  } else {
    data.incidents.unshift(incident);
  }
  writeData(data);
  return incident;
}

export function deleteIncident(id) {
  const data = readData();
  data.incidents = data.incidents.filter(inc => inc.id !== id);
  writeData(data);
  return true;
}

export function getTeams() {
  return readData().teams;
}

export function updateTeamStatus(id, type, status, location) {
  const data = readData();
  const list = data.teams[type];
  if (!list) return false;
  const team = list.find(t => t.id === id);
  if (team) {
    team.status = status;
    if (location) team.location = location;
    writeData(data);
    return team;
  }
  return false;
}

export function getAnnouncements() {
  return readData().announcements;
}

export function saveAnnouncement(announcement) {
  const data = readData();
  data.announcements.unshift(announcement);
  writeData(data);
  return announcement;
}
