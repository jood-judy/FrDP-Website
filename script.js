/* FrPD Portal — vanilla JS. Edit the data blocks below to change content. */
document.documentElement.classList.add('js');
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const icons = () => window.lucide && window.lucide.createIcons({ attrs: { 'aria-hidden': 'true' } });
const setText = (id, v) => { const e = document.getElementById(id); if (e) e.textContent = v; };

/* ---------- DATA ---------- */
const SP = 'https://www.microsoft365.com/launch/sharepoint'; // replace with real URLs

// Coverage areas (each has its own org page + map). map.path is an illustrative outline: swap for a real SVG.
const ORGS = {
  wna: { code: 'WNA', name: 'Western North Area', region: 'Western North',
    description: 'Supporting safe, reliable and efficient operations across the Western North coverage area through strong field presence and disciplined execution.',
    leader: { name: 'Eng. Khalid Al Rashid', role: 'WNA Manager', quote: '“Consistent performance starts with clear priorities, strong field presence and teams that support one another.”', bio: 'Leads the Western North Area with a focus on safe execution, operational reliability and strong coordination across field and support teams.' },
    coverage: 'WNA coordinates field and operational support across a broad Western North footprint, connecting local teams with shared standards and responsive technical support.',
    locations: ['North Hub', 'Coastal Operations', 'Field Area A', 'Field Area B', 'Maintenance Center', 'Support Office'],
    teams: ['Operations', 'Maintenance', 'Safety', 'Technical'], teamCount: 10,
    map: { path: 'M40 70L120 30L215 42L290 25L350 80L335 150L365 210L300 262L210 240L140 268L70 225L48 150Z', hub: [200, 140], nodes: [[110, 90], [290, 90], [320, 200], [200, 215], [95, 190]] } },
  wsa: { code: 'WSA', name: 'Western South Area', region: 'Western South',
    description: 'Enabling integrated operational support across the Western South region with a strong emphasis on safety, reliability and responsive field service.',
    leader: { name: 'Eng. Omar Al Zahrani', role: 'WSA Manager', quote: '“Our goal is to make every team better connected, better supported and ready to deliver safely.”', bio: 'Leads the Western South Area and works across disciplines to strengthen field execution, operational readiness and continuous improvement.' },
    coverage: 'WSA supports distributed facilities and field locations through a coordinated model designed for fast response, clear ownership and consistent service quality.',
    locations: ['South Operations Hub', 'Coastal South', 'Field Area C', 'Field Area D', 'Technical Center', 'Regional Office'],
    teams: ['Operations', 'Inspection', 'Safety', 'Technical'], teamCount: 12,
    map: { path: 'M60 40L160 28L250 60L340 48L372 130L320 205L330 262L230 272L150 240L85 250L40 170L70 110Z', hub: [190, 150], nodes: [[110, 80], [300, 100], [330, 220], [230, 235], [90, 200]] } },
  ca: { code: 'CA', name: 'Central Area', region: 'Central',
    description: 'Providing coordinated operational support across the Central coverage area with clear ownership, dependable service and a safety-first mindset.',
    leader: { name: 'Eng. Abdullah Al Salem', role: 'CA Manager', quote: '“Clarity, ownership and teamwork are the foundation of dependable performance.”', bio: 'Provides leadership across operational priorities, people development and service delivery for the Central Area.' },
    coverage: 'Central Area coverage details are ready for your official locations, operating areas and service statistics.',
    locations: ['Central Hub', 'Location CA-B', 'Location CA-C', 'Location CA-D', 'Location CA-E'],
    teams: ['Operations', 'Maintenance', 'Safety', 'Planning'], teamCount: 9,
    map: { path: 'M70 90L150 45L250 38L335 90L360 170L300 245L200 268L110 240L52 170Z', hub: [205, 150], nodes: [[130, 100], [290, 100], [315, 195], [200, 235], [100, 190]] } }
};

