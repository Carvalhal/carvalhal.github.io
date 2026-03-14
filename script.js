/* ============================================================
   Carlos Carvalhal — Portfolio Script
   Particle network · Scroll reveals · Counters · Nav · Easter egg
   ============================================================ */

'use strict';

/* ── Particle Network ──────────────────────────────────────── */
(function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const CFG = {
    count:      85,
    maxDist:    135,
    speed:      0.38,
    dotRadius:  1.4,
    lineWidth:  0.55,
    mouseRange: 220,
  };

  let W = 0, H = 0;
  const mouse = { x: -9999, y: -9999 };
  let particles = [];
  let raf;

  /* ── Particle class ── */
  function Particle() {
    this.reset(true);
  }
  Particle.prototype.reset = function(init) {
    this.x  = Math.random() * W;
    this.y  = init ? Math.random() * H : (Math.random() > 0.5 ? -4 : H + 4);
    this.vx = (Math.random() - 0.5) * CFG.speed;
    this.vy = (Math.random() - 0.5) * CFG.speed;
    if (Math.abs(this.vx) < 0.05) this.vx += 0.1;
    if (Math.abs(this.vy) < 0.05) this.vy += 0.1;
    this.alpha = Math.random() * 0.45 + 0.25;
  };
  Particle.prototype.update = function() {
    this.x += this.vx;
    this.y += this.vy;

    // Soft mouse repulsion
    const dx = this.x - mouse.x;
    const dy = this.y - mouse.y;
    const d2 = dx * dx + dy * dy;
    if (d2 < 60 * 60) {
      const d  = Math.sqrt(d2);
      const f  = (60 - d) / 60 * 0.8;
      this.x  += (dx / d) * f;
      this.y  += (dy / d) * f;
    }

    // Wrap edges with a slight margin
    if (this.x < -8)      this.x = W + 8;
    if (this.x > W + 8)   this.x = -8;
    if (this.y < -8)      this.y = H + 8;
    if (this.y > H + 8)   this.y = -8;
  };
  Particle.prototype.draw = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, CFG.dotRadius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(74, 144, 255, ${this.alpha})`;
    ctx.fill();
  };

  /* ── Connection lines ── */
  function drawConnections() {
    const n = particles.length;
    for (let i = 0; i < n; i++) {
      const pi = particles[i];

      // Particle → particle
      for (let j = i + 1; j < n; j++) {
        const pj = particles[j];
        const dx = pi.x - pj.x;
        const dy = pi.y - pj.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < CFG.maxDist * CFG.maxDist) {
          const t = 1 - Math.sqrt(d2) / CFG.maxDist;
          ctx.beginPath();
          ctx.moveTo(pi.x, pi.y);
          ctx.lineTo(pj.x, pj.y);
          ctx.strokeStyle = `rgba(26, 107, 255, ${t * 0.32})`;
          ctx.lineWidth   = CFG.lineWidth;
          ctx.stroke();
        }
      }

      // Particle → mouse
      const mdx = pi.x - mouse.x;
      const mdy = pi.y - mouse.y;
      const md2 = mdx * mdx + mdy * mdy;
      const mr2 = CFG.mouseRange * CFG.mouseRange;
      if (md2 < mr2) {
        const t = 1 - Math.sqrt(md2) / CFG.mouseRange;
        ctx.beginPath();
        ctx.moveTo(pi.x, pi.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = `rgba(0, 170, 255, ${t * 0.6})`;
        ctx.lineWidth   = CFG.lineWidth * 1.3;
        ctx.stroke();
      }
    }

    // Mouse dot
    if (mouse.x > -100) {
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 170, 255, 0.55)';
      ctx.fill();
    }
  }

  /* ── Loop ── */
  function loop() {
    ctx.clearRect(0, 0, W, H);
    drawConnections();
    particles.forEach(p => { p.update(); p.draw(); });
    raf = requestAnimationFrame(loop);
  }

  /* ── Resize ── */
  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  /* ── Init ── */
  function init() {
    resize();
    particles = Array.from({ length: CFG.count }, () => new Particle());
    if (raf) cancelAnimationFrame(raf);
    loop();
  }

  const hero = document.getElementById('hero');
  hero.addEventListener('mousemove', e => {
    const r  = canvas.getBoundingClientRect();
    mouse.x  = e.clientX - r.left;
    mouse.y  = e.clientY - r.top;
  });
  hero.addEventListener('mouseleave', () => {
    mouse.x = -9999;
    mouse.y = -9999;
  });

  // Touch support
  hero.addEventListener('touchmove', e => {
    const r  = canvas.getBoundingClientRect();
    const t  = e.touches[0];
    mouse.x  = t.clientX - r.left;
    mouse.y  = t.clientY - r.top;
  }, { passive: true });

  window.addEventListener('resize', () => {
    resize();
    particles.forEach(p => p.reset(true));
  });

  // Pause when tab is hidden to save resources
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(raf);
    } else {
      loop();
    }
  });

  init();
})();


/* ── Hero Typewriter ───────────────────────────────────────── */
(function initTypewriter() {
  const el = document.getElementById('hero-sub');
  if (!el) return;

  const phrases = [
    'Connecting systems.',
    'Building teams.',
    'Shipping things that matter.',
  ];

  let pi = 0, ci = 0, deleting = false;
  const TYPE_SPEED   = 55;
  const DELETE_SPEED = 30;
  const PAUSE_END    = 1800;
  const PAUSE_START  = 400;

  function tick() {
    const phrase = phrases[pi];
    if (!deleting) {
      el.textContent = phrase.slice(0, ++ci);
      if (ci === phrase.length) {
        deleting = true;
        setTimeout(tick, PAUSE_END);
        return;
      }
      setTimeout(tick, TYPE_SPEED);
    } else {
      el.textContent = phrase.slice(0, --ci);
      if (ci === 0) {
        deleting = false;
        pi = (pi + 1) % phrases.length;
        setTimeout(tick, PAUSE_START);
        return;
      }
      setTimeout(tick, DELETE_SPEED);
    }
  }

  // Start after hero animation completes
  setTimeout(tick, 1100);
})();


/* ── Navigation ────────────────────────────────────────────── */
(function initNav() {
  const nav    = document.getElementById('nav');
  const toggle = document.getElementById('nav-toggle');
  const links  = document.getElementById('nav-links');

  // Scrolled state
  function onScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile toggle
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });

  // Close on link click
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (!nav.contains(e.target)) {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
})();


/* ── Scroll Reveal helper ──────────────────────────────────── */
/* Observes all .reveal elements inside `root`.                  */
/* Called once at the bottom of this file, after all dynamic     */
/* content renderers have finished injecting DOM.                */
function registerReveal(root) {
  const items = root.querySelectorAll('.reveal');
  if (!items.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const siblings = Array.from(entry.target.parentElement.children)
        .filter(el => el.classList.contains('reveal'));
      const idx = siblings.indexOf(entry.target);

      setTimeout(() => entry.target.classList.add('visible'), Math.min(idx * 90, 400));
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  items.forEach(el => obs.observe(el));
}


/* ── Dynamic stats (career years + courses count) ──────────── */
(function initDynamicStats() {
  // Career start: October 2013 (Deloitte)
  const CAREER_START = new Date(2013, 9, 1);
  const years = Math.floor(
    (Date.now() - CAREER_START.getTime()) / (365.25 * 24 * 3600 * 1000)
  );
  const careerEl = document.querySelector('[data-dynamic="career-years"]');
  if (careerEl) careerEl.dataset.target = years;

  // Courses count — driven by COURSES array in courses-data.js
  if (typeof COURSES !== 'undefined') {
    const coursesEl = document.querySelector('[data-dynamic="courses-count"]');
    if (coursesEl) coursesEl.dataset.target = COURSES.length;

    const certsCountEl = document.getElementById('certs-count');
    if (certsCountEl) certsCountEl.textContent = COURSES.length + ' courses';
  }
})();


/* ── Main page: render latest cert cards from COURSES data ─── */
(function renderMainPageCerts() {
  if (typeof COURSES === 'undefined') return;
  const grid = document.getElementById('certs-grid');
  if (!grid) return;

  const SHOW = 2; // number of courses shown on the main page
  const latest  = COURSES.slice(0, SHOW);
  const moreCount = COURSES.length - SHOW;

  // SVG icon for external link
  const extIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
    stroke-linecap="round" stroke-linejoin="round" style="width:11px;height:11px;flex-shrink:0">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
    <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
  </svg>`;

  latest.forEach((course, i) => {
    const card = document.createElement('div');
    card.className = 'cert-card reveal' + (i === 0 ? ' cert-card--latest' : '');
    card.innerHTML = (i === 0 ? `<div class="cert-latest-badge">Latest</div>` : '')
      + `<div class="cert-issuer">${course.platform}</div>`
      + `<div class="cert-name">${course.name}</div>`
      + `<div class="cert-date">${course.date}</div>`
      + `<a href="${getCertUrl(course)}" target="_blank" rel="noopener" class="cert-cert-link">`
      + extIcon + ` View certificate</a>`;
    grid.appendChild(card);
  });

  // "More" card
  const more = document.createElement('div');
  more.className = 'cert-card cert-card--more reveal';
  more.innerHTML = `<div class="cert-more-num">${moreCount}+</div>`
    + `<div class="cert-more-label">more courses</div>`
    + `<a href="courses.html" class="cert-more-link">View all courses →</a>`;
  grid.appendChild(more);
})();


