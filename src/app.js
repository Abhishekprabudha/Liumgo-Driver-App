
const FALLBACK_DATA = {
  "driver": {
    "id": "DRV-2084",
    "name": "Rakesh Kumar",
    "hub": "Delhi NCR - Saket Micro Hub",
    "role": "EV 3W Driver Partner",
    "vehicle": "Euler HiLoad EV DL-07-LG-2084",
    "phone": "+91 88825 40885",
    "score": 96,
    "status": "Ready for dispatch"
  },
  "shift": {
    "date": "Today",
    "window": "08:00 - 18:00",
    "checkIn": "07:52",
    "routeCode": "LG-DL-SKT-042",
    "routeName": "Saket → Malviya Nagar → Green Park",
    "battery": 84,
    "rangeKm": 78,
    "codDue": 1240,
    "incentive": 480,
    "sla": 98.4,
    "dropsCompleted": 8,
    "dropsTotal": 16
  },
  "stops": [
    {
      "id": "STP-01",
      "sequence": 1,
      "customer": "Blinkit Dark Store",
      "type": "Pickup",
      "area": "Saket A2 Block",
      "eta": "08:15",
      "sla": "On time",
      "status": "Completed",
      "payment": "Prepaid",
      "packages": 12,
      "distanceKm": 0.8,
      "notes": "Warehouse security gate 2"
    },
    {
      "id": "STP-02",
      "sequence": 2,
      "customer": "BigBasket B2B",
      "type": "Delivery",
      "area": "Malviya Nagar",
      "eta": "09:05",
      "sla": "On time",
      "status": "Completed",
      "payment": "COD ₹620",
      "packages": 4,
      "distanceKm": 3.4,
      "notes": "Collect receiving stamp"
    },
    {
      "id": "STP-03",
      "sequence": 3,
      "customer": "Tata 1mg Pharmacy",
      "type": "Delivery",
      "area": "Hauz Khas",
      "eta": "09:55",
      "sla": "At risk",
      "status": "In progress",
      "payment": "Prepaid",
      "packages": 2,
      "distanceKm": 2.7,
      "notes": "Temperature-sensitive pouch"
    },
    {
      "id": "STP-04",
      "sequence": 4,
      "customer": "Zomato Hyperpure",
      "type": "Pickup",
      "area": "Green Park",
      "eta": "10:40",
      "sla": "On time",
      "status": "Pending",
      "payment": "Prepaid",
      "packages": 7,
      "distanceKm": 3.2,
      "notes": "Scan all crates before departure"
    },
    {
      "id": "STP-05",
      "sequence": 5,
      "customer": "Amazon Local",
      "type": "Delivery",
      "area": "Safdarjung Enclave",
      "eta": "11:30",
      "sla": "On time",
      "status": "Pending",
      "payment": "COD ₹620",
      "packages": 5,
      "distanceKm": 2.2,
      "notes": "OTP mandatory"
    },
    {
      "id": "STP-06",
      "sequence": 6,
      "customer": "Swiggy Instamart",
      "type": "Delivery",
      "area": "Lado Sarai",
      "eta": "12:15",
      "sla": "On time",
      "status": "Pending",
      "payment": "Prepaid",
      "packages": 9,
      "distanceKm": 4.1,
      "notes": "Drop at receiving bay"
    }
  ],
  "documents": [
    {
      "id": "DOC-1",
      "name": "Driving License",
      "number": "DL-042026-8192",
      "validUntil": "2028-04-30",
      "status": "Verified"
    },
    {
      "id": "DOC-2",
      "name": "EV Safety Training",
      "number": "LG-EV-TRAIN-2084",
      "validUntil": "2026-12-31",
      "status": "Verified"
    },
    {
      "id": "DOC-3",
      "name": "Vehicle RC",
      "number": "DL07-LG-2084",
      "validUntil": "2029-01-10",
      "status": "Verified"
    },
    {
      "id": "DOC-4",
      "name": "Insurance",
      "number": "POL-LG-55421",
      "validUntil": "2026-08-18",
      "status": "Renewal due"
    }
  ],
  "alerts": [
    {
      "id": "ALT-1",
      "title": "Battery-aware reroute",
      "body": "Charging queue at Green Park is high. Control tower recommends completing STP-03 before swap.",
      "priority": "High",
      "time": "6m",
      "read": false
    },
    {
      "id": "ALT-2",
      "title": "COD settlement reminder",
      "body": "₹1,240 due for settlement before shift closure.",
      "priority": "Medium",
      "time": "32m",
      "read": false
    },
    {
      "id": "ALT-3",
      "title": "SLA risk on pharmacy drop",
      "body": "Tata 1mg consignment should be delivered before 10:10 due to temperature handling SOP.",
      "priority": "High",
      "time": "1h",
      "read": false
    },
    {
      "id": "ALT-4",
      "title": "Safety tip",
      "body": "Wear reflective jacket during evening loading and unloading at micro hubs.",
      "priority": "Info",
      "time": "2h",
      "read": true
    }
  ],
  "earnings": [
    {
      "label": "Base shift",
      "value": 950
    },
    {
      "label": "On-time incentive",
      "value": 300
    },
    {
      "label": "EV green bonus",
      "value": 180
    },
    {
      "label": "COD settlement pending",
      "value": -1240
    }
  ],
  "supportTopics": [
    "Vehicle breakdown",
    "Battery swap",
    "Customer not reachable",
    "POD rejected",
    "COD mismatch",
    "Leave request",
    "Hub escalation"
  ]
};
const STORAGE_KEY = 'LIUMGO_DRIVER_STATE_V1';
const AUTH_KEY = 'LIUMGO_DRIVER_AUTH';
const app = document.getElementById('app');