// Sidebar slicers. ETP under HR, SMS under Compliance & OE, Dashboards and More are their own groups, the rest under Other Groups.
const NAV = [
  { t: 'Organizations', items: Object.entries(ORGS).map(([k, o]) => ({ n: `${o.code} · ${o.name}`, h: `organization.html?org=${k}`, org: k })) },
  { t: 'Compliance & Operational Excellence', items: [
    { n: 'SAEs', h: SP, x: 1 }, { n: 'OE', h: SP, x: 1 }, { n: 'Safety Management System (SMS)', h: SP, x: 1 }] },
  { t: 'Human Resources', items: [{ n: 'Human Resources', h: SP, x: 1 }, { n: 'ETP', h: SP, x: 1 }] },
  { t: 'Other Groups', items: [
    { n: 'Information Security', h: 'infosec.html', pg: 'infosec' }, { n: 'Operational Readiness & Support', h: SP, x: 1 },
    { n: 'Planning & Performance Management', h: SP, x: 1 }] },
  { t: 'Dashboards', items: [{ n: 'Dashboard 1', h: SP, x: 1 }, { n: 'Dashboard 2', h: SP, x: 1 }, { n: 'Dashboard 3', h: SP, x: 1 }] },
  { t: 'More', items: [{ n: 'DrP', h: SP, x: 1 }, { n: 'GIS', h: SP, x: 1 }] }
];

const TIPS = [
  ['Workplace safety', 'Keep walkways clear and report hazards early.'],
  ['Electrical safety', 'Inspect equipment before use. Never bypass protective controls.'],
  ['Emergency response', 'Know your evacuation routes and assembly point.'],
  ['PPE & field safety', 'Use task-specific PPE and check field conditions before you start.'],
  ['Fire safety', 'Keep fire equipment accessible and know the alarm procedure.']
];


const SAFETY_ICONS = ['briefcase', 'zap', 'siren', 'hard-hat', 'flame'];
const QUICK = [
  ['house', 'Home Portal', 'Corporate home'], ['layout-dashboard', 'AGME Portal', 'Business portal'],
  ['user-round', 'Employee Portal', 'Employee services'], ['folder-kanban', 'SharePoint', 'Teams & collaboration'],
  ['shield-check', 'Safety Portal', 'Safety resources'], ['files', 'Documents Portal', 'Controlled documents'],
  ['headphones', 'Service Desk', 'IT & portal support'], ['link', 'Other References', 'More useful links']
]; // links use SP above: replace with real URLs

const OBJECTIVES = [
  ['shield-check', 'Strengthen safety culture', 'Keep safety visible in every decision, task and field activity.'],
  ['gauge', 'Improve reliability', 'Support consistent operations through disciplined maintenance and monitoring.'],
  ['workflow', 'Simplify work', 'Design practical workflows that reduce friction and improve responsiveness.'],
  ['users-round', 'Develop people', 'Build capability, collaboration and ownership across all teams.'],
  ['bar-chart-3', 'Use data better', 'Turn operational information into clear, timely decisions.'],
  ['leaf', 'Create sustainable value', 'Balance performance, efficiency and long-term impact.']
];

const SERVICES = [
  ['settings', 'Operational Support', 'Coordination, performance visibility and practical support for day-to-day execution.'],
  ['map-pinned', 'Field Services', 'On-site coordination and field-focused support where operations happen.'],
  ['clipboard-check', 'Inspection', 'Structured inspections supporting assurance, quality and issue visibility.'],
  ['wrench', 'Maintenance Support', 'Planning and support that strengthens asset reliability and readiness.'],
  ['shield-check', 'Safety & Compliance', 'Clear controls, monitoring and guidance for safer, compliant execution.'],
  ['headphones', 'Technical Support', 'Responsive technical coordination for operational and engineering needs.']
];

// Placeholder events. Only future dates (yyyy-mm-dd) are shown.
const EVENTS = [
  { date: '2026-10-14', title: 'Annual Fire Drill & Evacuation Exercise', place: 'All facilities', time: '09:00', cat: 'Drill' },
  { date: '2026-10-26', title: 'Fire Safety Awareness Week', place: 'All coverage areas', time: 'All week', cat: 'Awareness' },
  { date: '2026-11-05', title: 'Leadership Town Hall', place: 'Main auditorium', time: '13:00', cat: 'Leadership' },
  { date: '2026-11-18', title: 'Advanced Suppression Systems Training', place: 'Training center', time: '08:30', cat: 'Training' },
  { date: '2026-12-02', title: 'Year-End Safety Review', place: 'Central Area', time: '10:00', cat: 'Review' }
];

