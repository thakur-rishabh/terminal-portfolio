/* ════════════════════════════════════════════════
   script.js — Terminal/Cloud Portfolio Interactions
   ════════════════════════════════════════════════ */

// ── MATRIX RAIN ──────────────────────────────────
(function initMatrix() {
  const canvas  = document.getElementById('matrixCanvas');
  const ctx     = canvas.getContext('2d');
  const chars   = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()[]{}|;:,.<>?terraform-aws-gcp-databricks-python-kubectl-docker-git-bash-ci-cd';
  const fontSize = 13;
  let columns, drops;

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    columns = Math.floor(canvas.width / fontSize);
    drops   = Array.from({ length: columns }, () => Math.floor(Math.random() * -100));
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
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    createNodes();
  }

  function createNodes() {
    nodes = Array.from({ length: 30 }, () => ({
      x:  Math.random() * canvas.width,
      y:  Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r:  Math.random() * 2.5 + 1,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Connections
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx   = nodes[i].x - nodes[j].x;
        const dy   = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const alpha = 1 - dist / 120;
          ctx.strokeStyle = `rgba(0, 255, 65, ${alpha * 0.6})`;
          ctx.lineWidth   = 0.8;
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
      if (n.x < 0 || n.x > canvas.width)  n.vx *= -1;
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
  const cta   = document.getElementById('heroCta');
  const stats = document.getElementById('avatarStats');

  const delays = [0, 600, 1000, 1400, 1700, 2000, 2400];

  lines.forEach((line, i) => {
    if (!line) return;
    setTimeout(() => {
      line.classList.remove('hidden');
    }, delays[i]);
  });

  setTimeout(() => cta   && cta.classList.remove('hidden'),   3000);
  setTimeout(() => stats && stats.classList.remove('hidden'), 3200);
})();

// ── TYPEWRITER ROLE CYCLER ──────────────────────
(function typewriterRole() {
  const el    = document.getElementById('typedRole');
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
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-link');

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
  const btn   = document.getElementById('hamburger');
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
  const obs   = new IntersectionObserver(entries => {
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
  const obs   = new IntersectionObserver(entries => {
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
