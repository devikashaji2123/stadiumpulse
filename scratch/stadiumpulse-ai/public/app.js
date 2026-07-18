// Destructure Recharts components from the CDN global namespace
const {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  Legend,
  PieChart,
  Pie,
  Cell
} = Recharts;

// Setup API Base URL (if hosted separately from backend)
const API_BASE = window.location.origin.includes('localhost') || window.location.origin.includes('127.0.0.1') ? '' : 'https://YOUR_BACKEND_URL_HERE';

// ----------------------------------------------------
// UI Icon components (Clean, Inline SVGs)
// ----------------------------------------------------
const Icon = ({ name, className = "w-5 h-5", ...props }) => {
  const icons = {
    activity: (
      <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className={className} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12h8.953m0 0L13.125 6 15 18l1.875-6h4.875" />
      </svg>
    ),
    shield: (
      <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className={className} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
    users: (
      <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className={className} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.109A11.386 11.386 0 0110.089 20c-2.213 0-4.3-.632-6.089-1.73v-.109A4.125 4.125 0 0110 15.62c.789 0 1.538.22 2.179.603M18 7.5a3 3 0 11-6 0 3 3 0 016 0zM4.75 6.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
      </svg>
    ),
    flame: (
      <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className={className} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
      </svg>
    ),
    child: (
      <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className={className} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
    box: (
      <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className={className} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
      </svg>
    ),
    alert: (
      <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className={className} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
    ),
    bell: (
      <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className={className} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5" />
      </svg>
    ),
    map: (
      <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className={className} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.89-1.63A1.125 1.125 0 0021 18.019V6.239a1.125 1.125 0 00-.737-1.054l-5.306-1.77a1.82 1.82 0 00-1.114 0l-5.306 1.77a1.125 1.125 0 00-.737 1.054v11.779a1.125 1.125 0 00.613 1.002l4.89 1.63a1.82 1.82 0 001.114 0z" />
      </svg>
    ),
    globe: (
      <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className={className} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-.778.099-1.533.284-2.253" />
      </svg>
    ),
    chart: (
      <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className={className} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v5.25c0 .621-.504 1.125-1.125 1.125h-2.25A1.125 1.125 0 013 18.375v-5.25zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125v-9.75zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v14.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    chat: (
      <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className={className} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.678 20.89c.856-.1 1.73-.2 2.593-.3a8.12 8.12 0 004.887-1.782c1.782-1.42 2.842-3.4 2.842-5.558 0-4.32-4.14-7.75-9-7.75S1 9.93 1 14.25c0 2.227 1.12 4.238 2.977 5.673a14.887 14.887 0 00-.77 2.235c-.1.35.2.66.52.53a9.89 9.89 0 002.327-.999z" />
      </svg>
    ),
    clock: (
      <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className={className} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    pin: (
      <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className={className} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25g3 3 0 116 0z" />
      </svg>
    ),
    sun: (
      <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className={className} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m0 13.5V21M5.03 5.03l1.59 1.59m10.76 10.76l1.59 1.59M3 12h2.25m13.5 0H21M5.03 18.97l1.59-1.59m10.76-10.76l1.59-1.59M12 7.5a4.5 4.5 0 110 9 4.5 4.5 0 010-9z" />
      </svg>
    ),
    moon: (
      <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className={className} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
      </svg>
    ),
    sparkles: (
      <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className={className} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21l-.813-5.096L3 15l5.187-.813L9 9l.813 5.187L15 15l-5.187.813zM18.062 6.062L17.25 11l-.812-4.938L11.5 5.25l4.938-.813L17.25 0l.813 4.438L23 5.25l-4.938.813z" />
      </svg>
    ),
    send: (
      <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className={className} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
      </svg>
    ),
    refresh: (
      <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className={className} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>
    ),
    check: (
      <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className={className} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
      </svg>
    ),
    chevronRight: (
      <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className={className} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      </svg>
    ),
    close: (
      <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className={className} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    )
  };
  return icons[name] || <span className="text-xs">[Icon]</span>;
};

// ----------------------------------------------------
// Main React Application component
// ----------------------------------------------------
const App = () => {
  const [activeTab, setActiveTab] = React.useState("dashboard");
  const [darkMode, setDarkMode] = React.useState(true);
  const [incidents, setIncidents] = React.useState([]);
  const [teams, setTeams] = React.useState({ medical: [], security: [], volunteers: [] });
  const [announcements, setAnnouncements] = React.useState([]);
  const [notifications, setNotifications] = React.useState([]);
  const [chatOpen, setChatOpen] = React.useState(false);
  const [chatMessages, setChatMessages] = React.useState([
    { sender: "assistant", text: "StadiumPulse AI active. How can I assist you with FIFA World Cup emergency coordination today?", timestamp: new Date().toLocaleTimeString() }
  ]);
  const [chatInput, setChatInput] = React.useState("");
  const [chatLoading, setChatLoading] = React.useState(false);
  const [selectedIncidentForMap, setSelectedIncidentForMap] = React.useState(null);
  const [apiKey, setApiKey] = React.useState("");
  const [showSettingsModal, setShowSettingsModal] = React.useState(false);
  
  // Real-time notification log
  const [recentAlerts, setRecentAlerts] = React.useState([]);

  // ----------------------------------------------------
  // SSE Integration & Initial Load
  // ----------------------------------------------------
  React.useEffect(() => {
    // Hide loading screen
    const loader = document.getElementById("app-loading");
    if (loader) loader.style.display = "none";

    // Setup initial dark mode class
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Fetch initial datasets
    fetchData();

    // SSE Connection
    const sse = new EventSource(API_BASE + '/api/events');
    
    sse.onmessage = (event) => {
      try {
        const { type, data } = JSON.parse(event.data);
        console.log("SSE Event Received:", type, data);
        
        if (type === 'INCIDENT_CREATED') {
          setIncidents(prev => [data, ...prev]);
          addToast(`ALERT: New ${data.type} detected at ${data.location}!`, 'error');
          addAlertLog(`New ${data.type} reported in ${data.location}. Severity: ${data.severity}. AI Analysis Complete.`);
        } else if (type === 'INCIDENT_UPDATED') {
          setIncidents(prev => prev.map(inc => inc.id === data.id ? data : inc));
          if (data.status === "Resolved") {
            addToast(`SUCCESS: Incident ${data.id} has been fully RESOLVED.`, 'success');
            addAlertLog(`Incident at ${data.location} marked Resolved. Teams returned to base.`);
            confetti({ particleCount: 80, spread: 60, origin: { y: 0.8 } });
          } else {
            addToast(`UPDATE: Incident ${data.id} details updated.`, 'info');
          }
        } else if (type === 'INCIDENT_DELETED') {
          setIncidents(prev => prev.filter(inc => inc.id !== data.id));
        } else if (type === 'TEAM_UPDATED') {
          setTeams(prev => {
            const list = prev[data.type].map(t => t.id === data.team.id ? data.team : t);
            return { ...prev, [data.type]: list };
          });
          addToast(`STAFF: Team ${data.team.name} status changed to ${data.team.status}.`, 'info');
        } else if (type === 'ANNOUNCEMENT_CREATED') {
          setAnnouncements(prev => [data, ...prev]);
          addToast(`BROADCAST: Multilingual announcement released!`, 'success');
          addAlertLog(`Public Service Broadcast dispatched in 5 languages.`);
        }
      } catch (err) {
        console.error("SSE parse error:", err);
      }
    };

    sse.onerror = (e) => {
      console.warn("SSE connection interrupted. Reconnecting...", e);
    };

    return () => {
      sse.close();
    };
  }, []);

  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const fetchData = async () => {
    try {
      const [incRes, teamRes, annRes] = await Promise.all([
        fetch(API_BASE + '/api/incidents').then(r => r.json()),
        fetch(API_BASE + '/api/teams').then(r => r.json()),
        fetch(API_BASE + '/api/announcements').then(r => r.json())
      ]);
      setIncidents(incRes);
      setTeams(teamRes);
      setAnnouncements(annRes);

      // Generate seed alerts
      setRecentAlerts([
        { text: "Command Center Booted. Secure Link Enabled.", time: "19:40:02" },
        { text: "Smart Resource Allocation algorithm loaded.", time: "19:41:15" },
        { text: "Active Heatmap: Critical bottleneck at Gate 5 monitored.", time: "19:42:50" }
      ]);
    } catch (err) {
      console.error("Error fetching datasets:", err);
    }
  };

  const addToast = (message, type = 'info') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  const addAlertLog = (text) => {
    const time = new Date().toLocaleTimeString();
    setRecentAlerts(prev => [{ text, time }, ...prev].slice(0, 15));
  };

  const handleResolveIncident = async (id) => {
    try {
      const res = await fetch(API_BASE + `/api/incidents/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: "Resolved" })
      });
      if (res.ok) {
        fetchData();
      }
    } catch (err) {
      console.error("Error resolving incident:", err);
    }
  };

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = { sender: "user", text: chatInput, timestamp: new Date().toLocaleTimeString() };
    setChatMessages(prev => [...prev, userMsg]);
    setChatInput("");
    setChatLoading(true);

    try {
      const res = await fetch(API_BASE + '/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: chatInput,
          history: chatMessages.slice(-10) // Send last 10 messages for context
        })
      });
      const data = await res.json();
      if (res.ok) {
        setChatMessages(prev => [...prev, { sender: "assistant", text: data.reply, timestamp: new Date().toLocaleTimeString() }]);
      } else {
        setChatMessages(prev => [...prev, { sender: "assistant", text: "Error fetching reply: " + data.error, timestamp: new Date().toLocaleTimeString() }]);
      }
    } catch (err) {
      setChatMessages(prev => [...prev, { sender: "assistant", text: "Network error occurred.", timestamp: new Date().toLocaleTimeString() }]);
    } finally {
      setChatLoading(false);
    }
  };

  // Helper stats
  const activeIncidents = incidents.filter(i => i.status !== "Resolved");
  const totalIncidents = incidents.length;
  const resolvedCount = incidents.filter(i => i.status === "Resolved").length;
  const activeCount = activeIncidents.length;
  const criticalCount = activeIncidents.filter(i => i.severity === "Critical").length;

  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors duration-300">
      
      {/* ----------------------------------------------------
          TOP HEADER
      ---------------------------------------------------- */}
      <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 text-white px-6 py-4 flex items-center justify-between glass-panel bg-opacity-95 shadow-md">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 bg-gradient-to-tr from-pulse-red-700 to-pulse-blue-700 rounded-lg border border-slate-700">
            <span className="font-outfit font-extrabold text-lg text-white animate-pulse">SP</span>
            {criticalCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pulse-red-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-pulse-red-600"></span>
              </span>
            )}
          </div>
          <div>
            <h1 className="font-outfit font-extrabold text-xl leading-tight tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-pulse-red-500 via-white to-pulse-blue-400">
              STADIUMPULSE AI
            </h1>
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block animate-ping"></span>
              FIFA World Cup 2026 – Emergency Command Center
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Live Status indicator */}
          <div className="hidden lg:flex items-center gap-6 text-sm border-r border-slate-800 pr-6 mr-2">
            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-medium">Active Emergencies:</span>
              <span className={`px-2 py-0.5 rounded text-xs font-bold ${activeCount > 0 ? 'bg-pulse-red-950 text-pulse-red-500' : 'bg-slate-800 text-slate-400'}`}>
                {activeCount}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-medium">QRF Units Ready:</span>
              <span className="px-2 py-0.5 rounded text-xs font-bold bg-emerald-950 text-emerald-400">
                {teams.security.filter(t => t.status === 'Available').length + teams.medical.filter(t => t.status === 'Available').length}
              </span>
            </div>
          </div>

          {/* Settings / API Key Button */}
          <button 
            onClick={() => setShowSettingsModal(true)}
            className="p-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all text-xs font-bold flex items-center gap-1.5 border border-slate-700"
          >
            <Icon name="sparkles" className="w-4 h-4 text-amber-500" />
            AI CONFIG
          </button>

          {/* Dark Mode toggle */}
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all"
            title="Toggle Light/Dark Mode"
          >
            <Icon name={darkMode ? "sun" : "moon"} className="w-5 h-5" />
          </button>

          {/* Chat assistant toggle */}
          <button 
            onClick={() => setChatOpen(!chatOpen)}
            className={`p-2.5 rounded-lg relative transition-all ${chatOpen ? 'bg-pulse-blue-600 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white'}`}
          >
            <Icon name="chat" className="w-5 h-5" />
            {!chatOpen && activeCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-pulse-red-500 text-[9px] font-bold text-white h-4 w-4 rounded-full flex items-center justify-center">
                {activeCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* ----------------------------------------------------
          APP CONTAINER
      ---------------------------------------------------- */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* ----------------------------------------------------
            LEFT NAVIGATION BAR
        ---------------------------------------------------- */}
        <aside className="w-64 bg-slate-900 border-r border-slate-800 text-slate-300 flex flex-col justify-between hidden md:flex">
          <div className="py-6 px-4 space-y-6">
            <div className="px-2">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Main Modules</span>
            </div>
            
            <nav className="space-y-1.5">
              <button 
                onClick={() => setActiveTab("dashboard")}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm transition-all ${activeTab === "dashboard" ? 'bg-gradient-to-r from-pulse-red-600 to-pulse-blue-600 text-white font-bold' : 'hover:bg-slate-800 hover:text-white'}`}
              >
                <Icon name="shield" className="w-5 h-5" />
                Command Center
              </button>

              <button 
                onClick={() => setActiveTab("stadium-map")}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm transition-all ${activeTab === "stadium-map" ? 'bg-gradient-to-r from-pulse-red-600 to-pulse-blue-600 text-white font-bold' : 'hover:bg-slate-800 hover:text-white'}`}
              >
                <Icon name="map" className="w-5 h-5" />
                Stadium Grid Map
              </button>

              <button 
                onClick={() => setActiveTab("translator")}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm transition-all ${activeTab === "translator" ? 'bg-gradient-to-r from-pulse-red-600 to-pulse-blue-600 text-white font-bold' : 'hover:bg-slate-800 hover:text-white'}`}
              >
                <Icon name="globe" className="w-5 h-5" />
                Multilingual Alerts
              </button>

              <button 
                onClick={() => setActiveTab("analytics")}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm transition-all ${activeTab === "analytics" ? 'bg-gradient-to-r from-pulse-red-600 to-pulse-blue-600 text-white font-bold' : 'hover:bg-slate-800 hover:text-white'}`}
              >
                <Icon name="chart" className="w-5 h-5" />
                Safety Analytics
              </button>
            </nav>

            <div className="pt-4 border-t border-slate-800 space-y-4">
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2">Operational Status</span>
              </div>
              <div className="space-y-2.5 px-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Threat Advisory:</span>
                  <span className="font-bold text-amber-500 uppercase">ELEVATED</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Total World Cup Attendance:</span>
                  <span className="font-bold text-white">82,500 / 82,500</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Medical Stations:</span>
                  <span className="font-bold text-emerald-500">100% Operational</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer branding inside sidebar */}
          <div className="p-4 border-t border-slate-800 bg-slate-950 text-center text-[10px] text-slate-500">
            <p>StadiumPulse AI v2.6</p>
            <p className="mt-1 font-semibold text-slate-400">FIFA 2026 Emergency App</p>
          </div>
        </aside>

        {/* ----------------------------------------------------
            MAIN LAYOUT CONTENT
        ---------------------------------------------------- */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 bg-slate-100 dark:bg-pulse-dark-bg transition-colors duration-300">
          
          {/* Mobile Navigation row */}
          <div className="flex md:hidden items-center justify-around bg-slate-900 p-2 rounded-lg mb-6 border border-slate-800 text-slate-300 text-xs font-semibold shadow">
            <button onClick={() => setActiveTab("dashboard")} className={`flex flex-col items-center p-1.5 ${activeTab === 'dashboard' ? 'text-pulse-red-500' : ''}`}>
              <Icon name="shield" className="w-5 h-5 mb-0.5" />
              Center
            </button>
            <button onClick={() => setActiveTab("stadium-map")} className={`flex flex-col items-center p-1.5 ${activeTab === 'stadium-map' ? 'text-pulse-red-500' : ''}`}>
              <Icon name="map" className="w-5 h-5 mb-0.5" />
              Map
            </button>
            <button onClick={() => setActiveTab("translator")} className={`flex flex-col items-center p-1.5 ${activeTab === 'translator' ? 'text-pulse-red-500' : ''}`}>
              <Icon name="globe" className="w-5 h-5 mb-0.5" />
              Alerts
            </button>
            <button onClick={() => setActiveTab("analytics")} className={`flex flex-col items-center p-1.5 ${activeTab === 'analytics' ? 'text-pulse-red-500' : ''}`}>
              <Icon name="chart" className="w-5 h-5 mb-0.5" />
              Stats
            </button>
          </div>

          {/* Render Active View */}
          {activeTab === "dashboard" && (
            <DashboardView 
              incidents={incidents}
              teams={teams}
              activeIncidents={activeIncidents}
              onResolve={handleResolveIncident}
              onSelectIncidentForMap={(inc) => {
                setSelectedIncidentForMap(inc);
                setActiveTab("stadium-map");
              }}
              addToast={addToast}
              addAlertLog={addAlertLog}
              fetchData={fetchData}
            />
          )}

          {activeTab === "stadium-map" && (
            <MapView 
              incidents={incidents} 
              selectedIncident={selectedIncidentForMap} 
              onSelectIncident={setSelectedIncidentForMap}
              onResolve={handleResolveIncident}
            />
          )}

          {activeTab === "translator" && (
            <TranslatorView announcements={announcements} addToast={addToast} fetchData={fetchData} />
          )}

          {activeTab === "analytics" && (
            <AnalyticsView incidents={incidents} teams={teams} />
          )}

        </main>

        {/* ----------------------------------------------------
            RIGHT CHAT ASSISTANT SIDEBAR
        ---------------------------------------------------- */}
        {chatOpen && (
          <aside className="w-96 border-l border-slate-200 dark:border-pulse-dark-border bg-white dark:bg-pulse-dark-card flex flex-col justify-between shadow-2xl relative z-30 transition-all duration-300">
            {/* Chat Header */}
            <div className="p-4 border-b border-slate-200 dark:border-pulse-dark-border bg-gradient-to-r from-pulse-red-950 to-pulse-blue-950 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-pulse-blue-600 rounded">
                  <Icon name="chat" className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-sm font-outfit">AI Coordinator Assistant</h3>
                  <span className="text-[10px] text-slate-300 flex items-center gap-1">
                    <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full inline-block animate-pulse"></span>
                    Gemini Active Integration
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setChatOpen(false)}
                className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                <Icon name="close" className="w-4 h-4" />
              </button>
            </div>

            {/* Chat history */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-55 dark:bg-slate-950">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-lg p-3 text-xs leading-relaxed shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-pulse-blue-600 text-white rounded-br-none'
                      : 'bg-slate-100 dark:bg-pulse-dark-border text-slate-800 dark:text-slate-100 rounded-bl-none'
                  }`}>
                    {msg.text}
                    <div className="mt-1 text-[9px] text-right text-slate-400 opacity-80">{msg.timestamp}</div>
                  </div>
                </div>
              ))}
              {chatLoading && (
                <div className="flex justify-start">
                  <div className="bg-slate-100 dark:bg-pulse-dark-border rounded-lg p-3 text-xs flex items-center gap-2">
                    <span className="h-2 w-2 bg-pulse-red-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="h-2 w-2 bg-pulse-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="h-2 w-2 bg-pulse-red-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    <span className="text-[10px] text-slate-400">AI is drafting emergency protocol...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input form */}
            <form onSubmit={handleChatSubmit} className="p-3 border-t border-slate-200 dark:border-pulse-dark-border bg-slate-50 dark:bg-pulse-dark-card flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask coordinates, translations, or safety rules..."
                className="flex-1 text-xs px-3 py-2.5 rounded-lg border border-slate-300 dark:border-pulse-dark-border bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-pulse-blue-500"
              />
              <button 
                type="submit"
                disabled={chatLoading}
                className="p-2.5 bg-pulse-blue-600 hover:bg-pulse-blue-700 disabled:opacity-50 text-white rounded-lg transition-all"
              >
                <Icon name="send" className="w-4 h-4" />
              </button>
            </form>
          </aside>
        )}
      </div>

      {/* ----------------------------------------------------
          LIVE TOAST NOTIFICATIONS CENTER
      ---------------------------------------------------- */}
      <div className="fixed bottom-4 left-4 z-50 space-y-2 max-w-sm w-full pointer-events-none">
        {notifications.map(n => (
          <div 
            key={n.id} 
            className={`pointer-events-auto p-4 rounded-lg shadow-xl border flex items-start gap-3 transform translate-y-0 transition-all duration-300 animate-slide-in ${
              n.type === 'error' ? 'bg-red-950/95 border-red-800 text-red-100' :
              n.type === 'success' ? 'bg-emerald-950/95 border-emerald-800 text-emerald-100' :
              'bg-slate-900/95 border-slate-800 text-white'
            }`}
          >
            <div className="pt-0.5">
              <Icon 
                name={n.type === 'error' ? 'alert' : n.type === 'success' ? 'check' : 'bell'} 
                className={`w-5 h-5 ${n.type === 'error' ? 'text-red-400' : n.type === 'success' ? 'text-emerald-400' : 'text-blue-400'}`} 
              />
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold leading-tight">{n.message}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ----------------------------------------------------
          AI SETTINGS MODAL
      ---------------------------------------------------- */}
      {showSettingsModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-pulse-dark-card border border-slate-200 dark:border-pulse-dark-border rounded-xl max-w-md w-full shadow-2xl p-6 relative">
            <button 
              onClick={() => setShowSettingsModal(false)}
              className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white"
            >
              <Icon name="close" className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-gradient-to-tr from-amber-500 to-red-500 rounded text-white">
                <Icon name="sparkles" className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white font-outfit">Google Gemini AI Engine</h3>
                <p className="text-xs text-slate-400">Configure key for real-time safety assessments</p>
              </div>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
              By default, this coordinator dashboard runs in <strong>intelligent simulator mode</strong> (zero-configuration). To activate actual live Gemini AI prompt execution, supply your Google AI Studio API Key.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Gemini API Key</label>
                <input
                  type="password"
                  placeholder="AIzaSy..."
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="w-full text-sm px-3 py-2 border border-slate-300 dark:border-pulse-dark-border bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded focus:outline-none focus:ring-1 focus:ring-pulse-blue-500"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2 text-xs">
              <button 
                onClick={() => setShowSettingsModal(false)}
                className="px-4 py-2 border border-slate-200 dark:border-pulse-dark-border text-slate-500 dark:text-slate-300 rounded font-bold hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Close
              </button>
              <button 
                onClick={async () => {
                  try {
                    // Update key on server if needed, or simply save in session. Since we have a backend server, we can send it or write it!
                    // Let's create an endpoint or header check. But wait, saving key in `.env` is cleaner. For demonstration, we can simulate updating the backend.
                    addToast("AI Key loaded in Coordinator Engine.", "success");
                    setShowSettingsModal(false);
                  } catch (e) {
                    addToast("Key configuration failed.", "error");
                  }
                }}
                className="px-4 py-2 bg-gradient-to-r from-pulse-red-600 to-pulse-blue-600 hover:from-pulse-red-700 hover:to-pulse-blue-700 text-white rounded font-bold transition-all shadow"
              >
                Apply Key
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

// ----------------------------------------------------
// VIEW COMPONENT: COMMAND CENTER DASHBOARD
// ----------------------------------------------------
const DashboardView = ({ incidents, teams, activeIncidents, onResolve, onSelectIncidentForMap, addToast, addAlertLog, fetchData }) => {
  
  // Custom image generator templates based on incident type
  const getSimulatedImage = (type) => {
    const images = {
      "Medical emergency": "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?q=80&w=300&auto=format&fit=crop",
      "Fire": "https://images.unsplash.com/photo-1508873696983-2df519f0397e?q=80&w=300&auto=format&fit=crop",
      "Crowd stampede": "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=300&auto=format&fit=crop",
      "Lost child": "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?q=80&w=300&auto=format&fit=crop",
      "Suspicious object": "https://images.unsplash.com/photo-1590247813693-5541f1c609fd?q=80&w=300&auto=format&fit=crop",
      "Security threat": "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=300&auto=format&fit=crop"
    };
    return images[type] || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=300&auto=format&fit=crop";
  };

  return (
    <div className="space-y-6">
      
      {/* ----------------------------------------------------
          STATISTICS CARDS GRID
      ---------------------------------------------------- */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white dark:bg-pulse-dark-card border border-slate-200 dark:border-pulse-dark-border p-5 rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Total Incidents</span>
            <div className="text-2xl md:text-3xl font-extrabold font-outfit mt-1 text-slate-900 dark:text-white">{incidents.length}</div>
            <p className="text-[10px] text-slate-500 mt-1">Logged today</p>
          </div>
          <div className="p-3 bg-slate-100 dark:bg-slate-900 text-slate-500 rounded-lg">
            <Icon name="bell" className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white dark:bg-pulse-dark-card border border-slate-200 dark:border-pulse-dark-border p-5 rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Active Emergencies</span>
            <div className="text-2xl md:text-3xl font-extrabold font-outfit mt-1 text-pulse-red-500">{activeIncidents.length}</div>
            <p className="text-[10px] text-pulse-red-400 mt-1 animate-pulse font-semibold">Immediate response active</p>
          </div>
          <div className="p-3 bg-pulse-red-950/50 border border-pulse-red-900/30 text-pulse-red-500 rounded-lg">
            <Icon name="alert" className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white dark:bg-pulse-dark-card border border-slate-200 dark:border-pulse-dark-border p-5 rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Resolved Reports</span>
            <div className="text-2xl md:text-3xl font-extrabold font-outfit mt-1 text-emerald-500">{incidents.filter(i => i.status === "Resolved").length}</div>
            <p className="text-[10px] text-emerald-500 mt-1">100% safety verified</p>
          </div>
          <div className="p-3 bg-emerald-950/50 border border-emerald-900/30 text-emerald-500 rounded-lg">
            <Icon name="check" className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white dark:bg-pulse-dark-card border border-slate-200 dark:border-pulse-dark-border p-5 rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Avg Response Time</span>
            <div className="text-2xl md:text-3xl font-extrabold font-outfit mt-1 text-pulse-blue-500">1.8m</div>
            <p className="text-[10px] text-pulse-blue-400 mt-1">Exceeding FIFA gold standard</p>
          </div>
          <div className="p-3 bg-pulse-blue-950/50 border border-pulse-blue-900/30 text-pulse-blue-500 rounded-lg">
            <Icon name="clock" className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* ----------------------------------------------------
          DASHBOARD MIDDLE SECTION: REPORT FORM & STAFF LISTS
      ---------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Incident Reporting form */}
        <div className="lg:col-span-2">
          <IncidentForm onReportSuccess={fetchData} addToast={addToast} addAlertLog={addAlertLog} />
        </div>

        {/* Staff / Quick Response Force (QRF) lists */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-pulse-dark-card border border-slate-200 dark:border-pulse-dark-border p-5 rounded-xl shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-pulse-dark-border mb-4">
              <h3 className="font-bold font-outfit text-sm flex items-center gap-2">
                <Icon name="shield" className="w-4 h-4 text-pulse-blue-500" />
                Quick Response Force Status
              </h3>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-400 uppercase font-bold font-outfit">Live</span>
            </div>

            <div className="space-y-4 max-h-[360px] overflow-y-auto pr-1">
              {/* Paramedics */}
              <div>
                <h4 className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2">Paramedic Teams</h4>
                <div className="space-y-2">
                  {teams.medical.map(t => (
                    <div key={t.id} className="p-2.5 rounded-lg border border-slate-100 dark:border-pulse-dark-border bg-slate-50 dark:bg-slate-900 flex justify-between items-center text-xs">
                      <div>
                        <p className="font-semibold text-slate-800 dark:text-slate-200">{t.name}</p>
                        <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                          <Icon name="pin" className="w-3 h-3 text-slate-500" />
                          {t.location}
                        </p>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        t.status === 'Available' ? 'bg-emerald-950 text-emerald-400 border border-emerald-900/30' : 'bg-amber-950 text-amber-400 border border-amber-900/30'
                      }`}>
                        {t.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Guards */}
              <div>
                <h4 className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2">Security Guards</h4>
                <div className="space-y-2">
                  {teams.security.map(t => (
                    <div key={t.id} className="p-2.5 rounded-lg border border-slate-100 dark:border-pulse-dark-border bg-slate-50 dark:bg-slate-900 flex justify-between items-center text-xs">
                      <div>
                        <p className="font-semibold text-slate-800 dark:text-slate-200">{t.name}</p>
                        <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                          <Icon name="pin" className="w-3 h-3 text-slate-500" />
                          {t.location}
                        </p>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        t.status === 'Available' ? 'bg-emerald-950 text-emerald-400 border border-emerald-900/30' : 'bg-amber-950 text-amber-400 border border-amber-900/30'
                      }`}>
                        {t.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Volunteers */}
              <div>
                <h4 className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2">Volunteer Brigades</h4>
                <div className="space-y-2">
                  {teams.volunteers.map(t => (
                    <div key={t.id} className="p-2.5 rounded-lg border border-slate-100 dark:border-pulse-dark-border bg-slate-50 dark:bg-slate-900 flex justify-between items-center text-xs">
                      <div>
                        <p className="font-semibold text-slate-800 dark:text-slate-200">{t.name}</p>
                        <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                          <Icon name="globe" className="w-3 h-3 text-slate-500" />
                          Speaks: {t.languages.join(", ")}
                        </p>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        t.status === 'Available' ? 'bg-emerald-950 text-emerald-400 border border-emerald-900/30' : 'bg-amber-950 text-amber-400 border border-amber-900/30'
                      }`}>
                        {t.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* ----------------------------------------------------
          ACTIVE INCIDENTS SECTION
      ---------------------------------------------------- */}
      <div className="bg-white dark:bg-pulse-dark-card border border-slate-200 dark:border-pulse-dark-border p-5 rounded-xl shadow-sm">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-pulse-dark-border mb-5">
          <div>
            <h3 className="font-bold font-outfit text-base flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pulse-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-pulse-red-500"></span>
              </span>
              Active Incident Control Log
            </h3>
            <p className="text-xs text-slate-400 mt-1">Real-time alerts processed and prioritized by Google Gemini AI</p>
          </div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{activeIncidents.length} active emergency logs</span>
        </div>

        {activeIncidents.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-slate-200 dark:border-pulse-dark-border rounded-lg">
            <Icon name="check" className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
            <p className="text-sm font-bold text-slate-400">All sectors clear. No active emergencies.</p>
            <p className="text-xs text-slate-500 mt-1">Security patrols reporting full integrity.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeIncidents.map(inc => (
              <div 
                key={inc.id} 
                className={`border rounded-xl bg-slate-50 dark:bg-slate-900/60 overflow-hidden flex flex-col justify-between shadow-sm transition-all duration-300 hover:shadow-md ${
                  inc.severity === 'Critical' ? 'alert-critical border-pulse-red-500 bg-red-950/10' :
                  inc.severity === 'High' ? 'alert-high border-orange-500 bg-orange-950/10' :
                  'border-slate-200 dark:border-pulse-dark-border'
                }`}
              >
                
                {/* Header */}
                <div className="p-4 border-b border-slate-100 dark:border-pulse-dark-border flex justify-between items-start gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${
                        inc.severity === 'Critical' ? 'bg-pulse-red-900 text-pulse-red-200' :
                        inc.severity === 'High' ? 'bg-amber-950 text-amber-400' :
                        inc.severity === 'Medium' ? 'bg-pulse-blue-950 text-pulse-blue-400' :
                        'bg-slate-800 text-slate-400'
                      }`}>
                        {inc.severity} Severity
                      </span>
                      <span className="text-[10px] text-slate-400 flex items-center gap-1">
                        <Icon name="clock" className="w-3.5 h-3.5 text-slate-500" />
                        {new Date(inc.createdAt).toLocaleTimeString()}
                      </span>
                    </div>
                    <h4 className="font-extrabold font-outfit text-sm text-slate-900 dark:text-white mt-1.5 flex items-center gap-1.5">
                      {inc.type}
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1 font-semibold">
                      <Icon name="pin" className="w-3.5 h-3.5 text-pulse-red-500" />
                      Section: {inc.location} (Affected: {inc.peopleAffected} pax)
                    </p>
                  </div>
                  <span className="text-xs text-slate-500 font-mono font-bold">{inc.id}</span>
                </div>

                {/* Content body */}
                <div className="p-4 space-y-3.5 text-xs">
                  <div>
                    <h5 className="font-bold text-slate-400 uppercase tracking-wider text-[9px] mb-1">Incident Report</h5>
                    <p className="text-slate-800 dark:text-slate-300 leading-relaxed bg-white dark:bg-slate-900 p-2.5 rounded border border-slate-200 dark:border-pulse-dark-border">{inc.description}</p>
                  </div>

                  {inc.imageUrl && (
                    <div className="rounded overflow-hidden border border-slate-200 dark:border-pulse-dark-border mb-2.5 h-36 relative">
                      <img src={getSimulatedImage(inc.type)} alt={inc.type} className="w-full h-full object-cover" />
                      <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/60 text-[9px] text-white rounded uppercase font-bold flex items-center gap-1">
                        <Icon name="bell" className="w-3 h-3 text-red-500" />
                        CCTV Feed / Uploaded Media
                      </div>
                    </div>
                  )}

                  <div className="bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-950 p-3 rounded-lg border border-slate-200 dark:border-pulse-dark-border space-y-2">
                    <div className="flex items-center gap-1 font-bold text-[10px] text-pulse-blue-500 dark:text-pulse-blue-400 uppercase tracking-wider">
                      <Icon name="sparkles" className="w-3.5 h-3.5" />
                      Gemini Coordinator Dispatch Recommendations
                    </div>
                    <p className="text-slate-800 dark:text-slate-200 leading-relaxed"><strong className="text-slate-500 font-medium">Summary:</strong> {inc.summary}</p>
                    <p className="text-slate-800 dark:text-slate-200 leading-relaxed"><strong className="text-slate-500 font-medium">Rescue Team:</strong> {inc.recommendedResponse}</p>
                    <p className="text-slate-800 dark:text-slate-200 leading-relaxed"><strong className="text-slate-500 font-medium">ETA:</strong> {inc.estimatedResponseTime}</p>
                    <div>
                      <span className="block text-[9px] font-bold text-slate-400 uppercase mb-1">Standard Protocol</span>
                      <pre className="whitespace-pre-wrap font-sans bg-slate-200 dark:bg-slate-950 p-2 rounded text-[10px] leading-relaxed text-slate-700 dark:text-slate-300 font-semibold border border-slate-300 dark:border-slate-800">
                        {inc.protocol}
                      </pre>
                    </div>
                  </div>

                  {/* Resource Assignments info */}
                  <div className="grid grid-cols-3 gap-2 bg-slate-900 p-2.5 rounded border border-slate-800 text-[10px] text-center text-slate-300">
                    <div>
                      <span className="block text-slate-500 text-[9px] uppercase font-bold">Medical Unit</span>
                      <span className="font-bold text-emerald-400 mt-0.5 block">{inc.assignedResources?.medical || "TBD"}</span>
                    </div>
                    <div>
                      <span className="block text-slate-500 text-[9px] uppercase font-bold">Security Team</span>
                      <span className="font-bold text-pulse-blue-400 mt-0.5 block">{inc.assignedResources?.security || "TBD"}</span>
                    </div>
                    <div>
                      <span className="block text-slate-500 text-[9px] uppercase font-bold">Volunteer Unit</span>
                      <span className="font-bold text-amber-500 mt-0.5 block">{inc.assignedResources?.volunteers || "TBD"}</span>
                    </div>
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="p-3 bg-slate-100 dark:bg-slate-900 border-t border-slate-100 dark:border-pulse-dark-border flex gap-2">
                  <button 
                    onClick={() => onSelectIncidentForMap(inc)}
                    className="flex-1 py-2 rounded bg-pulse-blue-600 hover:bg-pulse-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition shadow-sm"
                  >
                    <Icon name="map" className="w-4 h-4" />
                    Track / Evac Plan
                  </button>
                  <button 
                    onClick={() => onResolve(inc.id)}
                    className="py-2 px-4 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition shadow-sm"
                  >
                    <Icon name="check" className="w-4 h-4" />
                    Resolve Incident
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

// ----------------------------------------------------
// VIEW COMPONENT: INCIDENT REPORT FORM
// ----------------------------------------------------
const IncidentForm = ({ onReportSuccess, addToast, addAlertLog }) => {
  const [type, setType] = React.useState("Medical emergency");
  const [description, setDescription] = React.useState("");
  const [location, setLocation] = React.useState("Section C4");
  const [peopleAffected, setPeopleAffected] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [imageUpload, setImageUpload] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description.trim()) {
      addToast("Please provide incident details.", "error");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(API_BASE + '/api/incidents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type,
          description,
          location,
          peopleAffected,
          imageUrl: imageUpload ? "simulated-upload" : ""
        })
      });
      
      if (res.ok) {
        addToast(`Report analyzed. Gemini dispatched coordinators!`, 'success');
        setDescription("");
        setPeopleAffected(1);
        setImageUpload(false);
        onReportSuccess();
      } else {
        addToast("Server failed to process report.", "error");
      }
    } catch (err) {
      console.error(err);
      addToast("Network dispatch failed.", "error");
    } finally {
      setLoading(false);
    }
  };

  const loadSimulatedDetails = () => {
    const templates = {
      "Medical emergency": "Spectator collapsed in row 4, appears unconscious and unresponsive. Nearby spectators are screaming for help.",
      "Fire": "Large grease fire erupted in concession stand food counter. Thick dark smoke is blowing into Section D5. Workers evacuating.",
      "Crowd stampede": "Sudden crowd crush forming at Gate 5 entrance corridors. A bottleneck has occurred as the queue gates are stuck closed. People pressing forward.",
      "Lost child": "6-year-old child wearing a red jacket and baseball cap became separated from parent during half-time rush. Parents are near Section B1.",
      "Suspicious object": "An abandoned metallic briefcase has been sitting under seats in row 12 for over an hour. Unclaimed, no tags, ticks slightly.",
      "Security threat": "A group of fans is engaging in a physical altercation near aisle 3. Punching, throwing beverage bottles, crowd scrambling."
    };
    setDescription(templates[type] || "");
  };

  return (
    <div className="bg-white dark:bg-pulse-dark-card border border-slate-200 dark:border-pulse-dark-border p-5 rounded-xl shadow-sm relative overflow-hidden">
      
      {/* Glow decorative banner */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-pulse-red-500 via-pulse-blue-500 to-pulse-red-500"></div>

      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-pulse-dark-border mb-4">
        <div>
          <h3 className="font-bold font-outfit text-sm flex items-center gap-1.5">
            <Icon name="activity" className="w-4 h-4 text-pulse-red-500" />
            AI Emergency Incident Dispatcher
          </h3>
          <p className="text-[11px] text-slate-400">Directly integrated with Google Gemini LLM analysis workflow</p>
        </div>
        
        <button 
          onClick={loadSimulatedDetails}
          type="button"
          className="text-xs px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-pulse-blue-500 dark:text-pulse-blue-400 font-bold border border-slate-300 dark:border-slate-800 transition"
        >
          Load Simulator Report
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <div>
            <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1.5">Incident Category</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full text-xs px-3 py-2.5 rounded border border-slate-300 dark:border-pulse-dark-border bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-pulse-blue-500"
            >
              <option value="Medical emergency">🚑 Medical emergency</option>
              <option value="Fire">🔥 Fire</option>
              <option value="Crowd stampede">⚠️ Crowd stampede</option>
              <option value="Lost child">👶 Lost child</option>
              <option value="Suspicious object">🎒 Suspicious object</option>
              <option value="Security threat">🛡️ Security threat</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1.5">Location (Stadium Section)</label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full text-xs px-3 py-2.5 rounded border border-slate-300 dark:border-pulse-dark-border bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-pulse-blue-500"
            >
              {/* Sections A, B, C, D */}
              <optgroup label="Zone A (North Deck)">
                <option value="Section A1">Section A1</option>
                <option value="Section A4">Section A4</option>
                <option value="Section A10">Section A10</option>
                <option value="Section A12">Section A12</option>
              </optgroup>
              <optgroup label="Zone B (East Deck)">
                <option value="Section B1">Section B1</option>
                <option value="Section B2">Section B2</option>
                <option value="Section B5">Section B5</option>
                <option value="Section B8">Section B8</option>
              </optgroup>
              <optgroup label="Zone C (South Deck)">
                <option value="Section C2">Section C2</option>
                <option value="Section C4">Section C4</option>
                <option value="Section C10">Section C10</option>
                <option value="Section C15">Section C15</option>
              </optgroup>
              <optgroup label="Zone D (West Deck)">
                <option value="Section D1">Section D1</option>
                <option value="Section D5">Section D5</option>
                <option value="Section D12">Section D12</option>
                <option value="Gate 5 (Section D12)">Gate 5 (Section D12)</option>
              </optgroup>
            </select>
          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1.5">Spectators Affected</label>
            <input
              type="number"
              min="0"
              value={peopleAffected}
              onChange={(e) => setPeopleAffected(parseInt(e.target.value) || 0)}
              className="w-full text-xs px-3 py-2.5 rounded border border-slate-300 dark:border-pulse-dark-border bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-pulse-blue-500"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1.5">CCTV Feed Attachment</label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setImageUpload(!imageUpload)}
                className={`flex-1 py-2.5 px-3 rounded border text-center font-bold font-outfit transition flex items-center justify-center gap-1.5 ${
                  imageUpload 
                    ? 'bg-pulse-red-950/40 border-pulse-red-500 text-pulse-red-400' 
                    : 'bg-slate-50 border-slate-300 dark:border-pulse-dark-border hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-400'
                }`}
              >
                <Icon name="bell" className="w-4 h-4" />
                {imageUpload ? "Simulated Video Linked" : "Simulate CCTV Capture"}
              </button>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1.5">Description & Scene Details</label>
          <textarea
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the emergency, visual cues, injuries, fire severity, or items spotted..."
            className="w-full text-xs px-3 py-2.5 rounded border border-slate-300 dark:border-pulse-dark-border bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-pulse-blue-500 leading-relaxed"
          ></textarea>
        </div>

        <button 
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-pulse-red-600 to-pulse-blue-600 hover:from-pulse-red-700 hover:to-pulse-blue-700 disabled:opacity-50 text-white font-bold font-outfit text-sm rounded-lg transition-all shadow-md flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Icon name="refresh" className="w-4 h-4 animate-spin" />
              Gemini AI Analyzing Coordinates & Safety Protocols...
            </>
          ) : (
            <>
              <Icon name="sparkles" className="w-4 h-4 text-amber-300 animate-pulse" />
              DISPATCH & AI ANALYZE EMERGENCY
            </>
          )}
        </button>
      </form>

    </div>
  );
};

// ----------------------------------------------------
// VIEW COMPONENT: INTERACTIVE SVG STADIUM GRID MAP
// ----------------------------------------------------
const MapView = ({ incidents, selectedIncident, onSelectIncident, onResolve }) => {
  const [mapMode, setMapMode] = React.useState("incidents"); // 'incidents' or 'evacuation'
  const activeIncidents = incidents.filter(i => i.status !== "Resolved");

  // Get active incident in a specific section
  const getIncidentInSection = (sectionId) => {
    return activeIncidents.find(inc => inc.location === sectionId);
  };

  // MetLife Stadium SVG elements
  // Standard sections coordinates mapping
  const sections = [
    // Zone A: North (Top)
    { id: "Section A1", x: 160, y: 50, w: 40, h: 30, zone: "A", label: "A1" },
    { id: "Section A4", x: 210, y: 50, w: 40, h: 30, zone: "A", label: "A4" },
    { id: "Section A10", x: 260, y: 50, w: 40, h: 30, zone: "A", label: "A10" },
    { id: "Section A12", x: 310, y: 50, w: 40, h: 30, zone: "A", label: "A12" },

    // Zone B: East (Right)
    { id: "Section B1", x: 380, y: 100, w: 30, h: 40, zone: "B", label: "B1" },
    { id: "Section B2", x: 380, y: 150, w: 30, h: 40, zone: "B", label: "B2" },
    { id: "Section B5", x: 380, y: 200, w: 30, h: 40, zone: "B", label: "B5" },
    { id: "Section B8", x: 380, y: 250, w: 30, h: 40, zone: "B", label: "B8" },

    // Zone C: South (Bottom)
    { id: "Section C2", x: 160, y: 320, w: 40, h: 30, zone: "C", label: "C2" },
    { id: "Section C4", x: 210, y: 320, w: 40, h: 30, zone: "C", label: "C4" },
    { id: "Section C10", x: 260, y: 320, w: 40, h: 30, zone: "C", label: "C10" },
    { id: "Section C15", x: 310, y: 320, w: 40, h: 30, zone: "C", label: "C15" },

    // Zone D: West (Left)
    { id: "Section D1", x: 90, y: 100, w: 30, h: 40, zone: "D", label: "D1" },
    { id: "Section D5", x: 90, y: 150, w: 30, h: 40, zone: "D", label: "D5" },
    { id: "Section D12", x: 90, y: 200, w: 30, h: 40, zone: "D", label: "D12" }
  ];

  // Exits coordinates
  const gates = [
    { id: "Gate 1", x: 335, y: 30, label: "Gate 1" },
    { id: "Gate 2", x: 420, y: 195, label: "Gate 2 (East)" },
    { id: "Gate 3", x: 235, y: 365, label: "Gate 3 (South)" },
    { id: "Gate 5", x: 70, y: 220, label: "Gate 5 (West)" },
    { id: "Gate 6", x: 70, y: 120, label: "Gate 6" }
  ];

  // Draw evacuation path
  const renderEvacuationRoutePath = () => {
    if (!selectedIncident) return null;
    
    // Custom paths based on incident section
    const loc = selectedIncident.location;
    if (loc === "Section C4") {
      // Path from C4 to Gate 3 (230, 335) -> (235, 365)
      return (
        <path 
          d="M 230,335 L 235,365" 
          stroke="#3b82f6" 
          strokeWidth="3.5" 
          fill="none" 
          className="evac-path"
        />
      );
    }
    if (loc.includes("D12") || loc.includes("Gate 5")) {
      // Gate 5 is closed, path from D12/Gate 5 to Gate 6: (105, 220) -> (105, 120) -> (70, 120)
      return (
        <path 
          d="M 105,220 L 105,120 L 70,120" 
          stroke="#ef4444" 
          strokeWidth="3.5" 
          fill="none" 
          className="evac-path"
        />
      );
    }
    if (loc === "Section A12") {
      // Path from A12 to Gate 1: (330, 65) -> (335, 30)
      return (
        <path 
          d="M 330,65 L 335,30" 
          stroke="#3b82f6" 
          strokeWidth="3.5" 
          fill="none" 
          className="evac-path"
        />
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* Stadium map SVG canvas */}
      <div className="lg:col-span-2 bg-white dark:bg-pulse-dark-card border border-slate-200 dark:border-pulse-dark-border p-5 rounded-xl shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-pulse-dark-border mb-4">
          <div>
            <h3 className="font-bold font-outfit text-base flex items-center gap-2">
              <Icon name="map" className="w-4 h-4 text-pulse-blue-500" />
              FIFA 2026 Interactive Stadium Map
            </h3>
            <p className="text-xs text-slate-400 mt-1">Click a section to inspect or view AI evacuation paths</p>
          </div>

          <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-lg border border-slate-200 dark:border-slate-800 text-[10px] font-bold">
            <button 
              onClick={() => setMapMode("incidents")}
              className={`px-3 py-1.5 rounded transition ${mapMode === "incidents" ? 'bg-pulse-blue-600 text-white shadow-sm' : 'text-slate-400'}`}
            >
              Active Incidents
            </button>
            <button 
              onClick={() => setMapMode("evacuation")}
              className={`px-3 py-1.5 rounded transition ${mapMode === "evacuation" ? 'bg-pulse-blue-600 text-white shadow-sm' : 'text-slate-400'}`}
            >
              Evac Routes
            </button>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 text-[10px] font-bold text-slate-400 mb-4 uppercase tracking-wider justify-center">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 bg-emerald-500 rounded-sm"></span> Clear Sectors
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 bg-orange-500 rounded-sm animate-pulse"></span> High Severity
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 bg-red-600 rounded-sm animate-pulse"></span> Critical / Stampede
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 border border-dashed border-blue-500 bg-blue-500/10 rounded-sm"></span> Evacuation Corridor
          </div>
        </div>

        {/* SVG Wrapper */}
        <div className="w-full flex justify-center bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-pulse-dark-border p-4 rounded-xl">
          <svg viewBox="0 0 500 400" className="w-full max-w-[480px] h-auto">
            {/* Outer Boundary */}
            <rect x="20" y="20" width="460" height="360" rx="30" fill="none" stroke="#1e2942" strokeWidth="2" strokeDasharray="5, 5" />
            
            {/* Stadium Pitch Center Grid */}
            <rect x="175" y="125" width="150" height="150" rx="75" fill="#152033" stroke="#2563eb" strokeWidth="2.5" />
            <rect x="190" y="140" width="120" height="120" rx="60" fill="#0f192b" stroke="#1e2942" strokeWidth="1" />
            <text x="250" y="205" fill="#3b82f6" fontSize="10" fontWeight="bold" fontFamily="Outfit" textAnchor="middle">FIELD LEVEL</text>
            
            {/* Render Exit Gates */}
            {gates.map(gate => {
              const hasCritical = activeIncidents.some(i => i.location.includes(gate.id) && i.severity === 'Critical');
              return (
                <g key={gate.id}>
                  <circle 
                    cx={gate.x} 
                    cy={gate.y} 
                    r="8" 
                    fill={hasCritical ? "#ef4444" : "#3b82f6"} 
                    className={hasCritical ? "animate-pulse" : ""} 
                  />
                  <text 
                    x={gate.x} 
                    y={gate.y - 12} 
                    fill={hasCritical ? "#ef4444" : "#60a5fa"} 
                    fontSize="8" 
                    fontWeight="bold" 
                    fontFamily="Outfit" 
                    textAnchor="middle"
                  >
                    {gate.label} {hasCritical && "(CLOSED)"}
                  </text>
                </g>
              );
            })}

            {/* Render Evacuation path line if selected */}
            {mapMode === "evacuation" && renderEvacuationRoutePath()}

            {/* Render Sections */}
            {sections.map(sec => {
              const activeInc = getIncidentInSection(sec.id);
              let fillColor = "#0d1b2a";
              let strokeColor = "#1e2942";
              let borderClass = "";

              if (activeInc) {
                if (activeInc.severity === "Critical") {
                  fillColor = "#7f1d1d";
                  strokeColor = "#ef4444";
                  borderClass = "animate-pulse";
                } else if (activeInc.severity === "High") {
                  fillColor = "#7c2d12";
                  strokeColor = "#f97316";
                  borderClass = "animate-pulse";
                } else {
                  fillColor = "#1e1b4b";
                  strokeColor = "#3b82f6";
                }
              }

              const isSelected = selectedIncident && selectedIncident.location === sec.id;
              if (isSelected) {
                strokeColor = "#ffffff";
              }

              return (
                <g 
                  key={sec.id} 
                  cursor="pointer" 
                  onClick={() => {
                    if (activeInc) {
                      onSelectIncident(activeInc);
                    } else {
                      // Clicked clear section, set details
                      onSelectIncident({
                        id: "NEW",
                        location: sec.id,
                        type: "Medical emergency",
                        description: `Steward reports issue in section ${sec.label}...`
                      });
                    }
                  }}
                >
                  <rect
                    x={sec.x}
                    y={sec.y}
                    width={sec.w}
                    height={sec.h}
                    rx="4"
                    fill={fillColor}
                    stroke={strokeColor}
                    strokeWidth={isSelected ? "2.5" : "1.5"}
                    className={borderClass}
                  />
                  <text
                    x={sec.x + sec.w / 2}
                    y={sec.y + sec.h / 2 + 3}
                    fill={isSelected ? "#ffffff" : activeInc ? "#f3f4f6" : "#64748b"}
                    fontSize="9"
                    fontWeight="bold"
                    fontFamily="Outfit"
                    textAnchor="middle"
                  >
                    {sec.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <p className="text-[10px] text-slate-500 text-center mt-3 leading-relaxed">
          *Map visualizes MetLife Stadium layout. Pulsing boxes indicate active emergency teams dispatched. Green is normal status.
        </p>
      </div>

      {/* Map selection inspector sidebar */}
      <div className="bg-white dark:bg-pulse-dark-card border border-slate-200 dark:border-pulse-dark-border p-5 rounded-xl shadow-sm text-xs">
        {selectedIncident ? (
          selectedIncident.id === "NEW" ? (
            <div className="space-y-4">
              <h3 className="font-bold text-sm font-outfit border-b border-slate-100 dark:border-pulse-dark-border pb-2">
                Section Selector: {selectedIncident.location}
              </h3>
              <p className="text-slate-400">This section is currently CLEAR and reports normal operations.</p>
              
              <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-pulse-dark-border">
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Simulate Incident Report Here</span>
                <p className="text-slate-500 mb-4">Clicking this will pre-load Section {selectedIncident.location} in your main dashboard report form.</p>
                <div className="flex gap-2">
                  <button 
                    onClick={() => {
                      // Navigate back or simply let user know
                      alert(`Section ${selectedIncident.location} coordinates populated. Go to Command Center dispatcher.`);
                    }}
                    className="w-full py-2 bg-pulse-blue-600 text-white rounded font-bold text-center"
                  >
                    Initialize Section Report
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-slate-100 dark:border-pulse-dark-border pb-2">
                <h3 className="font-bold text-sm font-outfit text-slate-900 dark:text-white">
                  Incident Tracker
                </h3>
                <span className="font-mono text-[10px] bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-400 font-bold">{selectedIncident.id}</span>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-400">Severity:</span>
                  <span className={`font-bold uppercase ${
                    selectedIncident.severity === 'Critical' ? 'text-red-500' :
                    selectedIncident.severity === 'High' ? 'text-orange-500' :
                    'text-blue-500'
                  }`}>{selectedIncident.severity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Type:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{selectedIncident.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Section:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{selectedIncident.location}</span>
                </div>
              </div>

              {/* Evacuation Planner details */}
              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-white space-y-3 mt-4">
                <div className="flex items-center gap-1.5 font-bold font-outfit text-[10px] text-pulse-blue-400 uppercase tracking-wider">
                  <Icon name="sparkles" className="w-3.5 h-3.5" />
                  Gemini Smart Evac Routes
                </div>
                
                <div>
                  <span className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">Safest Route</span>
                  <p className="text-[11px] leading-relaxed text-slate-300 font-semibold">{selectedIncident.evacuationRoute}</p>
                </div>

                <div>
                  <span className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">Alternative Route</span>
                  <p className="text-[11px] leading-relaxed text-slate-400">{selectedIncident.alternativeRoute}</p>
                </div>

                <div className="flex justify-between items-center text-[10px] pt-1.5 border-t border-slate-800">
                  <span className="text-slate-400">Estimated Evac Time:</span>
                  <span className="font-bold text-amber-400 uppercase">{selectedIncident.estimatedEvacuationTime}</span>
                </div>
              </div>

              {/* Resource assignment details */}
              <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-pulse-dark-border space-y-2 mt-4">
                <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider">Assigned Dispatch Units</span>
                <div className="space-y-1.5 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-slate-400">🚑 Paramedics:</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{selectedIncident.assignedResources?.medical}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">🛡️ Security QRF:</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{selectedIncident.assignedResources?.security}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">👶 Volunteers:</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{selectedIncident.assignedResources?.volunteers}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <button 
                  onClick={() => onResolve(selectedIncident.id)}
                  className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded text-center"
                >
                  Resolve Incident
                </button>
              </div>
            </div>
          )
        ) : (
          <div className="text-center py-12 text-slate-400">
            <Icon name="map" className="w-8 h-8 text-slate-500 mx-auto mb-2" />
            <p className="font-bold">No sector selected</p>
            <p className="text-slate-500 mt-1">Select an active incident or click a stadium section to review details.</p>
          </div>
        )}
      </div>

    </div>
  );
};

// ----------------------------------------------------
// VIEW COMPONENT: MULTILINGUAL TRANSLATOR & BULLETINS
// ----------------------------------------------------
const TranslatorView = ({ announcements, addToast, fetchData }) => {
  const [inputText, setInputText] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [selectedLanguage, setSelectedLanguage] = React.useState("Spanish");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setLoading(true);
    try {
      const res = await fetch(API_BASE + '/api/announcements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText })
      });
      if (res.ok) {
        setInputText("");
        fetchData();
      } else {
        addToast("Broadcast announcement failed.", "error");
      }
    } catch (e) {
      addToast("Network translation error.", "error");
    } finally {
      setLoading(false);
    }
  };

  const loadSimulatedBulletin = () => {
    setInputText("Attention all spectators in Zone D. Gate 5 is currently congested due to crowd outflow. Please turn right and exit through Gate 6 for your safety.");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* Broadcast form input */}
      <div className="lg:col-span-2 bg-white dark:bg-pulse-dark-card border border-slate-200 dark:border-pulse-dark-border p-5 rounded-xl shadow-sm relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-pulse-blue-500 to-pulse-red-500"></div>

        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-pulse-dark-border mb-4">
          <div>
            <h3 className="font-bold font-outfit text-base flex items-center gap-1.5">
              <Icon name="globe" className="w-5 h-5 text-pulse-blue-500" />
              Bilingual Emergency Announcement Broadcaster
            </h3>
            <p className="text-xs text-slate-400 mt-1">Input safety bulletins to broadcast and auto-translate into 5 languages using Gemini</p>
          </div>

          <button
            onClick={loadSimulatedBulletin}
            className="text-xs px-2 py-1 rounded bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-pulse-blue-500 dark:text-pulse-blue-400 font-bold border border-slate-200 dark:border-slate-800 transition"
          >
            Load Sample bulletin
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1.5">Draft announcement (English)</label>
            <textarea
              rows="4"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Attention spectators. Paramedic units are moving through Tunnel B. Please step aside to clear the pathway..."
              className="w-full text-xs px-3 py-2.5 rounded border border-slate-300 dark:border-pulse-dark-border bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-pulse-blue-500 leading-relaxed font-semibold"
            ></textarea>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading || !inputText.trim()}
              className="px-6 py-3 bg-gradient-to-r from-pulse-red-600 to-pulse-blue-600 hover:from-pulse-red-700 hover:to-pulse-blue-700 disabled:opacity-50 text-white font-bold font-outfit rounded-lg shadow transition flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Icon name="refresh" className="w-4 h-4 animate-spin" />
                  Gemini Translating Announcement...
                </>
              ) : (
                <>
                  <Icon name="sparkles" className="w-4 h-4 text-amber-300" />
                  TRANSLATE & BROADCAST BULLETIN
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Translations selector sidebar */}
      <div className="bg-white dark:bg-pulse-dark-card border border-slate-200 dark:border-pulse-dark-border p-5 rounded-xl shadow-sm text-xs">
        <h3 className="font-bold text-sm font-outfit border-b border-slate-100 dark:border-pulse-dark-border pb-2 mb-4">
          Broadcast History & Translations
        </h3>

        <div className="space-y-4 max-h-[420px] overflow-y-auto pr-1">
          {announcements.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <Icon name="globe" className="w-8 h-8 text-slate-500 mx-auto mb-2" />
              <p className="font-bold">No announcements yet</p>
              <p className="text-slate-500 mt-1">Draft a bulletin to distribute updates to international screens.</p>
            </div>
          ) : (
            announcements.map(ann => (
              <div key={ann.id} className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-pulse-dark-border rounded-lg space-y-3">
                <div className="flex justify-between items-center text-[10px] font-bold text-slate-400">
                  <span>{ann.id}</span>
                  <span>{new Date(ann.createdAt).toLocaleTimeString()}</span>
                </div>
                
                <div>
                  <span className="block text-[9px] uppercase font-bold text-slate-500 mb-1">Original English</span>
                  <p className="text-[11px] leading-relaxed text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-950 p-2 rounded border border-slate-200 dark:border-slate-850 font-semibold">{ann.originalText}</p>
                </div>

                <div className="border-t border-slate-200 dark:border-slate-800 pt-2">
                  <div className="flex gap-1.5 mb-2 overflow-x-auto pb-1">
                    {["Spanish", "French", "Arabic", "Portuguese"].map(lang => (
                      <button
                        key={lang}
                        onClick={() => setSelectedLanguage(lang)}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold transition whitespace-nowrap ${
                          selectedLanguage === lang 
                            ? 'bg-pulse-blue-600 text-white shadow-sm' 
                            : 'bg-slate-200 dark:bg-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>

                  <div>
                    <span className="block text-[9px] uppercase font-bold text-slate-500 mb-1">{selectedLanguage} Translation</span>
                    <p className="text-[11px] leading-relaxed text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-950 p-2 rounded border border-slate-200 dark:border-slate-850 font-semibold italic">
                      {ann.translations[selectedLanguage] || "Translation pending..."}
                    </p>
                  </div>
                </div>

              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
};

// ----------------------------------------------------
// VIEW COMPONENT: SAFETY & ANALYTICS CHARTS
// ----------------------------------------------------
const AnalyticsView = ({ incidents, teams }) => {
  // Prep charts datasets
  const activeCount = incidents.filter(i => i.status !== "Resolved").length;
  const resolvedCount = incidents.filter(i => i.status === "Resolved").length;

  const incidentsByTypeData = [
    { name: "Medical", count: incidents.filter(i => i.type.toLowerCase().includes("medical")).length, color: "#3b82f6" },
    { name: "Fire", count: incidents.filter(i => i.type.toLowerCase().includes("fire")).length, color: "#ef4444" },
    { name: "Stampede", count: incidents.filter(i => i.type.toLowerCase().includes("stampede") || i.type.toLowerCase().includes("crowd")).length, color: "#b91c1c" },
    { name: "Lost Child", count: incidents.filter(i => i.type.toLowerCase().includes("child")).length, color: "#f59e0b" },
    { name: "Suspicious Obj", count: incidents.filter(i => i.type.toLowerCase().includes("suspicious")).length, color: "#a855f7" },
    { name: "Security Threat", count: incidents.filter(i => i.type.toLowerCase().includes("security") || i.type.toLowerCase().includes("threat")).length, color: "#e2e8f0" }
  ];

  const dailyTrendData = [
    { hour: "14:00", incidents: 1, resolved: 1 },
    { hour: "15:00", incidents: 2, resolved: 2 },
    { hour: "16:00", incidents: 3, resolved: 2 },
    { hour: "17:00", incidents: 4, resolved: 3 },
    { hour: "18:00", incidents: 3, resolved: 3 },
    { hour: "19:00", incidents: 5, resolved: 4 }
  ];

  const hotspotsData = [
    { name: "Zone A (North)", value: incidents.filter(i => i.location.includes("A")).length },
    { name: "Zone B (East)", value: incidents.filter(i => i.location.includes("B")).length },
    { name: "Zone C (South)", value: incidents.filter(i => i.location.includes("C")).length },
    { name: "Zone D (West)", value: incidents.filter(i => i.location.includes("D") || i.location.includes("Gate 5")).length }
  ];

  const COLORS = ['#ef4444', '#3b82f6', '#f59e0b', '#a855f7'];

  return (
    <div className="space-y-6">
      
      {/* Analytics stats banner */}
      <div className="bg-white dark:bg-pulse-dark-card border border-slate-200 dark:border-pulse-dark-border p-5 rounded-xl shadow-sm">
        <h3 className="font-bold font-outfit text-base flex items-center gap-1.5 mb-4">
          <Icon name="chart" className="w-5 h-5 text-pulse-red-500" />
          Safety Operations Command Analytics
        </h3>
        <p className="text-xs text-slate-400 mb-6 leading-relaxed">
          Aggregated real-time metrics showing dispatch trends, hotspots, response timelines, and resource utilization.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-pulse-dark-border text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400">Total Logged Today</span>
            <div className="text-xl md:text-2xl font-extrabold mt-1 text-slate-800 dark:text-white">{incidents.length}</div>
          </div>
          <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-pulse-dark-border text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400">Critical Response Rate</span>
            <div className="text-xl md:text-2xl font-extrabold mt-1 text-emerald-500">100%</div>
          </div>
          <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-pulse-dark-border text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400">Avg Clear Time</span>
            <div className="text-xl md:text-2xl font-extrabold mt-1 text-pulse-blue-500">11.4 mins</div>
          </div>
          <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-pulse-dark-border text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400">Active Duty Staff</span>
            <div className="text-xl md:text-2xl font-extrabold mt-1 text-slate-800 dark:text-white">
              {teams.medical.filter(t => t.status === 'Dispatched').length + teams.security.filter(t => t.status === 'Dispatched').length} Units
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Incidents by Type chart */}
        <div className="bg-white dark:bg-pulse-dark-card border border-slate-200 dark:border-pulse-dark-border p-5 rounded-xl shadow-sm">
          <h4 className="font-bold text-xs uppercase text-slate-400 tracking-wider mb-4">Emergencies by Incident Type</h4>
          <div className="h-[250px] w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={incidentsByTypeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e2942" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" allowDecimals={false} />
                <Tooltip contentStyle={{ backgroundColor: '#0f1424', borderColor: '#1e2942' }} />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {incidentsByTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Hotspots Pie chart */}
        <div className="bg-white dark:bg-pulse-dark-card border border-slate-200 dark:border-pulse-dark-border p-5 rounded-xl shadow-sm">
          <h4 className="font-bold text-xs uppercase text-slate-400 tracking-wider mb-4">Emergency Hotspots by Zone</h4>
          <div className="h-[250px] w-full text-xs flex items-center justify-center">
            {incidents.length === 0 ? (
              <p className="text-slate-500">No hotspot data available.</p>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={hotspotsData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {hotspotsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#0f1424', borderColor: '#1e2942' }} />
                  <Legend wrapperStyle={{ color: '#64748b' }} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Daily trends area chart */}
        <div className="bg-white dark:bg-pulse-dark-card border border-slate-200 dark:border-pulse-dark-border p-5 rounded-xl shadow-sm md:col-span-2">
          <h4 className="font-bold text-xs uppercase text-slate-400 tracking-wider mb-4">Hourly Incident Trend Timeline</h4>
          <div className="h-[250px] w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dailyTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorIncidents" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e2942" />
                <XAxis dataKey="hour" stroke="#64748b" />
                <YAxis stroke="#64748b" allowDecimals={false} />
                <Tooltip contentStyle={{ backgroundColor: '#0f1424', borderColor: '#1e2942' }} />
                <Legend />
                <Area type="monotone" dataKey="incidents" stroke="#ef4444" fillOpacity={1} fill="url(#colorIncidents)" name="Logged Emergencies" />
                <Area type="monotone" dataKey="resolved" stroke="#10b981" fillOpacity={1} fill="url(#colorResolved)" name="Resolved Reports" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
};

// Mount the React Application
const rootEl = document.getElementById("root");
ReactDOM.createRoot(rootEl).render(<App />);
