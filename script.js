/* ════════════════════════════════════════════════
   script.js — Terminal/Cloud Portfolio Interactions
   ════════════════════════════════════════════════ */

// ── MATRIX RAIN ──────────────────────────────────
(function initMatrix() {
  const canvas = document.getElementById('matrixCanvas');
  const ctx = canvas.getContext('2d');
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()[]{}|;:,.<>?terraform-aws-gcp-databricks-python-kubectl-docker-git-bash-ci-cd';
  const fontSize = 13;
  let columns, drops;

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    columns = Math.floor(canvas.width / fontSize);
    drops = Array.from({ length: columns }, () => Math.floor(Math.random() * -100));
  }

  function draw() {
    ctx.fillStyle = 'rgba(13, 17, 23, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = `${fontSize}px JetBrains Mono, monospace`;

    drops.forEach((y, i) => {
      const char = chars[Math.floor(Math.random() * chars.length)];
      const alpha = Math.random() > 0.95 ? 1 : 0.5;
      ctx.fillStyle = `rgba(0, 255, 65, ${alpha})`;
      ctx.fillText(char, i * fontSize, y * fontSize);
      if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    });
  }

  resize();
  window.addEventListener('resize', resize);
  setInterval(draw, 40);
})();

// ── NETWORK NODE CANVAS ─────────────────────────
(function initNetwork() {
  const canvas = document.getElementById('networkCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let nodes = [];
  let animId;

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    createNodes();
  }

  function createNodes() {
    nodes = Array.from({ length: 30 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: Math.random() * 2.5 + 1,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Connections
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const alpha = 1 - dist / 120;
          ctx.strokeStyle = `rgba(0, 255, 65, ${alpha * 0.6})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }
    // Nodes
    nodes.forEach(n => {
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 191, 255, 0.8)';
      ctx.fill();
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
      if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
    });
    animId = requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener('resize', resize);
  draw();
})();

// ── BOOT SEQUENCE  ───────────────────────────────
(function bootSequence() {
  const lines = [
    document.getElementById('bootLine1'),
    document.getElementById('bootLine2'),
    document.getElementById('bootLine3'),
    document.getElementById('bootLine4'),
    document.getElementById('bootLine5'),
    document.getElementById('bootLine6'),
    document.getElementById('bootLine7'),
  ];
  const cta = document.getElementById('heroCta');
  const stats = document.getElementById('avatarStats');

  const delays = [0, 600, 1000, 1400, 1700, 2000, 2400];

  lines.forEach((line, i) => {
    if (!line) return;
    setTimeout(() => {
      line.classList.remove('hidden');
    }, delays[i]);
  });

  setTimeout(() => cta && cta.classList.remove('hidden'), 3000);
  setTimeout(() => stats && stats.classList.remove('hidden'), 3200);
})();

// ── TYPEWRITER ROLE CYCLER ──────────────────────
(function typewriterRole() {
  const el = document.getElementById('typedRole');
  if (!el) return;
  const roles = ['Software Engineer III', 'Cloud Infrastructure Engineer', 'Data Engineering Lead', 'Terraform Specialist', 'Databricks Platform Engineer'];
  let ri = 0, ci = 0, deleting = false;
  const baseDelay = 3000;

  function type() {
    const role = roles[ri];
    if (!deleting) {
      ci++;
      el.textContent = `"${role.slice(0, ci)}"`;
      if (ci === role.length) {
        deleting = true;
        setTimeout(type, baseDelay);
        return;
      }
      setTimeout(type, 80);
    } else {
      ci--;
      el.textContent = `"${role.slice(0, ci)}"`;
      if (ci === 0) {
        deleting = false;
        ri = (ri + 1) % roles.length;
        setTimeout(type, 300);
        return;
      }
      setTimeout(type, 40);
    }
  }

  setTimeout(type, 3500);
})();

// ── NAVBAR SCROLL ────────────────────────────────
(function navScroll() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });
})();

// ── ACTIVE NAV LINK ─────────────────────────────
(function activeNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = '#' + entry.target.id;
        navLinks.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === id);
        });
      }
    });
  }, { rootMargin: '-40% 0px -59% 0px' });

  sections.forEach(s => observer.observe(s));
})();

// ── MOBILE HAMBURGER ─────────────────────────────
(function hamburger() {
  const btn = document.getElementById('hamburger');
  const links = document.getElementById('navLinks');
  if (!btn || !links) return;

  btn.addEventListener('click', () => {
    btn.classList.toggle('open');
    links.classList.toggle('open');
  });

  links.querySelectorAll('.nav-link').forEach(a => {
    a.addEventListener('click', () => {
      btn.classList.remove('open');
      links.classList.remove('open');
    });
  });
})();

// ── SCROLL FADE-IN ──────────────────────────────
(function scrollFade() {
  const els = document.querySelectorAll('.fade-in');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(el => obs.observe(el));
})();

// ── SKILL BARS ───────────────────────────────────
(function skillBars() {
  const fills = document.querySelectorAll('.skill-bar-fill');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const target = fill.getAttribute('data-width');
        setTimeout(() => { fill.style.width = target + '%'; }, 200);
        obs.unobserve(fill);
      }
    });
  }, { threshold: 0.3 });
  fills.forEach(f => obs.observe(f));
})();

// ── TIMELINE DOT ACTIVATE ON SCROLL ────────────
(function timelineDots() {
  const items = document.querySelectorAll('.timeline-item');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const dot = entry.target.querySelector('.timeline-dot');
        if (dot) dot.classList.add('active');
      }
    });
  }, { threshold: 0.3 });
  items.forEach(i => obs.observe(i));
})();

// ── STAGGER FADE DELAYS ─────────────────────────
document.querySelectorAll('.fade-in').forEach((el, i) => {
  el.style.transitionDelay = `${i * 80}ms`;
});

// ── SMOOTH SCROLL ────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── HACKER INTRUSION OVERLAY ──────────────────────────
(function hackerOverlay() {
  if (sessionStorage.getItem('hackerSeen')) return;

  const overlay = document.getElementById('hacker-overlay');
  const hackTerm = document.getElementById('hack-terminal');
  const hackChat = document.getElementById('hack-chat');
  const hackOut = document.getElementById('hack-output');
  const hackCta = document.getElementById('hack-cta');
  const chatMsgs = document.getElementById('chat-messages');
  const chatInput = document.getElementById('chatInput');
  const quickReplies = document.getElementById('quickReplies');
  if (!overlay) return;

  // Mini matrix rain on hack canvas
  const canvas = document.getElementById('hackCanvas');
  const ctx = canvas.getContext('2d');
  const chars = '01ABCDEFrishabh@portfolio#TERRAFORM.AWS.GCP';
  const fs = 12;
  let hackCols, hackDrops, hackInterval;
  function resizeHack() {
    canvas.width = overlay.offsetWidth;
    canvas.height = overlay.offsetHeight;
    hackCols = Math.floor(canvas.width / fs);
    hackDrops = Array.from({ length: hackCols }, () => Math.floor(Math.random() * -40));
  }
  function drawHack() {
    ctx.fillStyle = 'rgba(0,0,0,0.06)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = `${fs}px JetBrains Mono, monospace`;
    hackDrops.forEach((y, i) => {
      ctx.fillStyle = `rgba(0,255,65,${Math.random() > 0.9 ? 0.85 : 0.3})`;
      ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * fs, y * fs);
      if (y * fs > canvas.height && Math.random() > 0.975) hackDrops[i] = 0;
      hackDrops[i]++;
    });
  }
  resizeHack();
  window.addEventListener('resize', resizeHack);
  hackInterval = setInterval(drawHack, 45);

  // Hack terminal type-in sequence
  const LINES = [
    { html: '<span class="hack-r">⚠  SYSTEM BREACH DETECTED</span>', delay: 0 },
    { html: '<span class="hack-d">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>', delay: 300 },
    { html: '<span class="hack-g">$</span> <span class="hack-d">./scan_target.sh --deep</span>', delay: 600 },
    { html: '<span class="hack-d">  Scanning IP: 192.168.x.xxx...</span>', delay: 1000 },
    { html: '<span class="hack-o">  [████████████████████] 100%</span>', delay: 1400 },
    { html: '<span class="hack-d">──────────────────────────────────────</span>', delay: 1800 },
    { html: '<span class="hack-c">TARGET IDENTIFIED:</span>', delay: 2100 },
    { html: '<span class="hack-g">  NAME    </span><span class="hack-w">= Rishabh Thakur</span>', delay: 2450 },
    { html: '<span class="hack-g">  ROLE    </span><span class="hack-w">= Software Engineer III</span>', delay: 2750 },
    { html: '<span class="hack-g">  COMPANY </span><span class="hack-w">= Walmart, Inc.</span>', delay: 3050 },
    { html: '<span class="hack-g">  EXP     </span><span class="hack-w">= 6+ Years · 4 Companies</span>', delay: 3350 },
    { html: '<span class="hack-g">  SKILLS  </span><span class="hack-w">= Terraform · AWS · GCP · Databricks · Python</span>', delay: 3650 },
    { html: '<span class="hack-d">──────────────────────────────────────</span>', delay: 4000 },
    { html: '<span class="hack-o">⚡ ACCESS GRANTED — portfolio unlocked</span>', delay: 4300 },
  ];

  function addHackLine(html) {
    const el = document.createElement('span');
    el.className = 'hack-line';
    el.innerHTML = html;
    hackOut.appendChild(el);
    hackOut.scrollTop = hackOut.scrollHeight;
  }

  function runHackSequence() {
    LINES.forEach(({ html, delay }) => setTimeout(() => addHackLine(html), delay));
    setTimeout(() => hackCta.classList.remove('hidden'), 4700);
  }

  // Show overlay after short delay
  setTimeout(() => {
    overlay.style.display = 'flex';
    runHackSequence();
  }, 800);

  // Dramatic close with exit animation
  function closeOverlay() {
    clearInterval(hackInterval);
    sessionStorage.setItem('hackerSeen', '1');
    const exitLines = [
      { html: '<span class="hack-r">⚡ TERMINATING SECURE CHANNEL...</span>', delay: 0 },
      { html: '<span class="hack-d">  Wiping session data... ████████ OK</span>', delay: 380 },
      { html: '<span class="hack-r">  CONNECTION TERMINATED</span>', delay: 750 },
    ];
    hackChat.classList.add('hidden');
    hackTerm.classList.remove('hidden');
    hackCta.classList.add('hidden');
    hackOut.innerHTML = '';
    exitLines.forEach(({ html, delay }) => setTimeout(() => addHackLine(html), delay));
    setTimeout(() => {
      overlay.classList.add('overlay-exit');
      setTimeout(() => { overlay.style.display = 'none'; }, 1300);
    }, 1100);
  }

  // Phase 1 buttons
  document.getElementById('hackNo').addEventListener('click', closeOverlay);
  document.getElementById('hackYes').addEventListener('click', () => {
    hackTerm.classList.add('hidden');
    hackChat.classList.remove('hidden');
    setTimeout(() => chatInput.focus(), 100);
    botSay("🔐 Secure channel established.\n\nHi! I'm Rishabh's portfolio bot. Ask me anything about his experience, skills, education, or how to contact him.\n\nOr pick a topic 👇", true);
    setQuickReplies(['💼 Experience', '⚙️ Skills', '🎓 Education', '📧 Contact', '🏅 Achievements']);
  });
  document.getElementById('hackChatClose').addEventListener('click', closeOverlay);

  // Chatbot responses
  const RESPONSES = [
    { match: /walmart|current|present/i, reply: '💼 **Walmart, Inc.** — Software Engineer III | Denver, CO | Feb 2025–Present\n\n▶ Terraform IaC for cloud infra\n▶ Databricks for large-scale data processing\n▶ Monte Carlo + ThoughtSpot observability\n▶ CI/CD pipeline automation' },
    { match: /bayer|data.?scientist|etl|bigquery/i, reply: '🧬 **Bayer R&D** — Assoc. Data Scientist | Dec 2023–Feb 2025\n\n▶ ETL: AWS S3 → GCP BigQuery via Glue/Lambda\n▶ 8% AWS cost reduction\n▶ 80% observability boost via Lambda alerts\n▶ 30% faster incident response w/ CI/CD' },
    { match: /intern|sagemaker|grafana|airflow|23\.4/i, reply: '☁️ **Bayer Intern** — Cloud Engineer | May–Oct 2023\n\n▶ 23.4% cost cut automating idle SageMaker instances\n▶ Grafana dashboards for AWS monitoring\n▶ Airflow OAuth — 15% less manual onboarding' },
    { match: /volkswagen|vw|aem|ansible|nagios/i, reply: '🚗 **Volkswagen** — Software Engineer | Nov 2018–Jan 2022\n\n▶ 20% load time reduction on AEM\n▶ Ansible CI/CD automation\n▶ Migrated to AWS CloudFormation\n▶ ELK stack observability POC' },
    { match: /skill|tech|stack|terraform|python|aws|gcp|databricks|spark|docker/i, reply: '⚙️ **Tech Stack:**\n\n☁️ AWS · GCP · Azure\n🔧 Terraform · Ansible · Docker · Kubernetes\n📊 Databricks · Spark · BigQuery · Glue\n💻 Python · SQL · Bash\n🔁 GitHub Actions · Airflow · Grafana\n🔭 Monte Carlo · ThoughtSpot · ELK' },
    { match: /education|degree|university|master|bachelor/i, reply: '🎓 **Education:**\n\n• MS Computer Science — UT Arlington (2022–2023)\n• BE Computer Science — Savitribai Phule Pune University (2014–2018)' },
    { match: /contact|email|phone|reach|linkedin|hire/i, reply: '📬 **Contact Rishabh:**\n\n📧 rishabhprasadthakur@gmail.com\n📞 682-313-8425\n🔗 linkedin.com/in/rishabhpthakur\n🐙 github.com/thakur-rishabh' },
    { match: /achiev|cost|reduc|improv|result|metric|number/i, reply: '🏅 **Key Metrics:**\n\n✅ 8% AWS cost reduction @ Bayer\n✅ 23.4% ops cost cut @ Bayer Intern\n✅ 30% decision efficiency (dashboards)\n✅ 80% observability improvement\n✅ 20% AEM load time reduction @ VW' },
    { match: /experience|work|job|career|history/i, reply: '💼 **Career Timeline:**\n\n1. Walmart — SWE III (2025–Present)\n2. Bayer — Data Scientist (2023–2025)\n3. Bayer — Cloud Intern (2023)\n4. Volkswagen — SWE (2018–2022)\n\nAsk about any company!' },
    { match: /hello|hi|hey|sup/i, reply: "👋 Hey! I'm Rishabh's portfolio bot.\n\nAsk me about his experience, skills, education, or how to reach him!" },
    { match: /thank|bye|exit|close|later|quit/i, reply: "✅ Thanks for chatting! Closing secure channel in 2s...", after: () => setTimeout(closeOverlay, 2000) },
  ];

  function botSay(text, immediate = false) {
    if (!immediate) {
      const typing = document.createElement('div');
      typing.className = 'chat-bubble bot typing';
      typing.innerHTML = '<span class="bubble-label">rishabh-bot</span><span class="typing-dots"> </span>';
      chatMsgs.appendChild(typing);
      chatMsgs.scrollTop = chatMsgs.scrollHeight;
      setTimeout(() => { chatMsgs.removeChild(typing); addBotBubble(text); }, 700);
    } else {
      addBotBubble(text);
    }
  }

  function addBotBubble(text) {
    const el = document.createElement('div');
    el.className = 'chat-bubble bot';
    el.innerHTML = `<span class="bubble-label">rishabh-bot@portfolio</span>${text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>')}`;
    chatMsgs.appendChild(el);
    chatMsgs.scrollTop = chatMsgs.scrollHeight;
  }

  function addUserBubble(text) {
    const el = document.createElement('div');
    el.className = 'chat-bubble user';
    el.textContent = text;
    chatMsgs.appendChild(el);
    chatMsgs.scrollTop = chatMsgs.scrollHeight;
  }

  function setQuickReplies(list) {
    quickReplies.innerHTML = '';
    list.forEach(label => {
      const btn = document.createElement('button');
      btn.className = 'qr-btn';
      btn.textContent = label;
      btn.addEventListener('click', () => { handleChat(label); quickReplies.innerHTML = ''; });
      quickReplies.appendChild(btn);
    });
  }

  function handleChat(text) {
    addUserBubble(text);
    const match = RESPONSES.find(r => r.match.test(text));
    if (match) {
      botSay(match.reply);
      if (match.after) match.after();
    } else {
      botSay("🤔 Not sure about that — try asking about experience, skills, education, achievements, or contact info!");
    }
    setTimeout(() => setQuickReplies(['💼 Experience', '⚙️ Skills', '🎓 Education', '📧 Contact', '🏅 Achievements']), 800);
  }

  function sendChat() {
    const val = chatInput.value.trim();
    if (!val) return;
    chatInput.value = '';
    quickReplies.innerHTML = '';
    handleChat(val);
  }

  chatInput.addEventListener('keydown', e => { if (e.key === 'Enter') sendChat(); });
  document.getElementById('chatSend').addEventListener('click', sendChat);

  // Backtick shortcut (still works outside chat)
  document.addEventListener('keydown', e => {
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) return;
    if (e.key === '`' || e.key === '~') { e.preventDefault(); window.location.href = 'terminal.html'; }
  });
})();