// Placeholder achievements: replace with real figures.
const ACHIEVEMENTS = [
  { n: 1.5, dec: 1, suf: 'M+', label: 'Incident-free work hours', icon: 'shield-check' },
  { n: 98, suf: '%', label: 'Emergency drill readiness', icon: 'siren' },
  { n: 12, suf: '', label: 'Safety awards received', icon: 'award' },
  { n: 35, suf: '+', label: 'Training sessions delivered', icon: 'graduation-cap' }
];

const NEWS = [
  { cat: 'Operations', date: '18 Sep 2026', iso: '2026-09-18', title: 'FrPD launches a refreshed operating rhythm', summary: 'Clearer touchpoints now connect priorities, risks and decisions.', img: 'images/news/news-1.svg',
    body: ['FrPD has introduced a refreshed operating rhythm designed to make cross-team coordination more consistent and practical.', 'Replace this placeholder with the official announcement when available.'] },
  { cat: 'Safety', date: '15 Sep 2026', iso: '2026-09-15', title: 'New safety focus campaign reinforces field readiness', summary: 'Pre-job checks, hazard awareness and stop-work responsibility.', img: 'images/news/news-2.svg',
    body: ['A new campaign highlights pre-job checks, hazard awareness and the responsibility to stop work when conditions change.', 'Replace this placeholder with the approved Safety communication.'] },
  { cat: 'People', date: '10 Sep 2026', iso: '2026-09-10', title: 'Teams complete capability development sessions', summary: 'Practical skills and shared ways of working.', img: 'images/news/news-3.svg',
    body: ['Teams completed sessions focused on practical skills and cross-functional collaboration.', 'This article text is editable placeholder content.'] },
  { cat: 'Technology', date: '04 Sep 2026', iso: '2026-09-04', title: 'Digital improvements simplify access to information', summary: 'Fewer steps to reach frequently used resources.', img: 'images/news/news-4.svg',
    body: ['Recent improvements simplify how users reach operational information and shared resources.', 'Replace this placeholder with the final technology update.'] }
];

const LEADERS = [
  ['Ahmed Al Qahtani', 'Operations Director', 'Operations'], ['Sarah Al Otaibi', 'Safety & Compliance Director', 'Safety'],
  ['Mohammed Al Dossary', 'Technical Services Director', 'Technical'], ['Reem Al Shammari', 'Maintenance Director', 'Maintenance'],
  ['Khalid Al Ghamdi', 'Field Services Director', 'Field Services'], ['Noura Al Harbi', 'Compliance Manager', 'Compliance'],
  ['Abdullah Al Zahrani', 'Engineering Manager', 'Engineering'], ['Lama Al Salem', 'Planning Manager', 'Planning'],
  ['Fahad Al Mutairi', 'Business Support Manager', 'Support']
];

const TEAM = [
  ['Ahmed Al Qahtani', 'Senior Operations Engineer'], ['Sarah Al Otaibi', 'Safety Specialist'], ['Mohammed Al Dossary', 'Maintenance Engineer'],
  ['Reem Al Shammari', 'Planning Analyst'], ['Khalid Al Ghamdi', 'Field Supervisor'], ['Noura Al Harbi', 'Compliance Specialist'],
  ['Abdullah Al Zahrani', 'Technical Engineer'], ['Lama Al Salem', 'Operations Coordinator'], ['Fahad Al Mutairi', 'Shift Supervisor'],
  ['Huda Al Anazi', 'Safety Coordinator'], ['Yousef Al Dosari', 'Inspection Engineer'], ['Maha Al Qarni', 'Technical Analyst']
];

// Person photo placeholders. Swap for real photos, e.g. images/team/ahmed.jpg
// Hero photos that fade in rotation behind the top tile (every 5 seconds)
const HERO_IMAGES = ['images/hero/fire-1.jpg', 'images/hero/fire-2.jpg', 'images/hero/fire-3.jpg', 'images/hero/fire-4.jpg'];
const HERO_MS = 5000;

const photo = i => `images/team/person-${(i % 3) + 1}.svg`;