const tabs = [
  { key: 'home', label: 'Home', icon: '⌂' },
  { key: 'route', label: 'Route', icon: '⌖' },
  { key: 'actions', label: 'Actions', icon: '✓' },
  { key: 'wallet', label: 'Wallet', icon: '▣' },
  { key: 'alerts', label: 'Alerts', icon: '!' },
  { key: 'support', label: 'Support', icon: '?' }
];

let deferredInstallPrompt = null;
let state = {
  active: 'home',
  authed: sessionStorage.getItem(AUTH_KEY) === 'true',
  data: structuredCloneSafe(FALLBACK_DATA),
  activity: [],
  messages: [
    { from: 'bot', text: 'Namaste Rakesh. I can help with route exceptions, battery swap, POD, COD settlement and hub escalations.' }
  ],
  toast: 'Liumgo Driver PWA ready',
  online: navigator.onLine
};

function structuredCloneSafe(value) {
  try { return structuredClone(value); } catch { return JSON.parse(JSON.stringify(value)); }
}

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function money(value) {
  const sign = value < 0 ? '-' : '';
  return `${sign}₹${Math.abs(Number(value || 0)).toLocaleString('en-IN')}`;
}

function nowLabel() {
  return new Date().toLocaleString('en-IN', { month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' });
}

function phoneTime() {
  return new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
}

function progressPercent() {
  const shift = state.data.shift;
  return Math.round((shift.dropsCompleted / shift.dropsTotal) * 100);
}

function loadPersisted() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    if (saved.data) state.data = { ...state.data, ...saved.data };
    if (Array.isArray(saved.activity)) state.activity = saved.activity;
    if (Array.isArray(saved.messages)) state.messages = saved.messages;
  } catch (error) {
    console.warn('Could not load local state', error);
  }
}

function persist() {
  const data = {
    shift: state.data.shift,
    stops: state.data.stops,
    documents: state.data.documents,
    alerts: state.data.alerts,
    earnings: state.data.earnings
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ data, activity: state.activity, messages: state.messages }));
}