/* ── Counter Animation ─────────────────────────────────────── */
(function initCounters() {
  const els = document.querySelectorAll('.stat-num[data-target]');
  if (!els.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el     = entry.target;
      const target = +el.dataset.target;
      const suffix = el.dataset.suffix || '';
      const dur    = 1200;
      const start  = performance.now();

      function step(now) {
        const t   = Math.min((now - start) / dur, 1);
        const val = Math.floor(easeOut(t) * target);
        el.textContent = val + (t >= 1 ? suffix : '');
        if (t < 1) requestAnimationFrame(step);
      }

      requestAnimationFrame(step);
      obs.unobserve(el);
    });
  }, { threshold: 0.6 });

  els.forEach(el => obs.observe(el));

  function easeOut(t) {
    return 1 - Math.pow(1 - t, 3);
  }
})();


/* ── Experience: render timeline from EXPERIENCE data ─────── */
(function renderExperience() {
  if (typeof EXPERIENCE === 'undefined') return;
  const timeline = document.getElementById('timeline');
  if (!timeline) return;

  EXPERIENCE.forEach(entry => {
    const item = document.createElement('div');
    item.className = 'tl-item reveal';
    item.innerHTML =
      `<div class="tl-dot${entry.dim ? ' tl-dot--dim' : ''}"></div>`
      + `<div class="tl-meta">`
      + `<span class="tl-year">${entry.years}</span>`
      + `<span class="tl-loc">${entry.location}</span>`
      + `</div>`
      + `<div class="tl-body">`
      + `<div class="tl-company">${entry.company}</div>`
      + `<div class="tl-role">${entry.role}</div>`
      + `<p class="tl-desc">${entry.description}</p>`
      + `<div class="tl-chips">${entry.chips.map(c => `<span>${c}</span>`).join('')}</div>`
      + `</div>`;
    timeline.appendChild(item);
  });
})();