/* ---------- INFORMATION SECURITY PAGE DATA ---------- */
// Placeholder people: replace names, roles, descriptions and photos (images/team/sec-*.svg).
const SEC_TEAM = {
  lead: { name: 'Eng. Sultan Al Mutairi', role: 'Information Security Manager', img: 'images/team/sec-1.svg', mail: 'security.lead@example.com',
    desc: 'Leads FrPD’s information security strategy, risk management and incident response, setting the standards that protect company data and systems.' },
  staff: [
    { name: 'Nadia Al Harbi', role: 'Cyber Security Analyst', img: 'images/team/sec-2.svg', mail: 'security.analyst@example.com',
      desc: 'Monitors systems for threats, investigates alerts and helps teams respond quickly to suspicious activity.' },
    { name: 'Faisal Al Qahtani', role: 'Security Awareness & Compliance Specialist', img: 'images/team/sec-3.svg', mail: 'security.awareness@example.com',
      desc: 'Runs awareness training and policy reviews so everyone knows how to stay secure at work.' }
  ]
};

// Tools shown as flashcards. t = 'cyber' or 'ai'. Confirm each tool is approved for company use before publishing.
const TOOLS = [
  { n: 'Have I Been Pwned', t: 'cyber', i: 'mail-warning', d: 'Check whether your email address has appeared in a known data breach.', u: 'https://haveibeenpwned.com' },
  { n: 'VirusTotal', t: 'cyber', i: 'scan-search', d: 'Scan suspicious files, links and attachments against many security engines.', u: 'https://www.virustotal.com' },
  { n: 'urlscan.io', t: 'cyber', i: 'globe', d: 'Inspect what a suspicious website does before you trust or open it.', u: 'https://urlscan.io' },
  { n: 'Bitwarden', t: 'cyber', i: 'key-round', d: 'Keep unique, strong passwords in an encrypted password manager.', u: 'https://bitwarden.com' },
  { n: 'Microsoft Authenticator', t: 'cyber', i: 'smartphone', d: 'Add multi-factor authentication so a stolen password is not enough.', u: 'https://www.microsoft.com/en-us/security/mobile-authenticator-app' },
  { n: 'Claude', t: 'ai', i: 'sparkles', d: 'AI assistant for drafting, summarizing documents and analyzing information.', u: 'https://claude.ai' },
  { n: 'Microsoft Copilot', t: 'ai', i: 'bot', d: 'AI assistant for writing, research and everyday Microsoft 365 tasks.', u: 'https://copilot.microsoft.com' },
  { n: 'ChatGPT', t: 'ai', i: 'message-square', d: 'Conversational AI for brainstorming, explaining topics and drafting content.', u: 'https://chatgpt.com' },
  { n: 'Google Gemini', t: 'ai', i: 'brain-circuit', d: 'AI assistant for research, summaries and idea generation.', u: 'https://gemini.google.com' }
];

const SEC_TIPS = [
  ['key-round', 'Use strong, unique passwords', 'Use a long passphrase for every account and store them in a password manager.'],
  ['shield-check', 'Turn on multi-factor authentication', 'A second step stops most account takeovers even when a password leaks.'],
  ['mail-warning', 'Think before you click', 'Check the sender, the link and the urgency. When in doubt, report it instead of opening it.'],
  ['refresh-cw', 'Keep software updated', 'Install updates promptly. They close the security gaps attackers rely on.'],
  ['lock-keyhole', 'Lock your screen', 'Lock your device every time you step away, at the office and anywhere else.'],
  ['brain-circuit', 'Protect data in AI tools', 'Never paste confidential, personal or operational data into tools that are not approved.'],
  ['wifi', 'Be careful on public Wi-Fi', 'Avoid sensitive work on open networks, or use an approved VPN.'],
  ['flag', 'Report incidents quickly', 'Lost a device or clicked something odd? Tell the security team straight away.']
];

/* ---------- SHARED: sidebar ---------- */
function currentOrgKey() {
  const k = new URLSearchParams(location.search).get('org');
  return ORGS[k] ? k : 'wna';
}

