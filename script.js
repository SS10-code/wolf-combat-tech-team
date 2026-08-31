/* =============================================================================
   script.js — Reads SITE_DATA from data.js and builds the entire page DOM.
   ============================================================================= */
(function () {
  "use strict";
  const D = SITE_DATA;

  /* ── helpers ─────────────────────────────────────────────────────────────── */
  function el(tag, attrs, ...children) {
    attrs = attrs || {};
    const node = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === "class") node.className = v;
      else if (k === "html") node.innerHTML = v;
      else node.setAttribute(k, v);
    }
    children.flat().forEach(c => {
      if (typeof c === "string") node.appendChild(document.createTextNode(c));
      else if (c) node.appendChild(c);
    });
    return node;
  }

  function statusClass(s) {
    const m = { active: "status--active", retired: "status--retired", "in build": "status--in-build" };
    return m[(s || "").toLowerCase()] || "status--active";
  }

  function initials(name) {
    return (name || "?").split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  }

  /* ── NAV ─────────────────────────────────────────────────────────────────── */
  function buildNav() {
    document.getElementById("brandName").textContent = D.nav.brand;
    const linksEl = document.getElementById("navLinks");
    const mobileEl = document.getElementById("navMobile");
    D.nav.links.forEach(link => {
      linksEl.appendChild(el("a", { href: link.href }, link.label));
      mobileEl.appendChild(el("a", { href: link.href }, link.label));
    });
    const toggle = document.getElementById("navToggle");
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      mobileEl.classList.toggle("is-open", !open);
    });
    mobileEl.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        toggle.setAttribute("aria-expanded", "false");
        mobileEl.classList.remove("is-open");
      });
    });
  }

  /* ── HERO ─────────────────────────────────────────────────────────────────── */
  function buildHero() {
    const h = D.hero;
    const words = h.headline.split(" ");
    const mid = Math.ceil(words.length / 2);
    const line1 = words.slice(0, mid).join(" ");
    const line2 = words.slice(mid).join(" ");

    const text = document.getElementById("heroContent");
    text.appendChild(el("p", { class: "hero__eyebrow reveal" }, h.eyebrow));
    text.appendChild(el("h1", {
      class: "hero__headline reveal reveal--delay-1",
      html: `${line1}<em>${line2}</em>`
    }));
    text.appendChild(el("p", { class: "hero__sub reveal reveal--delay-2" }, h.sub));
    const ctas = el("div", { class: "hero__ctas reveal reveal--delay-3" },
      ...h.cta.map(c => el("a", { href: c.href, class: `btn btn--${c.style}` }, c.label))
    );
    text.appendChild(ctas);
  }

  /* ── ABOUT ───────────────────────────────────────────────────────────────── */
  function buildAbout() {
    const a = D.about;
    const wrap = document.getElementById("aboutContent");

    // Left: text
    const textCol = el("div", { class: "about-text" });
    textCol.appendChild(el("p", { class: "section-label reveal" }, "About us"));
    textCol.appendChild(el("h2", { class: "section-heading reveal reveal--delay-1" }, a.heading));
    textCol.appendChild(el("p", { class: "about-body reveal reveal--delay-2" }, a.body));

    // Right: specs table
    const specsCol = el("div", { class: "about-specs reveal reveal--right reveal--delay-1" });
    const specs = [
      ["Founded", "2024"],
      ["Location", "Frisco, Texas"],
      ["Weight Class", "1 lb Antweight"],
      ["Design", "100% Student-built"],
      ["Competition", "Texas Robot Combat"],
    ];
    specs.forEach(([key, val]) => {
      specsCol.appendChild(
        el("div", { class: "about-spec-row" },
          el("div", { class: "about-spec-key" }, key),
          el("div", { class: "about-spec-val" }, val)
        )
      );
    });

    wrap.appendChild(textCol);
    wrap.appendChild(specsCol);
  }

  /* ── BOTS ─────────────────────────────────────────────────────────────────── */
  function buildBots() {
    const b = D.bots;
    const wrap = document.getElementById("botsContent");
    wrap.appendChild(el("p", { class: "section-label reveal" }, "Robots"));
    wrap.appendChild(el("h2", { class: "section-heading reveal reveal--delay-1" }, b.heading));
    wrap.appendChild(el("p", { class: "section-intro reveal reveal--delay-2" }, b.intro));

    const grid = el("div", { class: "bots-grid" });
    b.list.forEach((bot, i) => {
      const delay = (i % 3) + 1;
      grid.appendChild(
        el("div", { class: `bot-card reveal reveal--delay-${delay}` },
          el("div", { class: "bot-card__name" }, bot.name),
          el("div", { class: "bot-card__class" }, bot.weightClass),
          el("span", { class: `bot-card__status ${statusClass(bot.status)}` }, bot.status),
          el("div", { class: "bot-card__specs" },
            el("div", { class: "spec-row" },
              el("span", { class: "spec-key" }, "Weapon"),
              el("span", { class: "spec-val" }, bot.weapon)
            ),
            el("div", { class: "spec-row" },
              el("span", { class: "spec-key" }, "Material"),
              el("span", { class: "spec-val" }, bot.material)
            )
          ),
          el("p", { class: "bot-card__notes" }, bot.notes)
        )
      );
    });
    wrap.appendChild(grid);
  }

  /* ── TEAM ─────────────────────────────────────────────────────────────────── */
  function buildTeam() {
    const t = D.team;
    const wrap = document.getElementById("teamContent");
    wrap.appendChild(el("p", { class: "section-label reveal" }, "The crew"));
    wrap.appendChild(el("h2", { class: "section-heading reveal reveal--delay-1" }, t.heading));
    wrap.appendChild(el("p", { class: "section-intro reveal reveal--delay-2" }, t.intro));

    const grid = el("div", { class: "team-grid" });
    t.members.forEach((m, i) => {
      const delay = (i % 3) + 1;
      grid.appendChild(
        el("div", { class: `member-card reveal reveal--delay-${delay}` },
          el("div", { class: "member-card__avatar" }, initials(m.name)),
          el("div", { class: "member-card__name" }, m.name),
          el("div", { class: "member-card__role" }, m.role),
          el("p", { class: "member-card__bio" }, m.bio)
        )
      );
    });
    wrap.appendChild(grid);
  }

  /* ── SPONSORS ─────────────────────────────────────────────────────────────── */
  function buildSponsors() {
    const s = D.sponsors;
    const wrap = document.getElementById("sponsorsContent");
    wrap.appendChild(el("p", { class: "section-label reveal" }, "Partners"));
    wrap.appendChild(el("h2", { class: "section-heading reveal reveal--delay-1" }, s.heading));
    wrap.appendChild(el("p", { class: "section-intro reveal reveal--delay-2" }, s.intro));

    const grid = el("div", { class: "sponsors-grid" });
    s.list.forEach((sp, i) => {
      const delay = (i % 3) + 1;
      grid.appendChild(
        el("a", {
          href: sp.url, target: "_blank", rel: "noopener noreferrer",
          class: `sponsor-card reveal reveal--delay-${delay}`
        },
          el("img", { src: sp.logo, alt: sp.name }),
          el("span", { class: "sponsor-card__name" }, sp.name),
          el("span", { class: `sponsor-card__tier tier--${(sp.tier || "gold").toLowerCase()}` }, sp.tier)
        )
      );
    });
    wrap.appendChild(grid);
  }

  /* ── DONATE ───────────────────────────────────────────────────────────────── */
  function buildDonate() {
    const d = D.donate;
    const wrap = document.getElementById("donateContent");
    const layout = el("div", { class: "donate-layout" });

    const textCol = el("div", { class: "donate-text" });
    textCol.appendChild(el("p", { class: "section-label reveal" }, "Support us"));
    textCol.appendChild(el("h2", { class: "section-heading reveal reveal--delay-1" }, d.heading));
    textCol.appendChild(el("p", { class: "donate-body reveal reveal--delay-2" }, d.body));
    textCol.appendChild(el("p", { class: "donate-note reveal reveal--delay-3" }, d.note));

    const box = el("div", { class: "donate-box reveal reveal--right reveal--delay-1" });
    box.appendChild(el("div", { class: "donate-box__heading" }, "Make a difference"));
    box.appendChild(el("p", { class: "donate-box__body" }, "Every dollar goes directly toward robot parts, machining materials, and competition fees. Fiscally sponsored by HCB — 501(c)(3) tax-deductible."));
    box.appendChild(el("a", {
      href: d.hcbLink, class: "btn btn--donate",
      target: "_blank", rel: "noopener noreferrer"
    }, d.cta));

    layout.appendChild(textCol);
    layout.appendChild(box);
    wrap.appendChild(layout);
  }

  /* ── MISSION ──────────────────────────────────────────────────────────────── */
  function buildMission() {
    const m = D.mission;
    const wrap = document.getElementById("missionContent");
    const layout = el("div", { class: "mission-layout" });

    const quoteCol = el("div", { class: "mission-quote-block reveal reveal--left" });
    quoteCol.appendChild(el("p", { class: "section-label" }, "Why we build"));
    quoteCol.appendChild(el("blockquote", { class: "mission-quote" }, m.quote));
    quoteCol.appendChild(el("p", { class: "mission-body" }, m.body));

    const valuesCol = el("div", { class: "mission-values reveal reveal--right reveal--delay-1" });
    const values = [
      { icon: "⚙️", title: "Real Engineering", desc: "Every component designed and fabricated by students." },
      { icon: "🧠", title: "Systems Thinking", desc: "Structural integrity, power budgets, weapon kinetics — all at once." },
      { icon: "🏆", title: "Arena-Tested", desc: "We compete at Texas Robot Combat events and iterate on what breaks." },
    ];
    values.forEach(v => {
      valuesCol.appendChild(
        el("div", { class: "mission-value" },
          el("div", { class: "mission-value__icon" }, v.icon),
          el("div", { class: "mission-value__content" },
            el("div", { class: "mission-value__title" }, v.title),
            el("div", { class: "mission-value__desc" }, v.desc)
          )
        )
      );
    });

    layout.appendChild(quoteCol);
    layout.appendChild(valuesCol);
    wrap.appendChild(layout);
  }

  /* ── FOOTER ───────────────────────────────────────────────────────────────── */
  function buildFooter() {
    const f = D.footer;
    const wrap = document.getElementById("footerContent");
    wrap.appendChild(
      el("div", { class: "footer__brand" },
        el("img", { src: "logo.png", alt: "" }),
        el("span", { class: "footer__brand-name" }, D.nav.brand)
      )
    );
    wrap.appendChild(
      el("div", { class: "footer__meta" },
        el("span", { class: "footer__copy" }, f.copy),
        el("span", { class: "footer__link" }, el("a", { href: `mailto:${f.contact}` }, f.contact)),
        el("span", { class: "footer__link" }, el("a", { href: f.social.href, target: "_blank", rel: "noopener noreferrer" }, f.social.label))
      )
    );
  }

  /* ── SCROLL PROGRESS ─────────────────────────────────────────────────────── */
  function initProgress() {
    const fill = document.getElementById("progressFill");
    window.addEventListener("scroll", () => {
      const scrolled = document.documentElement.scrollTop;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      fill.style.width = (total > 0 ? (scrolled / total) * 100 : 0) + "%";
    }, { passive: true });
  }

  /* ── SCROLL SPY ───────────────────────────────────────────────────────────── */
  function initScrollSpy() {
    const navLinks = document.querySelectorAll(".nav__links a");
    const sections = D.nav.links
      .map(l => document.getElementById(l.href.replace("#", "")))
      .filter(Boolean);
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(a => {
            a.classList.toggle("is-active", a.getAttribute("href") === "#" + entry.target.id);
          });
        }
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    sections.forEach(s => obs.observe(s));
  }

  /* ── REVEAL ON SCROLL ─────────────────────────────────────────────────────── */
  function initReveal() {
    const els = document.querySelectorAll(".reveal, .reveal--left, .reveal--right");
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add("is-visible"); obs.unobserve(e.target); }
      });
    }, { threshold: 0.1 });
    els.forEach(e => obs.observe(e));
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
    buildMission();
    buildFooter();
    initProgress();
    initScrollSpy();
    requestAnimationFrame(() => requestAnimationFrame(initReveal));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
