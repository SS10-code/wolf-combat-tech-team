/* Wolf Tech Combat Team · script.js */
(function () {
  "use strict";
  const D = SITE_DATA;

  /* ── helpers ──────────────────────────────────────────────────────────────── */
  function el(tag, cls, html) {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html !== undefined) n.innerHTML = html;
    return n;
  }
  function a(href, cls, html, attrs) {
    const n = el("a", cls, html);
    n.href = href;
    if (attrs) for (const [k,v] of Object.entries(attrs)) n.setAttribute(k,v);
    return n;
  }
  function append(parent, ...kids) { kids.flat().forEach(k => k && parent.appendChild(k)); return parent; }
  function initials(name) { return (name||"").split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase(); }
  function statusBadge(s) {
    const map = { active:"badge--active", retired:"badge--retired", "in build":"badge--build" };
    return `<span class="badge ${map[(s||"").toLowerCase()]||"badge--active"}">${s}</span>`;
  }
  function sawSVG(small) {
    const r = small ? 0.6 : 1;
    const cx = 200, cy = 200;
    const teeth = Array.from({length:36},(_,i)=>`<polygon points="200,10 191,36 209,36" transform="rotate(${i*10},200,200)" opacity="0.9"/>`).join("");
    return `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="bG2"><stop offset="0%" stop-color="#1877D2" stop-opacity=".18"/><stop offset="100%" stop-color="#0055A4" stop-opacity=".04"/></radialGradient>
        <radialGradient id="cG2"><stop offset="0%" stop-color="#5BB0FF"/><stop offset="100%" stop-color="#0055A4"/></radialGradient>
        <filter id="g2"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      <circle cx="200" cy="200" r="190" fill="url(#bG2)"/>
      <g filter="url(#g2)" stroke="#1877D2" stroke-width="1.4" fill="#090C14">${teeth}</g>
      <circle cx="200" cy="200" r="162" fill="#070A10" stroke="#1877D2" stroke-width="1.5"/>
      <circle cx="200" cy="200" r="148" fill="none" stroke="rgba(58,158,255,.18)" stroke-width="1"/>
      <circle cx="200" cy="200" r="78"  fill="none" stroke="rgba(58,158,255,.22)" stroke-width="1.2"/>
      <circle cx="200" cy="200" r="46"  fill="#090C14" stroke="rgba(58,158,255,.3)" stroke-width="1.4"/>
      <g stroke="rgba(58,158,255,.25)" stroke-width="1.5" fill="none">
        <line x1="200" y1="50" x2="200" y2="350"/>
        <line x1="200" y1="50" x2="200" y2="350" transform="rotate(60,200,200)"/>
        <line x1="200" y1="50" x2="200" y2="350" transform="rotate(120,200,200)"/>
      </g>
      <g stroke="rgba(58,158,255,.55)" stroke-width="4" stroke-linecap="round" fill="none" filter="url(#g2)">
        <line x1="200" y1="78" x2="200" y2="152"/>
        <line x1="200" y1="248" x2="200" y2="322"/>
        <line x1="200" y1="78" x2="200" y2="152" transform="rotate(60,200,200)"/>
        <line x1="200" y1="248" x2="200" y2="322" transform="rotate(60,200,200)"/>
        <line x1="200" y1="78" x2="200" y2="152" transform="rotate(120,200,200)"/>
        <line x1="200" y1="248" x2="200" y2="322" transform="rotate(120,200,200)"/>
      </g>
      <circle cx="200" cy="200" r="18" fill="#080A0E" stroke="#3A9EFF" stroke-width="2" filter="url(#g2)"/>
      <circle cx="200" cy="200" r="9"  fill="url(#cG2)"/>
      <g stroke="rgba(58,158,255,.7)" stroke-width="3" stroke-linecap="round" filter="url(#g2)">
        <line x1="200" y1="36" x2="200" y2="18"/>
        <line x1="200" y1="36" x2="200" y2="18" transform="rotate(72,200,200)"/>
        <line x1="200" y1="36" x2="200" y2="18" transform="rotate(144,200,200)"/>
        <line x1="200" y1="36" x2="200" y2="18" transform="rotate(216,200,200)"/>
        <line x1="200" y1="36" x2="200" y2="18" transform="rotate(288,200,200)"/>
      </g>
    </svg>`;
  }

  /* ── NAV ──────────────────────────────────────────────────────────────────── */
  function buildNav() {
    const links = document.getElementById("navLinks");
    const mob   = document.getElementById("navMobile");
    D.nav.links.forEach(l => {
      links.appendChild(a(l.href, null, l.label));
      mob.appendChild(a(l.href, null, l.label));
    });
    const toggle = document.getElementById("navToggle");
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      mob.classList.toggle("is-open", !open);
    });
    mob.querySelectorAll("a").forEach(lnk => lnk.addEventListener("click", () => {
      toggle.setAttribute("aria-expanded","false"); mob.classList.remove("is-open");
    }));
  }

  /* ── HERO ─────────────────────────────────────────────────────────────────── */
  function buildHero() {
    const h = D.hero;
    const words = h.headline.split(" ");
    const mid = Math.ceil(words.length / 2);
    const wrap = document.getElementById("heroContent");
    wrap.innerHTML = `
      <p class="hero__eyebrow rv">${h.eyebrow}</p>
      <h1 class="hero__headline rv rv-d1">${words.slice(0,mid).join(" ")}<em>${words.slice(mid).join(" ")}</em></h1>
      <p class="hero__sub rv rv-d2">${h.sub}</p>
      <div class="hero__ctas rv rv-d3">
        ${h.cta.map(c=>`<a href="${c.href}" class="btn btn--${c.style==="primary"?"p":"s"}">${c.label}</a>`).join("")}
      </div>`;
  }

  /* ── ABOUT ────────────────────────────────────────────────────────────────── */
  function buildAbout() {
    const ab = D.about;
    const specs = [
      ["Founded",     "2024"],
      ["Location",    "Frisco, TX"],
      ["Schools",     "3+ Frisco high schools"],
      ["Weight class","1lb Antweight"],
      ["Design",      "100% student-built"],
    ];
    document.getElementById("aboutContent").innerHTML = `
      <div class="about-grid">
        <div class="rv rv-l">
          <p class="lbl">About us</p>
          <h2 class="sh">${ab.heading}</h2>
          <p class="about-body">${ab.body}</p>
        </div>
        <div class="spec-table rv rv-r rv-d1">
          ${specs.map(([k,v])=>`<div class="spec-row"><div class="spec-k">${k}</div><div class="spec-v">${v}</div></div>`).join("")}
        </div>
      </div>`;
  }

  /* ── BOTS ─────────────────────────────────────────────────────────────────── */
  function buildBots() {
    const b = D.bots;
    const wrap = document.getElementById("botsContent");
    let html = `<p class="lbl rv">The machines</p><h2 class="sh rv rv-d1">${b.heading}</h2>`;

    const [featured, ...rest] = b.list;
    if (featured) {
      const specRows = [
        ["Weapon",   featured.weapon],
        ["Material", featured.material],
        ["Class",    featured.weightClass],
      ].map(([k,v])=>`<div class="bot-spec-row"><span class="bot-spec-k">${k}</span><span class="bot-spec-v">${v}</span></div>`).join("");

      html += `<div class="bot-featured rv">
        <div class="bot-featured__visual">
          <div class="bot-featured__svg">${sawSVG()}</div>
          ${statusBadge(featured.status).replace("badge","badge bot-featured__badge")}
        </div>
        <div class="bot-featured__info">
          <div class="bot-featured__name">${featured.name}</div>
          <div class="bot-featured__class">${featured.weightClass}</div>
          <div class="bot-featured__specs">${specRows}</div>
          <p class="bot-featured__notes">${featured.notes}</p>
        </div>
      </div>`;
    }

    if (rest.length) {
      html += `<div class="bots-grid">` +
        rest.map((bot,i)=>`
          <div class="bot-card rv rv-d${(i%3)+1}">
            <div class="bot-card__name">${bot.name}</div>
            <div class="bot-card__class">${bot.weightClass}</div>
            ${statusBadge(bot.status)}
            <p class="bot-card__notes">${bot.notes}</p>
          </div>`).join("") +
        `</div>`;
    }

    wrap.innerHTML = html;
  }

  /* ── TEAM ─────────────────────────────────────────────────────────────────── */
  function buildTeam() {
    const t = D.team;
    const wrap = document.getElementById("teamContent");

    function cardHTML(m, lead) {
      return `<div class="member-card${lead?" member-card--lead":""} rv rv-d${lead?1:2}">
        <div class="member-card__avatar">${initials(m.name)}</div>
        <div class="member-card__name">${m.name}</div>
        <div class="member-card__role">${m.role}</div>
        <p class="member-card__bio">${m.bio}</p>
      </div>`;
    }

    // Co-captains (first two members that have "captain" in role, otherwise first two)
    const leads = t.members.filter(m => m.role.toLowerCase().includes("captain")).slice(0,2);
    const rest  = t.members.filter(m => !leads.includes(m));

    wrap.innerHTML = `
      <p class="lbl rv">The crew</p>
      <h2 class="sh rv rv-d1">${t.heading}</h2>
      <p class="si rv rv-d2">${t.intro}</p>
      ${leads.length ? `<div class="team-leads">${leads.map(m=>cardHTML(m,true)).join("")}</div>` : ""}
      <div class="team-rest">${rest.map(m=>cardHTML(m,false)).join("")}</div>`;
  }

  /* ── SPONSORS ─────────────────────────────────────────────────────────────── */
  function buildSponsors() {
    const s = D.sponsors;
    const wrap = document.getElementById("sponsorsContent");
    const cards = s.list.map((sp,i) => `
      <a href="${sp.url}" target="_blank" rel="noopener noreferrer"
         class="sponsor-card rv rv-d${(i%3)+1}">
        <img src="${sp.logo}" alt="${sp.name}" />
        <span class="sponsor-card__name">${sp.name}</span>
        <span class="sponsor-card__tier tier--${(sp.tier||"gold").toLowerCase()}">${sp.tier}</span>
      </a>`).join("");
    wrap.innerHTML = `
      <p class="lbl rv">Partners</p>
      <h2 class="sh rv rv-d1">${s.heading}</h2>
      <p class="si rv rv-d2">${s.intro}</p>
      <div class="sponsors-grid">${cards}</div>`;
  }

  /* ── DONATE ───────────────────────────────────────────────────────────────── */
  function buildDonate() {
    const d = D.donate;
    document.getElementById("donateContent").innerHTML = `
      <div class="donate-grid">
        <div class="donate-text rv rv-l">
          <p class="lbl">Support Wolf Tech</p>
          <h2 class="sh">${d.heading}</h2>
          <p class="donate-body">${d.body}</p>
          <p class="donate-note">${d.note}</p>
        </div>
        <div class="donate-box rv rv-r rv-d1">
          <div class="donate-box__head">Make a Difference</div>
          <p class="donate-box__body">Every dollar goes directly toward robot parts, machining materials, and competition fees. Wolf Tech is fiscally sponsored by HCB — your donation is 501(c)(3) tax-deductible.</p>
          <a href="https://hcb.hackclub.com/wolf-tech-combat-team" target="_blank" rel="noopener noreferrer"
             class="hcb-badge" aria-label="Fiscally sponsored by HCB">
            <img src="https://hcb.hackclub.com/badge.svg" alt="Fiscally Sponsored by HCB" height="44" />
          </a>
          <a href="${d.hcbLink}" class="btn btn--w" target="_blank" rel="noopener noreferrer">${d.cta}</a>
        </div>
      </div>`;
  }

  /* ── FOOTER ───────────────────────────────────────────────────────────────── */
  function buildFooter() {
    const f = D.footer;
    document.getElementById("footerContent").innerHTML = `
      <div class="footer__brand">
        <img src="logo.png" alt="" />
        <span class="footer__brand-name">Wolf Tech Combat Team</span>
      </div>
      <div class="footer__right">
        <span class="footer__copy">© 2024 Wolf Tech Combat Team · Frisco, TX</span>
        <span class="footer__link"><a href="mailto:${f.contact}">${f.contact}</a></span>
        <span class="footer__link"><a href="${f.social.href}" target="_blank" rel="noopener noreferrer">${f.social.label}</a></span>
      </div>`;
  }

  /* ── SCROLL PROGRESS ──────────────────────────────────────────────────────── */
  function initProgress() {
    const fill = document.getElementById("progressFill");
    window.addEventListener("scroll", () => {
      const t = document.documentElement.scrollHeight - window.innerHeight;
      fill.style.width = (t > 0 ? (window.scrollY / t) * 100 : 0) + "%";
    }, { passive: true });
  }

  /* ── SCROLL SPY ───────────────────────────────────────────────────────────── */
  function initScrollSpy() {
    const navLinks = document.querySelectorAll(".nav__links a");
    const ids = D.nav.links.map(l => l.href.replace("#",""));
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting)
          navLinks.forEach(a => a.classList.toggle("is-active", a.getAttribute("href") === "#" + e.target.id));
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    ids.forEach(id => { const s = document.getElementById(id); if(s) obs.observe(s); });
  }

  /* ── REVEAL ───────────────────────────────────────────────────────────────── */
  function initReveal() {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add("on"); obs.unobserve(e.target); } });
    }, { threshold: 0.08 });
    document.querySelectorAll(".rv,.rv-l,.rv-r").forEach(el => obs.observe(el));
  }

  /* ── INIT ─────────────────────────────────────────────────────────────────── */
  function init() {
    buildNav();
    buildHero();
    buildAbout();
    buildBots();
    buildTeam();
    buildSponsors();
    buildDonate();
    buildFooter();
    initProgress();
    initScrollSpy();
    requestAnimationFrame(() => requestAnimationFrame(initReveal));
  }

  document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", init)
    : init();
})();