function buildSidebar() {
  const bar = $('#sidebar');
  if (!bar) return;
  const page = document.body.dataset.page, key = page === 'organization' ? currentOrgKey() : null;
  const groups = NAV.map(g => {
    const active = g.items.some(x => (x.org && x.org === key) || (x.pg && x.pg === page));
    const links = g.items.map(x => `<a href="${x.h}" ${x.x ? 'target="_blank" rel="noopener noreferrer"' : ''} class="${(x.org && x.org === key) || (x.pg && x.pg === page) ? 'active' : ''}">${x.n}${x.x ? ' <i data-lucide="external-link"></i>' : ''}</a>`).join('');
    return `<details class="${active ? 'has-active' : ''}" ${active ? 'open' : ''}><summary>${g.t}<i class="chev" data-lucide="chevron-down"></i></summary><div class="sub">${links}</div></details>`;
  }).join('');
  bar.innerHTML = `<a class="brand" href="index.html" aria-label="FrPD Home"><img src="images/logo/frpd-logo.svg" alt="FrPD"><span>WR/CR Fire Protection Department</span></a>
    <nav class="nav" aria-label="Primary"><a href="index.html" class="${page === 'home' ? 'active' : ''}">Home</a>${groups}</nav>
    <div class="tip"><h4><span id="tipTitle"></span></h4><p id="tipText"></p></div>`;
  const tip = TIPS[new Date().getDate() % TIPS.length];
  setText('tipTitle', 'Safety tip: ' + tip[0]); setText('tipText', tip[1]);
  const btn = $('#menuBtn'), toggle = open => { document.body.classList.toggle('nav-open', open); btn.setAttribute('aria-expanded', open); };
  btn.addEventListener('click', () => toggle(!document.body.classList.contains('nav-open')));
  $('#scrim').addEventListener('click', () => toggle(false));
  document.addEventListener('keydown', e => e.key === 'Escape' && toggle(false));
}

/* ---------- SHARED: coverage map (SVG) ---------- */
function mapSVG(o) {
  const m = o.map, [hx, hy] = m.hub;
  const routes = m.nodes.map(([x, y]) => `<line x1="${hx}" y1="${hy}" x2="${x}" y2="${y}" stroke="#8C8780" stroke-width="1.5" stroke-dasharray="5 5"/><circle cx="${x}" cy="${y}" r="5" fill="#121212"/>`).join('');
  return `<svg class="map" viewBox="0 0 400 300" role="img" aria-label="Map of ${o.name}">
    <path d="${m.path}" fill="#E9E4DC" stroke="#E6B457" stroke-width="5" stroke-linejoin="round"/>
    <ellipse cx="${hx - 60}" cy="${hy + 60}" rx="22" ry="12" fill="#4A4A52"/><ellipse cx="${hx + 70}" cy="${hy - 55}" rx="16" ry="9" fill="#4A4A52"/>
    ${routes}<circle cx="${hx}" cy="${hy}" r="9" fill="#C0504D" stroke="#fff" stroke-width="3"/>
    <text x="${hx + 14}" y="${hy + 5}" font-family="sans-serif" font-weight="800" font-size="16" fill="#121212">${o.code}</text></svg>`;
}

/* ---------- HOME ---------- */
const stagger = box => $$(':scope > *', box).forEach((el, i) => { el.classList.add('rv'); el.style.setProperty('--d', (i * 0.08) + 's'); });

function railControls(rail, prev, next) {
  if (!rail) return;
  const step = () => (rail.firstElementChild?.getBoundingClientRect().width || 240) + 18;
  const upd = () => { if (prev) prev.disabled = rail.scrollLeft < 4; if (next) next.disabled = rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 4; };
  prev?.addEventListener('click', () => rail.scrollBy({ left: -step(), behavior: 'smooth' }));
  next?.addEventListener('click', () => rail.scrollBy({ left: step(), behavior: 'smooth' }));
  rail.addEventListener('scroll', upd, { passive: true }); addEventListener('resize', upd);
  rail._upd = upd; upd();
}

// Fire hydrant icon (inline SVG, matches the line-icon style)
const HYDRANT = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2.5v2.2"/><path d="M8.5 9a3.5 3.5 0 0 1 7 0"/><path d="M7.5 9h9v9.5h-9z"/><path d="M3.5 11.5h4M20.5 11.5h-4M3.5 10v3M20.5 10v3"/><circle cx="12" cy="14" r="1.6"/><path d="M5.5 18.5h13v3h-13z"/></svg>';

