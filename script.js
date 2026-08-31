/* =============================================================================
   script.js — Reads SITE_DATA from data.js and builds the entire page DOM.
   Do NOT edit copy here — edit data.js instead.
   ============================================================================= */

(function () {
  "use strict";

  const D = SITE_DATA;

  /* ── helpers ─────────────────────────────────────────────────────────────── */
  function el(tag, attrs = {}, ...children) {
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
    const m = { "active": "status--active", "retired": "status--retired", "in build": "status--in-build" };
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
      const a = el("a", { href: link.href }, link.label);
      linksEl.appendChild(a);
      mobileEl.appendChild(el("a", { href: link.href }, link.label));
    });

    // Mobile toggle
    const toggle = document.getElementById("navToggle");
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      mobileEl.classList.toggle("is-open", !open);
    });

    // Close mobile on link click
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

    const ctas = el("div", { class: "hero__ctas" },
      ...h.cta.map(c =>
        el("a", { href: c.href, class: `btn btn--${c.style}` }, c.label)
      )
    );

    const inner = document.getElementById("heroContent");
    inner.appendChild(el("p", { class: "hero__eyebrow reveal" }, h.eyebrow));
    inner.appendChild(el("h1", { class: "hero__headline reveal reveal--delay-1",
      html: `${line1}<span>${line2}</span>` }));
    inner.appendChild(el("p", { class: "hero__sub reveal reveal--delay-2" }, h.sub));
    inner.appendChild(ctas);
    ctas.classList.add("reveal", "reveal--delay-3");
  }

  /* ── ABOUT ───────────────────────────────────────────────────────────────── */
  function buildAbout() {
    const a = D.about;
    const wrap = document.getElementById("aboutContent");
    wrap.appendChild(el("p", { class: "section-label" }, "About us"));
    wrap.appendChild(el("h2", { class: "section-heading reveal" }, a.heading));
    wrap.appendChild(el("p", { class: "about-body reveal reveal--delay-1" }, a.body));

    const pillars = el("div", { class: "about-pillars" });
    a.pillars.forEach((p, i) => {
      pillars.appendChild(el("div", { class: `pillar reveal reveal--delay-${i + 1}` },
        el("span", { class: "pillar__stat" }, p.stat),
        el("span", { class: "pillar__label" }, p.label)
      ));
    });
    wrap.appendChild(pillars);
  }

  /* ── BOTS ─────────────────────────────────────────────────────────────────── */
  function buildBots() {
    const b = D.bots;
    const wrap = document.getElementById("botsContent");
    wrap.appendChild(el("p", { class: "section-label" }, "Robots"));
    wrap.appendChild(el("h2", { class: "section-heading reveal" }, b.heading));
    wrap.appendChild(el("p", { class: "section-intro reveal reveal--delay-1" }, b.intro));

    const grid = el("div", { class: "bots-grid" });
    b.list.forEach((bot, i) => {
      const delay = (i % 3) + 1;
      const card = el("div", { class: `bot-card reveal reveal--delay-${delay}` },
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
      );
      grid.appendChild(card);
    });
    wrap.appendChild(grid);
  }

  /* ── TEAM ─────────────────────────────────────────────────────────────────── */
  function buildTeam() {
    const t = D.team;
    const wrap = document.getElementById("teamContent");
    wrap.appendChild(el("p", { class: "section-label" }, "The crew"));
    wrap.appendChild(el("h2", { class: "section-heading reveal" }, t.heading));
    wrap.appendChild(el("p", { class: "section-intro reveal reveal--delay-1" }, t.intro));

    const grid = el("div", { class: "team-grid" });
    t.members.forEach((m, i) => {
      const delay = (i % 3) + 1;
      const card = el("div", { class: `member-card reveal reveal--delay-${delay}` },
        el("div", { class: "member-card__avatar" }, initials(m.name)),
        el("div", { class: "member-card__name" }, m.name),
        el("div", { class: "member-card__role" }, m.role),
        el("p", { class: "member-card__bio" }, m.bio)
      );
      grid.appendChild(card);
    });
    wrap.appendChild(grid);
  }

  /* ── DONATE ───────────────────────────────────────────────────────────────── */
  function buildDonate() {
    const d = D.donate;
    const wrap = document.getElementById("donateContent");
    const inner = el("div", { class: "donate-inner" });
    inner.appendChild(el("p", { class: "section-label" }, "Support us"));
    inner.appendChild(el("h2", { class: "section-heading reveal" }, d.heading));
    inner.appendChild(el("p", { class: "donate-body reveal reveal--delay-1" }, d.body));
    inner.appendChild(
      el("a", { href: d.hcbLink, class: "btn btn--donate reveal reveal--delay-2",
        target: "_blank", rel: "noopener noreferrer" }, d.cta)
    );
    inner.appendChild(el("p", { class: "donate-note reveal reveal--delay-3" }, d.note));
    wrap.appendChild(inner);
  }

  /* ── MISSION ──────────────────────────────────────────────────────────────── */
  function buildMission() {
    const m = D.mission;
    const wrap = document.getElementById("missionContent");
    const inner = el("div", { class: "mission-inner" });
    inner.appendChild(el("p", { class: "section-label" }, "Why we build"));
    inner.appendChild(el("h2", { class: "section-heading reveal" }, m.heading));
    inner.appendChild(el("blockquote", { class: "mission-quote reveal reveal--delay-1" }, m.quote));
    inner.appendChild(el("p", { class: "mission-body reveal reveal--delay-2" }, m.body));
    wrap.appendChild(inner);
  }

  /* ── FOOTER ───────────────────────────────────────────────────────────────── */
  function buildFooter() {
    const f = D.footer;
    const wrap = document.getElementById("footerContent");

    const brand = el("div", { class: "footer__brand" },
      el("img", { src: "logo.png", alt: "" }),
      el("span", { class: "footer__brand-name" }, D.nav.brand)
    );

    const meta = el("div", { class: "footer__meta" },
      el("span", { class: "footer__copy" }, f.copy),
      el("span", { class: "footer__link" },
        el("a", { href: `mailto:${f.contact}` }, f.contact)
      ),
      el("span", { class: "footer__link" },
        el("a", { href: f.social.href, target: "_blank", rel: "noopener noreferrer" }, f.social.label)
      )
    );

    wrap.appendChild(brand);
    wrap.appendChild(meta);
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

   /* ── SPONSORS ─────────────────────────────────────────────────────────────── */
function buildSponsors() {
  const s = D.sponsors;
  const wrap = document.getElementById("sponsorsContent");
  wrap.appendChild(el("p", { class: "section-label" }, "Partners"));
  wrap.appendChild(el("h2", { class: "section-heading reveal" }, s.heading));
  wrap.appendChild(el("p", { class: "section-intro reveal reveal--delay-1" }, s.intro));

  const grid = el("div", { class: "sponsors-grid" });
  s.list.forEach((sp, i) => {
    const delay = (i % 3) + 1;
    const card = el("a", {
      href: sp.url, target: "_blank", rel: "noopener noreferrer",
      class: `sponsor-card reveal reveal--delay-${delay}`
    },
      el("img", { src: sp.logo, alt: sp.name }),
      el("span", { class: "sponsor-card__name" }, sp.name),
      el("span", { class: `sponsor-card__tier tier--${(sp.tier || "gold").toLowerCase()}` }, sp.tier)
    );
    grid.appendChild(card);
  });
  wrap.appendChild(grid);
}

  /* ── REVEAL ON SCROLL ─────────────────────────────────────────────────────── */
  function initReveal() {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach(e => obs.observe(e));
  }

  /* ── INIT ─────────────────────────────────────────────────────────────────── */
  function init() {
    buildNav();
    buildHero();
    buildAbout();
    buildBots();
    buildTeam();
    buildDonate();
    buildSponsers();
    buildMission();
    buildFooter();
    initProgress();
    initScrollSpy();

    // Kick reveal after first paint
    requestAnimationFrame(() => {
      requestAnimationFrame(initReveal);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