/* ── Posts: render writing section from POSTS data ─────────── */
(function renderPosts() {
  if (typeof POSTS === 'undefined') return;
  const container = document.getElementById('posts-container');
  if (!container) return;

  if (!POSTS.length) {
    container.innerHTML =
      `<div class="posts-empty reveal">`
      + `<div class="posts-empty-icon">✦</div>`
      + `<p class="posts-empty-title">Nothing here yet.</p>`
      + `<p class="posts-empty-sub">Writing is coming. Follow on LinkedIn to be the first to know.</p>`
      + `<a href="https://www.linkedin.com/in/carlos-carvalhal/" target="_blank" rel="noopener" class="btn-ghost">Follow on LinkedIn</a>`
      + `</div>`;
    return;
  }

  const SHOW      = 2; // posts shown on the main page
  const latest    = POSTS.slice(0, SHOW);
  const moreCount = POSTS.length - SHOW;

  const grid = document.createElement('div');
  grid.className = 'posts-grid';

  latest.forEach((post, i) => {
    const slug = 'post-' + post.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    const article = document.createElement('article');
    article.className = 'post-card reveal' + (i === 0 ? ' post-card--latest' : '');
    article.id = slug;
    article.innerHTML =
      (i === 0 ? `<div class="post-latest-badge">Latest</div>` : '')
      + `<div class="post-meta">`
      + `<span class="post-date">${post.date}</span>`
      + `<span class="post-tag">${post.tag}</span>`
      + `</div>`
      + `<h3 class="post-title">${post.title}</h3>`
      + `<p class="post-excerpt">${post.excerpt}</p>`
      + `<a href="posts.html#${slug}" class="post-link">Read →</a>`;
    grid.appendChild(article);
  });

  // "View all" card — only if posts beyond SHOW exist
  if (moreCount > 0) {
    const more = document.createElement('div');
    more.className = 'post-card post-card--more reveal';
    more.innerHTML =
      `<div class="post-more-num">${moreCount}</div>`
      + `<div class="post-more-label">more post${moreCount !== 1 ? 's' : ''}</div>`
      + `<a href="posts.html" class="post-more-link">View all posts →</a>`;
    grid.appendChild(more);
  }

  container.appendChild(grid);
})();


/* ── Konami Code Easter Egg ────────────────────────────────── */
(function initKonami() {
  const CODE    = [38,38,40,40,37,39,37,39,66,65]; // ↑↑↓↓←→←→BA
  let   seq     = [];

  // Build overlay
  const overlay = document.createElement('div');
  overlay.id    = 'konami-overlay';
  overlay.innerHTML = `
    <h3>// ASAP — 2012</h3>
    <p>
      Before the career, there was research. In 2012, Carlos co-authored
      <em>ASAP: An Automated System for Scientific Literature Search in PubMed Using Web Agents</em>,
      published by Springer Berlin Heidelberg in Advances in Intelligent and Soft Computing.
      The system built web agents to automatically crawl PubMed and deliver relevant results to researchers weekly.
      The career in integrations started earlier than it might seem.
    </p>
    <button id="konami-close">Close</button>
  `;
  document.body.appendChild(overlay);

  document.getElementById('konami-close').addEventListener('click', () => {
    overlay.classList.remove('show');
  });
  overlay.addEventListener('click', e => {
    if (e.target === overlay) overlay.classList.remove('show');
  });

  document.addEventListener('keydown', e => {
    seq.push(e.keyCode);
    if (seq.length > CODE.length) seq.shift();
    if (seq.join(',') === CODE.join(',')) {
      seq = [];
      overlay.classList.add('show');
      const hint = document.getElementById('footer-konami');
      if (hint) hint.classList.add('active');
    }
  });
})();


/* ── Activate scroll reveal for all content ────────────────── */
/* Runs after every renderer above has finished injecting DOM.   */
registerReveal(document);