const memberCard = (name, role, dept, i) => `<article class="member c${i % 6}"><div class="ph"><img src="${photo(i)}" alt="${name}"></div><small>${dept}</small><h3>${name}</h3><p>${role}</p><a href="mailto:person${i + 1}@example.com" aria-label="Email ${name}" title="Email ${name}">${HYDRANT}</a></article>`;

function initHero() {
  const box = $('#heroBg');
  if (!box) return;
  box.innerHTML = HERO_IMAGES.map(src => `<span style="background-image:url('${src}')"></span>`).join('');
  const slides = $$('span', box); let i = 0;
  slides[0].classList.add('on');
  if (slides.length < 2) return;
  setInterval(() => { slides[i].classList.remove('on'); i = (i + 1) % slides.length; slides[i].classList.add('on'); }, HERO_MS);
}

function initHome() {
  if (document.body.dataset.page !== 'home') return;
  initHero();
  $('#safetyList').innerHTML = TIPS.map((t, i) => `<div class="stip-row"><span class="n">${String(i + 1).padStart(2, '0')}</span><span class="ic"><i data-lucide="${SAFETY_ICONS[i]}"></i></span><div><h3>${t[0]}</h3><p>${t[1]}</p></div></div>`).join('');
  $('#quickGrid').innerHTML = QUICK.map(q => `<a class="qlink" href="${SP}" target="_blank" rel="noopener noreferrer"><span class="ic"><i data-lucide="${q[0]}"></i></span><span><strong>${q[1]}</strong><small>${q[2]}</small></span><i data-lucide="arrow-up-right" class="go"></i></a>`).join('');
  const tick = () => { const d = new Date(); setText('todayDate', d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })); setText('todayTime', d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })); };
  tick(); setInterval(tick, 30000);

  $('#objectives').innerHTML = OBJECTIVES.map((o, i) => `<article class="item obj"><span class="num" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span><h3>${o[1]}</h3><p>${o[2]}</p></article>`).join('');
  // Services: title only on the front, click to flip and read the rest
  const sg = $('#serviceGrid');
  sg.innerHTML = SERVICES.map(s => `<div class="flip-wrap"><button type="button" class="flip" aria-pressed="false"><span class="inner"><span class="face front"><span class="ico"><i data-lucide="${s[0]}"></i></span><span class="ttl">${s[1]}</span><span class="hint">Click to read more</span></span><span class="face back"><span class="ttl">${s[1]}</span><span class="txt">${s[2]}</span></span></span></button></div>`).join('');
  sg.addEventListener('click', e => { const b = e.target.closest('.flip'); if (b) b.setAttribute('aria-pressed', b.classList.toggle('flipped')); });

  // Coverage areas: each map links to its org page
  $('#areaGrid').innerHTML = Object.entries(ORGS).map(([k, o]) => `<a class="area" href="organization.html?org=${k}" aria-label="Open ${o.name} page">${mapSVG(o)}<div class="info"><h3>${o.name}</h3><p>${o.locations.length} coverage locations</p><span class="go">Open ${o.code} page <i data-lucide="arrow-up-right"></i></span></div></a>`).join('');

  // Leaders rail + search
  const rail = $('#leaderRail'), cards = LEADERS.map((l, i) => memberCard(l[0], l[1], l[2], i));
  rail.innerHTML = cards.join('');
  $('#leaderSearch').addEventListener('input', e => {
    const q = e.target.value.trim().toLowerCase();
    const hits = LEADERS.map((l, i) => ({ l, i })).filter(({ l }) => l.join(' ').toLowerCase().includes(q));
    rail.innerHTML = hits.map(({ l, i }) => memberCard(l[0], l[1], l[2], i)).join('');
    $('#leaderEmpty').classList.toggle('is-hidden', hits.length > 0);
    rail.scrollTo({ left: 0 }); rail._upd(); icons();
  });
  railControls(rail, $('#leaderPrev'), $('#leaderNext'));

  // Upcoming events (future only)
  const today = new Date().toISOString().slice(0, 10);
  const ev = EVENTS.filter(e => e.date >= today).sort((a, b) => a.date.localeCompare(b.date));
  $('#eventRail').innerHTML = ev.map(e => {
    const d = new Date(e.date + 'T00:00:00'), left = Math.round((d - new Date(today + 'T00:00:00')) / 864e5);
    return `<article class="event"><div class="top"><div class="day">${d.getDate()}<small>${d.toLocaleDateString('en-GB', { month: 'short' }).toUpperCase()}</small></div><div><strong>${e.cat}</strong><br><span>${left === 0 ? 'Today' : 'In ' + left + ' days'}</span></div></div>
      <div class="body"><h3>${e.title}</h3><p><i data-lucide="map-pin"></i>${e.place}</p><p><i data-lucide="clock"></i>${e.time}</p></div></article>`;
  }).join('');
  $('#eventEmpty').classList.toggle('is-hidden', ev.length > 0);
  railControls($('#eventRail'), $('#eventPrev'), $('#eventNext'));

  // Achievements (count-up)
  $('#achGrid').innerHTML = ACHIEVEMENTS.map(a => `<div><strong data-n="${a.n}" data-dec="${a.dec || 0}" data-suf="${a.suf}">0${a.suf}</strong><span>${a.label}</span></div>`).join('');

  // News reader
  const list = $('#newsList');
  list.innerHTML = NEWS.map((n, i) => `<button type="button" data-i="${i}"><span class="thumb"><img src="${n.img}" alt=""></span><span class="tx"><small>${n.cat} · ${n.date}</small><strong>${n.title}</strong></span></button>`).join('');
  const show = i => { const n = NEWS[i]; $('#newsImg').src = n.img; setText('newsCat', n.cat); setText('newsTitle', n.title); const t = $('#newsDate'); t.textContent = n.date; t.dateTime = n.iso;
    $('#newsBody').innerHTML = n.body.map(p => `<p>${p}</p>`).join(''); $$('button', list).forEach((b, j) => b.classList.toggle('on', j === i)); };
  list.addEventListener('click', e => { const b = e.target.closest('button'); if (b) show(+b.dataset.i); });
  show(0);
}