async function hydrateDemoData() {
  try {
    const response = await fetch('./data/demo.json', { cache: 'no-cache' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const fresh = await response.json();
    state.data = { ...structuredCloneSafe(fresh), ...state.data, driver: fresh.driver };
    loadPersisted();
    render();
  } catch {
    loadPersisted();
    render();
  }
}

function toast(message) {
  state.toast = message;
  render();
  window.clearTimeout(toast.timer);
  toast.timer = window.setTimeout(() => {
    state.toast = '';
    render();
  }, 3200);
}

function record(action, detail, status = 'Queued locally') {
  state.activity = [
    { id: Date.now(), time: nowLabel(), action, detail, status },
    ...state.activity
  ].slice(0, 18);
  persist();
  toast(status);
}

function statusClass(status = '') {
  const key = status.toLowerCase();
  if (key.includes('complete') || key.includes('verified') || key.includes('synced')) return 'good';
  if (key.includes('risk') || key.includes('due') || key.includes('progress') || key.includes('pending')) return 'warn';
  return 'neutral';
}

function routeStatusCounts() {
  return state.data.stops.reduce((acc, stop) => {
    const key = stop.status.toLowerCase().replaceAll(' ', '-');
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
}

function unreadAlerts() {
  return state.data.alerts.filter(alert => !alert.read).length;
}

function loginScreen() {
  return `
    <div class="phoneShell loginShell">
      <div class="statusBar"><span>${phoneTime()}</span><b>Liumgo Driver</b><span>Secure</span></div>
      <main class="loginMain">
        <section class="loginHero">
          <div class="brandPlate"><img src="assets/liumgo-logo.png" alt="Liumgo logo" /></div>
          <p class="eyebrow">EV-first B2B logistics network</p>
          <h1>Driver Self-Service</h1>
          <p>Start shifts, manage route stops, upload POD, settle COD, raise incidents and access your driver wallet from one installable mobile PWA.</p>
        </section>
        <form class="loginCard" data-form="login">
          <span class="badge">Device binding demo</span>
          <label for="userId">User ID</label>
          <input id="userId" name="userId" placeholder="LIUMGO" autocomplete="username" required />
          <label for="password">Password</label>
          <input id="password" name="password" placeholder="LIUMGO123" type="password" autocomplete="current-password" required />
          <button class="primaryAction" type="submit">Sign in to Driver PWA <span>›</span></button>
          <div class="demoCreds">
            <span>Demo user: <b>LIUMGO</b></span>
            <span>Password: <b>LIUMGO123</b></span>
          </div>
        </form>
      </main>
    </div>
  `;
}

function shell() {
  const activeTab = tabs.find(tab => tab.key === state.active);
  return `
    <div class="phoneShell">
      <div class="statusBar"><span>${phoneTime()}</span><b>${activeTab ? activeTab.label : 'Settings'}</b><span>${state.online ? 'Online' : 'Offline'}</span></div>
      <header class="appHeader">
        <div class="headerIdentity">
          <img src="assets/liumgo-logo.png" alt="Liumgo" />
          <div>
            <small>${escapeHtml(state.data.driver.id)} · ${escapeHtml(state.data.driver.hub.split(' - ')[0])}</small>
            <b>${escapeHtml(state.data.driver.name)}</b>
          </div>
        </div>
        <button class="iconButton" data-action="open_settings" aria-label="Open settings">⚙</button>
      </header>
      <main class="screen">${screen()}</main>
      <nav class="bottomNav" aria-label="Primary navigation">
        ${tabs.map(tab => `<button class="${state.active === tab.key ? 'active' : ''}" data-nav="${tab.key}"><span>${tab.icon}</span><small>${tab.label}</small>${tab.key === 'alerts' && unreadAlerts() ? `<i>${unreadAlerts()}</i>` : ''}</button>`).join('')}
      </nav>
      ${state.toast ? `<div class="toast">${escapeHtml(state.toast)}</div>` : ''}
    </div>
  `;
}

function screen() {
  switch (state.active) {
    case 'route': return routeScreen();
    case 'actions': return actionsScreen();
    case 'wallet': return walletScreen();
    case 'alerts': return alertsScreen();
    case 'support': return supportScreen();
    case 'settings': return settingsScreen();
    default: return homeScreen();
  }
}

function card(title, body, className = '') {
  return `<section class="card ${className}"><h2>${title}</h2>${body}</section>`;
}

function homeScreen() {
  const { driver, shift, alerts } = state.data;
  const counts = routeStatusCounts();
  const topAlert = alerts.find(alert => !alert.read) || alerts[0];
  return `
    <section class="heroCard">
      <div class="heroOverlay"></div>
      <div class="heroContent">
        <p class="eyebrow">M01 Driver home</p>
        <h1>Hi, ${escapeHtml(driver.name.split(' ')[0])}</h1>
        <p>${escapeHtml(driver.role)} · ${escapeHtml(driver.vehicle)}</p>
        <div class="heroStats">
          <span><b>${shift.battery}%</b> Battery</span>
          <span><b>${progressPercent()}%</b> Route</span>
          <span><b>${shift.sla}%</b> SLA</span>
        </div>
      </div>
    </section>

    <section class="routePulse card">
      <div>
        <span class="badge">Next dispatch</span>
        <h2>${escapeHtml(shift.routeCode)}</h2>
        <p>${escapeHtml(shift.routeName)}</p>
      </div>
      <div class="progressRing" style="--p:${progressPercent()}%"><b>${shift.dropsCompleted}/${shift.dropsTotal}</b><small>Drops</small></div>
    </section>

    <div class="kpiGrid">
      <article><span>COD due</span><b>${money(shift.codDue)}</b><small>Settle before closure</small></article>
      <article><span>Incentive</span><b>${money(shift.incentive)}</b><small>Projected today</small></article>
      <article><span>Range</span><b>${shift.rangeKm} km</b><small>Battery-aware plan</small></article>
      <article><span>Pending</span><b>${counts.pending || 0}</b><small>Stops remaining</small></article>
    </div>

    <div class="quickGrid">
      <button class="quickAction" data-action="check_in"><b>Check in</b><span>Mark hub arrival</span></button>
      <button class="quickAction" data-action="start_route"><b>Start route</b><span>Begin navigation</span></button>
      <button class="quickAction" data-nav="actions"><b>Upload POD</b><span>Photo / OTP proof</span></button>
      <button class="quickAction" data-nav="support"><b>Ask support</b><span>Chat with control tower</span></button>
    </div>

    <section class="card alertPreview ${topAlert?.priority === 'High' ? 'hot' : ''}">
      <span class="badge">Control tower alert</span>
      <h2>${escapeHtml(topAlert?.title || 'No active alerts')}</h2>
      <p>${escapeHtml(topAlert?.body || 'You are clear to continue the current route.')}</p>
      <button class="ghostAction" data-nav="alerts">Open alerts</button>
    </section>

    ${activityFeed(4)}
  `;
}

function routeScreen() {
  const { shift, stops } = state.data;
  return `
    <div class="titleBlock">
      <span class="badge">M02 Route & shift</span>
      <h1>${escapeHtml(shift.routeName)}</h1>
      <p>${escapeHtml(shift.window)} · ${shift.dropsCompleted}/${shift.dropsTotal} drops completed</p>
    </div>
    <section class="mapCard card">
      <img src="assets/delhi-map.jpg" alt="Delhi route map" />
      <div class="mapFloat"><b>${shift.battery}% battery</b><span>${shift.rangeKm} km range · swap if below 28%</span></div>
    </section>
    <div class="segmentStrip">
      <span class="good">Completed ${stops.filter(s => s.status === 'Completed').length}</span>
      <span class="warn">Active ${stops.filter(s => s.status === 'In progress').length}</span>
      <span>Pending ${stops.filter(s => s.status === 'Pending').length}</span>
    </div>
    <section class="stopList">
      ${stops.map(stopCard).join('')}
    </section>
  `;
}

function stopCard(stop) {
  const canComplete = stop.status !== 'Completed';
  return `
    <article class="card stopCard ${statusClass(stop.status)}">
      <div class="stopTop">
        <span class="stopSequence">${stop.sequence}</span>
        <div>
          <b>${escapeHtml(stop.customer)}</b>
          <p>${escapeHtml(stop.type)} · ${escapeHtml(stop.area)} · ETA ${escapeHtml(stop.eta)}</p>
        </div>
        <span class="statusPill ${statusClass(stop.sla)}">${escapeHtml(stop.sla)}</span>
      </div>
      <div class="stopMeta">
        <span>${stop.packages} pkgs</span><span>${stop.distanceKm} km</span><span>${escapeHtml(stop.payment)}</span>
      </div>
      <small>${escapeHtml(stop.notes)}</small>
      <div class="stopActions">
        ${canComplete ? `<button class="miniAction" data-action="complete_stop" data-id="${escapeHtml(stop.id)}">Complete + POD</button>` : `<button class="miniAction done" disabled>Delivered</button>`}
        <button class="miniAction secondary" data-action="reschedule_stop" data-id="${escapeHtml(stop.id)}">Reschedule</button>
      </div>
    </article>
  `;
}

function actionsScreen() {
  const activeStops = state.data.stops.filter(stop => stop.status !== 'Completed');
  return `
    <div class="titleBlock">
      <span class="badge">M03 Action centre</span>
      <h1>Driver tasks that sync locally</h1>
      <p>All actions are stored on-device and visible in the activity trail for supervisor review.</p>
    </div>

    <div class="actionGrid">
      <button class="actionTile" data-action="check_in"><b>Shift check-in</b><span>GPS + hub timestamp</span></button>
      <button class="actionTile" data-action="start_break"><b>Start break</b><span>10-minute compliance break</span></button>
      <button class="actionTile" data-action="battery_swap"><b>Battery swap</b><span>Request charging slot</span></button>
      <button class="actionTile urgent" data-action="sos"><b>SOS / incident</b><span>Immediate escalation</span></button>
    </div>

    ${card('M04 Upload proof of delivery', `
      <form class="stackForm" data-form="pod">
        <label>Stop</label>
        <select name="stopId">${activeStops.map(stop => `<option value="${escapeHtml(stop.id)}">${stop.sequence}. ${escapeHtml(stop.customer)} · ${escapeHtml(stop.area)}</option>`).join('')}</select>
        <label>Proof type</label>
        <select name="proofType"><option>OTP verified</option><option>Photo POD</option><option>Customer signature</option><option>Receiving stamp</option></select>
        <label>Reference / OTP</label>
        <input name="reference" placeholder="e.g. OTP 438921 or POD photo note" />
        <label>Optional file</label>
        <input name="podFile" type="file" accept="image/*,.pdf" />
        <button class="primaryAction" type="submit">Submit POD</button>
      </form>
    `)}

    ${card('M05 Report exception', `
      <form class="stackForm" data-form="incident">
        <label>Exception type</label>
        <select name="type"><option>Customer not reachable</option><option>Vehicle breakdown</option><option>Traffic delay</option><option>Temperature risk</option><option>COD mismatch</option><option>Safety incident</option></select>
        <label>Details</label>
        <textarea name="detail" placeholder="Add location, order ID, customer note or vehicle issue"></textarea>
        <button class="dangerAction" type="submit">Raise control tower case</button>
      </form>
    `)}

    ${card('M06 Availability and leave', `
      <form class="stackForm" data-form="leave">
        <label>Request type</label>
        <select name="type"><option>Weekly off swap</option><option>Leave request</option><option>Half-day availability</option><option>Vehicle maintenance block</option></select>
        <label>Date</label>
        <input name="date" type="date" />
        <label>Comment</label>
        <input name="comment" placeholder="Reason for planner" />
        <button class="primaryAction" type="submit">Submit availability request</button>
      </form>
    `)}

    ${activityFeed(6)}
  `;
}

function walletScreen() {
  const { documents, earnings, shift } = state.data;
  const total = earnings.reduce((sum, item) => sum + item.value, 0);
  return `
    <div class="titleBlock">
      <span class="badge">M07 Wallet</span>
      <h1>Documents, earnings and COD</h1>
      <p>Driver compliance wallet modelled after the ACMS credential wallet pattern.</p>
    </div>

    <section class="card earningsCard">
      <span class="badge">Today projection</span>
      <h2>${money(total)}</h2>
      <div class="earningsList">${earnings.map(item => `<div><span>${escapeHtml(item.label)}</span><b>${money(item.value)}</b></div>`).join('')}</div>
      <button class="primaryAction" data-action="settle_cod">Settle COD ${money(shift.codDue)}</button>
    </section>

    <section class="docList">
      ${documents.map(doc => `
        <article class="card docCard ${statusClass(doc.status)}">
          <div>
            <b>${escapeHtml(doc.name)}</b>
            <p>${escapeHtml(doc.number)}</p>
            <small>Valid until ${escapeHtml(doc.validUntil)}</small>
          </div>
          <span class="statusPill ${statusClass(doc.status)}">${escapeHtml(doc.status)}</span>
        </article>
      `).join('')}
    </section>

    ${card('Upload document', `
      <form class="stackForm" data-form="document">
        <label>Document type</label>
        <select name="docType"><option>Driving License renewal</option><option>Insurance</option><option>Vehicle fitness</option><option>EV training certificate</option><option>Bank details</option></select>
        <label>Document file</label>
        <input name="docFile" type="file" accept="image/*,.pdf" />
        <button class="primaryAction" type="submit">Upload to wallet</button>
      </form>
    `)}
  `;
}

function alertsScreen() {
  return `
    <div class="titleBlock">
      <span class="badge">M08 Alerts inbox</span>
      <h1>${unreadAlerts()} unread control tower alerts</h1>
      <p>Route risk, COD reminders, battery guidance and customer instructions.</p>
    </div>
    <div class="alertActions">
      <button class="ghostAction" data-action="mark_all_alerts">Mark all read</button>
      <button class="ghostAction" data-action="simulate_alert">Simulate new alert</button>
    </div>
    <section class="alertList">
      ${state.data.alerts.map(alert => `
        <article class="card alertCard ${alert.read ? 'read' : ''} ${alert.priority === 'High' ? 'hot' : ''}">
          <div class="alertTitle"><span class="statusPill ${alert.priority === 'High' ? 'bad' : alert.priority === 'Medium' ? 'warn' : 'neutral'}">${escapeHtml(alert.priority)}</span><small>${escapeHtml(alert.time)}</small></div>
          <h2>${escapeHtml(alert.title)}</h2>
          <p>${escapeHtml(alert.body)}</p>
          ${!alert.read ? `<button class="miniAction" data-action="read_alert" data-id="${escapeHtml(alert.id)}">Acknowledge</button>` : `<span class="readMark">Acknowledged</span>`}
        </article>
      `).join('')}
    </section>
  `;
}

function supportScreen() {
  return `
    <div class="titleBlock">
      <span class="badge">M09 Support</span>
      <h1>Driver help and escalation</h1>
      <p>Prototype control tower assistant for operations, safety and settlement queries.</p>
    </div>
    <section class="card chatCard">
      <div class="chatLog">${state.messages.map(msg => `<div class="bubble ${msg.from}">${escapeHtml(msg.text)}</div>`).join('')}</div>
      <div class="topicChips">
        ${state.data.supportTopics.map(topic => `<button data-action="topic" data-topic="${escapeHtml(topic)}">${escapeHtml(topic)}</button>`).join('')}
      </div>
      <form class="chatForm" data-form="chat">
        <input name="message" placeholder="Ask control tower assistant..." autocomplete="off" />
        <button type="submit">Send</button>
      </form>
    </section>
    <div class="sopGrid">
      <article class="card"><b>Battery SOP</b><p>Swap below 28%, never accept fresh frozen pharmacy drop below 40% range confidence.</p></article>
      <article class="card"><b>POD SOP</b><p>OTP, photo or receiving stamp required. For B2B receiving bays, capture crate count and timestamp.</p></article>
      <article class="card"><b>Incident SOP</b><p>For injury, theft, breakdown or compliance issue, raise SOS and call hub within 2 minutes.</p></article>
    </div>
  `;
}

function settingsScreen() {
  const storageKb = Math.round((localStorage.getItem(STORAGE_KEY) || '').length / 1024);
  return `
    <div class="titleBlock">
      <span class="badge">M10 Settings & PWA</span>
      <h1>Install, reset and security</h1>
      <p>GitHub Pages-ready app shell with local-first demo storage and service worker caching.</p>
    </div>
    ${card('Install on phone', `
      <p class="muted">On Android/Chrome, tap Install. On iPhone/Safari, use Share → Add to Home Screen.</p>
      <button class="primaryAction" data-action="install_app">Install Liumgo Driver PWA</button>
    `, 'installCard')}
    <section class="card settingsList">
      <div><span>Mode</span><b>${state.online ? 'Online with offline cache' : 'Offline fallback active'}</b></div>
      <div><span>Storage</span><b>${storageKb} KB local demo data</b></div>
      <div><span>Service worker</span><b>${'serviceWorker' in navigator ? 'Supported' : 'Not supported'}</b></div>
      <div><span>GitHub Pages</span><b>Static relative paths enabled</b></div>
      <div><span>Demo credentials</span><b>LIUMGO / LIUMGO123</b></div>
    </section>
    <div class="settingsActions">
      <button class="ghostAction" data-action="export_data">Export activity JSON</button>
      <button class="dangerAction" data-action="reset_demo">Reset demo data</button>
      <button class="dangerAction subtle" data-action="logout">Sign out</button>
    </div>
  `;
}

function activityFeed(limit = 5) {
  if (!state.activity.length) {
    return `<section class="card activityFeed"><h2>Activity trail</h2><p class="muted">No local driver actions yet.</p></section>`;
  }
  return `
    <section class="card activityFeed">
      <h2>Activity trail</h2>
      ${state.activity.slice(0, limit).map(item => `
        <div class="activityRow">
          <b>${escapeHtml(item.action)}</b><span>${escapeHtml(item.status)}</span>
          <p>${escapeHtml(item.detail)}</p><small>${escapeHtml(item.time)}</small>
        </div>
      `).join('')}
    </section>
  `;
}

function render() {
  app.innerHTML = state.authed ? shell() : loginScreen();
}

function findStop(id) {
  return state.data.stops.find(stop => stop.id === id);
}

function nextPendingStop() {
  return state.data.stops.find(stop => stop.status !== 'Completed');
}

function completeStop(id, detailPrefix = 'Completed') {
  const stop = findStop(id);
  if (!stop) return;
  if (stop.status !== 'Completed') {
    stop.status = 'Completed';
    state.data.shift.dropsCompleted = Math.min(state.data.shift.dropsCompleted + 1, state.data.shift.dropsTotal);
    const next = state.data.stops.find(s => s.status === 'Pending');
    if (next) next.status = 'In progress';
    record('POD submitted', `${detailPrefix}: ${stop.customer} · ${stop.area}`, 'Saved locally · sync pending');
  }
}

function botReply(message) {
  const text = message.toLowerCase();
  if (text.includes('battery') || text.includes('swap')) return 'Battery guidance: continue current stop if above 35%; request a charging slot before Green Park if below 30%. I can also create a battery swap ticket.';
  if (text.includes('cod') || text.includes('cash')) return 'COD settlement is ₹1,240 today. Use Wallet → Settle COD after hub cash deposit; retain receipt until supervisor approval.';
  if (text.includes('pod') || text.includes('otp')) return 'POD accepted formats: OTP, customer signature, receiving stamp or photo proof. For B2B drops, capture package count and receiver name.';
  if (text.includes('customer') || text.includes('reachable')) return 'Try two calls and one WhatsApp message. If unreachable for 10 minutes, raise an exception and proceed as per control tower instruction.';
  if (text.includes('breakdown') || text.includes('incident') || text.includes('sos')) return 'Safety first. Move to a safe spot, switch hazard lights on, raise SOS, and call the hub manager. I logged a draft incident path for you.';
  return 'I checked the driver SOP pack. For this issue, raise a control tower case from Actions and attach stop/order details for faster resolution.';
}

app.addEventListener('click', event => {
  const nav = event.target.closest('[data-nav]');
  if (nav) {
    state.active = nav.dataset.nav;
    render();
    return;
  }

  const button = event.target.closest('[data-action]');
  if (!button) return;
  const action = button.dataset.action;
  const id = button.dataset.id;

  if (action === 'open_settings') {
    state.active = 'settings';
    render();
    return;
  }
  if (action === 'logout') {
    sessionStorage.removeItem(AUTH_KEY);
    state.authed = false;
    state.active = 'home';
    toast('Signed out securely');
    return;
  }
  if (action === 'check_in') {
    state.data.shift.checkIn = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    record('Shift check-in', `${state.data.driver.hub} · ${state.data.shift.checkIn}`, 'Check-in stored');
    return;
  }
  if (action === 'start_route') {
    const stop = nextPendingStop();
    if (stop) stop.status = 'In progress';
    record('Route started', `${state.data.shift.routeCode} · navigation opened`, 'Route active');
    return;
  }
  if (action === 'complete_stop') {
    completeStop(id);
    return;
  }
  if (action === 'reschedule_stop') {
    const stop = findStop(id);
    if (!stop) return;
    stop.sla = 'At risk';
    record('Reschedule requested', `${stop.customer} · ${stop.area}`, 'Control tower approval pending');
    return;
  }
  if (action === 'start_break') {
    record('Break started', '10-minute compliance break timer started', 'Break stored locally');
    return;
  }
  if (action === 'battery_swap') {
    state.data.shift.battery = Math.max(state.data.shift.battery - 4, 10);
    record('Battery swap requested', `Current battery ${state.data.shift.battery}% · preferred hub Green Park`, 'Swap slot requested');
    return;
  }
  if (action === 'sos') {
    state.data.alerts.unshift({ id: `ALT-${Date.now()}`, title: 'SOS raised by driver', body: 'Control tower escalation created with current route and driver profile.', priority: 'High', time: 'now', read: false });
    record('SOS incident raised', 'Emergency escalation sent to hub/control tower demo queue', 'High priority case created');
    state.active = 'alerts';
    render();
    return;
  }
  if (action === 'settle_cod') {
    const due = state.data.shift.codDue;
    state.data.shift.codDue = 0;
    state.data.earnings = state.data.earnings.map(item => item.label.includes('COD') ? { ...item, value: 0 } : item);
    record('COD settlement', `${money(due)} marked as deposited at hub`, 'Settlement receipt pending supervisor approval');
    return;
  }
  if (action === 'read_alert') {
    const alert = state.data.alerts.find(item => item.id === id);
    if (alert) alert.read = true;
    record('Alert acknowledged', alert ? alert.title : 'Alert', 'Acknowledged');
    return;
  }
  if (action === 'mark_all_alerts') {
    state.data.alerts = state.data.alerts.map(alert => ({ ...alert, read: true }));
    record('Alerts acknowledged', 'All control tower alerts marked read', 'Inbox cleared');
    return;
  }
  if (action === 'simulate_alert') {
    state.data.alerts.unshift({ id: `ALT-${Date.now()}`, title: 'New route exception', body: 'Synthetic alert: customer access gate closes in 25 minutes. Prioritise current pharmacy delivery.', priority: 'High', time: 'now', read: false });
    record('Synthetic alert', 'New control tower alert generated', 'Alert received');
    return;
  }
  if (action === 'topic') {
    const topic = button.dataset.topic || 'Support';
    state.messages.push({ from: 'user', text: topic });
    state.messages.push({ from: 'bot', text: botReply(topic) });
    record('Support topic opened', topic, 'Assistant response generated');
    return;
  }
  if (action === 'install_app') {
    if (deferredInstallPrompt) {
      deferredInstallPrompt.prompt();
      deferredInstallPrompt.userChoice.then(() => { deferredInstallPrompt = null; });
      record('PWA install prompt', 'Browser install prompt opened', 'Install requested');
    } else {
      toast('Use browser menu → Add to Home Screen if the install prompt is unavailable.');
    }
    return;
  }
  if (action === 'export_data') {
    const payload = JSON.stringify({ exportedAt: new Date().toISOString(), driver: state.data.driver, activity: state.activity }, null, 2);
    const blob = new Blob([payload], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'liumgo-driver-activity.json';
    link.click();
    URL.revokeObjectURL(url);
    record('Activity export', 'Downloaded local driver activity JSON', 'Exported');
    return;
  }
  if (action === 'reset_demo') {
    localStorage.removeItem(STORAGE_KEY);
    state.data = structuredCloneSafe(FALLBACK_DATA);
    state.activity = [];
    state.messages = [{ from: 'bot', text: 'Demo reset complete. How can I help with today’s route?' }];
    persist();
    toast('Demo data reset');
    return;
  }
});

app.addEventListener('submit', event => {
  event.preventDefault();
  const form = event.target;
  const formType = form.dataset.form;
  const formData = new FormData(form);

  if (formType === 'login') {
    const user = String(formData.get('userId') || '').trim().toUpperCase();
    const pass = String(formData.get('password') || '');
    if ((user === 'LIUMGO' || user === 'DRIVER') && pass === 'LIUMGO123') {
      sessionStorage.setItem(AUTH_KEY, 'true');
      state.authed = true;
      state.active = 'home';
      toast('Welcome to Liumgo Driver');
    } else {
      toast('Invalid demo credentials. Use LIUMGO / LIUMGO123.');
    }
    return;
  }

  if (formType === 'pod') {
    const stopId = String(formData.get('stopId') || '');
    const proofType = String(formData.get('proofType') || 'POD');
    const reference = String(formData.get('reference') || '').trim() || 'No reference entered';
    const file = form.querySelector('[name="podFile"]')?.files?.[0];
    completeStop(stopId, `${proofType} · ${reference}${file ? ` · ${file.name}` : ''}`);
    state.active = 'route';
    render();
    return;
  }

  if (formType === 'incident') {
    const type = String(formData.get('type') || 'Exception');
    const detail = String(formData.get('detail') || '').trim() || 'No details supplied';
    state.data.alerts.unshift({ id: `ALT-${Date.now()}`, title: type, body: detail, priority: type.includes('Safety') || type.includes('breakdown') ? 'High' : 'Medium', time: 'now', read: false });
    record('Exception raised', `${type}: ${detail}`, 'Control tower case created');
    state.active = 'alerts';
    render();
    return;
  }

  if (formType === 'leave') {
    const type = String(formData.get('type') || 'Availability request');
    const date = String(formData.get('date') || 'next available date');
    const comment = String(formData.get('comment') || '').trim() || 'No comment';
    record('Availability request', `${type} · ${date} · ${comment}`, 'Planner review pending');
    return;
  }

  if (formType === 'document') {
    const docType = String(formData.get('docType') || 'Document');
    const file = form.querySelector('[name="docFile"]')?.files?.[0];
    state.data.documents.unshift({ id: `DOC-${Date.now()}`, name: docType, number: file ? file.name : 'Uploaded from mobile', validUntil: 'Pending review', status: 'Pending verification' });
    record('Document uploaded', `${docType}${file ? ` · ${file.name}` : ''}`, 'Wallet verification pending');
    return;
  }

  if (formType === 'chat') {
    const message = String(formData.get('message') || '').trim();
    if (!message) return;
    state.messages.push({ from: 'user', text: message });
    state.messages.push({ from: 'bot', text: botReply(message) });
    persist();
    form.reset();
    render();
  }
});

window.addEventListener('beforeinstallprompt', event => {
  event.preventDefault();
  deferredInstallPrompt = event;
  toast('Liumgo Driver can be installed on this device.');
});

window.addEventListener('online', () => { state.online = true; toast('Back online'); });
window.addEventListener('offline', () => { state.online = false; toast('Offline mode active'); });

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js').catch(error => console.warn('Service worker registration failed', error));
  });
}

hydrateDemoData();
render();