/* ---------- INFORMATION SECURITY PAGE ---------- */
function initInfosec() {
  if (document.body.dataset.page !== 'infosec') return;
  const card = (p, cls, role) => `<article class="p-card ${cls}"><div class="ph"><img src="${p.img}" alt="${p.name}"></div><div class="pc-body"><small class="mono">${role}</small><h3>${p.name}</h3><p class="prole">${p.role}</p><p>${p.desc}</p><a class="pmail" href="mailto:${p.mail}"><i data-lucide="mail"></i>Contact</a></div></article>`;
  $('#secTree').innerHTML = card(SEC_TEAM.lead, 'lead', 'Team Leader') + '<span class="stem" aria-hidden="true"></span><span class="branch" aria-hidden="true"></span><div class="team-grid">' + SEC_TEAM.staff.map(s => card(s, '', 'Security Team')).join('') + '</div>';

  const grid = $('#toolGrid'), filters = $('#toolFilters');
  const render = f => {
    grid.innerHTML = TOOLS.filter(t => f === 'all' || t.t === f).map(t => `<a class="tool" href="${t.u}" target="_blank" rel="noopener noreferrer" aria-label="Open ${t.n} (opens in a new tab)"><span class="t-top"><span class="t-ico"><i data-lucide="${t.i}"></i></span><span class="t-tag mono">${t.t === 'ai' ? 'AI tool' : 'Cyber security'}</span></span><h3>${t.n}</h3><p><strong>Used for:</strong> ${t.d}</p><span class="t-go">Open tool <i data-lucide="arrow-up-right"></i></span></a>`).join('');
    icons();
  };
  filters.innerHTML = [['all', 'All tools'], ['cyber', 'Cyber security'], ['ai', 'AI tools']].map(([k, l], i) => `<button type="button" class="${i ? '' : 'on'}" data-f="${k}">${l}</button>`).join('');
  filters.addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; $$('button', filters).forEach(x => x.classList.toggle('on', x === b)); render(b.dataset.f); });
  render('all');
  $('#tipGrid').innerHTML = SEC_TIPS.map(t => `<article class="stip"><span class="t-ico"><i data-lucide="${t[0]}"></i></span><h3>${t[1]}</h3><p>${t[2]}</p></article>`).join('');
}

/* ---------- ORGANIZATION PAGE ---------- */
function initOrg() {
  if (document.body.dataset.page !== 'organization') return;
  const k = currentOrgKey(), o = ORGS[k];
  document.title = `${o.code} | FrPD`;
  [['crumb', o.code], ['orgCode', o.code], ['orgName', o.name], ['orgDesc', o.description], ['locCount', o.locations.length], ['regionFact', o.region],
   ['leaderRole', o.leader.role], ['leaderName', o.leader.name], ['leaderQuote', o.leader.quote], ['leaderBio', o.leader.bio], ['coverDesc', o.coverage]].forEach(([id, v]) => setText(id, v));

  $('#mapHolder').innerHTML = `<div class="area">${mapSVG(o)}<div class="info"><h3>${o.name}</h3><p>Illustrative map. Replace with an official SVG or image.</p></div></div>`;
  $('#locList').innerHTML = o.locations.map((l, i) => `<div class="loc"><i data-lucide="map-pin"></i><div><strong>${l}</strong><small>Operational coverage location ${i + 1}</small></div></div>`).join('');

  const people = TEAM.slice(0, o.teamCount).map((p, i) => ({ name: p[0], role: p[1], dept: o.teams[i % o.teams.length], i }));
  const rail = $('#teamRail'), filters = $('#teamFilters'); let dept = 'All';
  filters.innerHTML = ['All', ...o.teams].map((d, i) => `<button type="button" class="${i ? '' : 'on'}" data-d="${d}">${d}</button>`).join('');
  const render = () => {
    const q = $('#teamSearch').value.trim().toLowerCase();
    const hits = people.filter(p => (dept === 'All' || p.dept === dept) && `${p.name} ${p.role} ${p.dept}`.toLowerCase().includes(q));
    rail.innerHTML = hits.map(p => memberCard(p.name, p.role, p.dept, p.i)).join('');
    $('#teamEmpty').classList.toggle('is-hidden', hits.length > 0);
    rail.scrollTo({ left: 0 }); rail._upd?.(); icons();
  };
  filters.addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; dept = b.dataset.d; $$('button', filters).forEach(x => x.classList.toggle('on', x === b)); render(); });
  $('#teamSearch').addEventListener('input', render);
  render(); railControls(rail, $('#teamPrev'), $('#teamNext'));
  stagger($('#locList'));
}

/* ---------- Scroll: sections materialise into view ---------- */
function initReveal() {
  ['#objectives', '#serviceGrid', '#areaGrid', '#achGrid'].forEach(s => { const b = $(s); if (b) stagger(b); });
  $$('.stag').forEach(b => { if (!b.querySelector('.rv')) stagger(b); });
  $$('main > section:not(.hero)').forEach(s => s.classList.add('rv'));
  const els = $$('.rv');
  if (!('IntersectionObserver' in window)) return els.forEach(e => e.classList.add('in'));
  const io = new IntersectionObserver(es => es.forEach(en => {
    if (!en.isIntersecting) return;
    en.target.classList.add('in'); io.unobserve(en.target);
    if (en.target.id === 'achievements') countUp();
  }), { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  els.forEach(e => io.observe(e));
}

function countUp() {
  $$('#achGrid strong').forEach(el => {
    const n = +el.dataset.n, dec = +el.dataset.dec, suf = el.dataset.suf, t0 = performance.now();
    const f = t => { const p = Math.min(1, (t - t0) / 1400), v = n * (1 - Math.pow(1 - p, 3)); el.textContent = v.toFixed(dec) + suf; if (p < 1) requestAnimationFrame(f); };
    matchMedia('(prefers-reduced-motion: reduce)').matches ? (el.textContent = n.toFixed(dec) + suf) : requestAnimationFrame(f);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  buildSidebar(); initHome(); initOrg(); initInfosec(); initReveal(); icons();
  addEventListener('load', icons);
});
