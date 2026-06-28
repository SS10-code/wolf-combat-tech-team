/* ============================================================
   WOLF COMBAT TECH TEAM — renderer + interactions
   Reads SITE_DATA (data.js) and builds the page, then wires up
   nav behavior, scroll reveal, scroll-spy, a scroll-progress
   gauge, and a subtle mechanical tilt on the plate/fighter cards.
   ============================================================ */

(function () {
  const d = window.SITE_DATA;
  if (!d) {
    console.error("SITE_DATA not found — make sure data.js loads before script.js");
    return;
  }

  const el = (tag, props = {}, children = []) => {
    const node = document.createElement(tag);
    Object.entries(props).forEach(([key, val]) => {
      if (key === "class") node.className = val;
      else if (key === "html") node.innerHTML = val;
      else if (key.startsWith("aria-") || key === "role") node.setAttribute(key, val);
      else node[key] = val;
    });
    children.forEach((c) => c && node.appendChild(c));
    return node;
  };
  const text = (tag, className, content) => el(tag, { class: className, textContent: content });

  /* ---------------- document meta ---------------- */
  document.title = d.meta.title;

  /* ---------------- NAV ---------------- */
  document.getElementById("brandText").innerHTML =
    `${d.nav.brandName}<span class="brand__sub">${d.nav.brandSub}</span>`;
  document.getElementById("footerBrand").textContent = d.footer.brandName;
  document.getElementById("footerMeta").textContent =
    `© ${d.meta.year} ${d.footer.brandName} · ${d.footer.note}`;

  const navLinks = document.getElementById("navLinks");
  const navMobile = document.getElementById("navMobile");
  d.nav.links.forEach((link) => {
    navLinks.appendChild(el("a", { href: link.href, textContent: link.label, "data-navlink": link.href }));
    navMobile.appendChild(el("a", { href: link.href, textContent: link.label }));
  });
  navLinks.appendChild(el("a", { href: d.nav.cta.href, class: "nav__cta", textContent: d.nav.cta.label }));
  navMobile.appendChild(el("a", { href: d.nav.cta.href, class: "nav__cta", textContent: d.nav.cta.label }));

  /* ---------------- HERO ---------------- */
  const heroEl = document.getElementById("heroContent");
  const titleEl = el("h1", { class: "hero__title reveal-load" });
  d.hero.titleLines.forEach((line, i) => {
    const span = el("span", { class: "hero__line" + (i === d.hero.accentLineIndex ? " accent" : ""), textContent: line });
    titleEl.appendChild(span);
    if (i < d.hero.titleLines.length - 1) titleEl.appendChild(el("br"));
  });

  heroEl.append(
    text("p", "eyebrow reveal-load", d.hero.eyebrow),
    titleEl,
    text("p", "hero__sub reveal-load", d.hero.subtitle),
    el(
      "div",
      { class: "hero__cta reveal-load" },
      d.hero.ctas.map((cta) =>
        el("a", { href: cta.href, class: `btn btn--${cta.variant}`, textContent: cta.label })
      )
    ),
    el(
      "div",
      { class: "specline reveal-load" },
      d.hero.spec.flatMap((s, i) => {
        const span = text("span", "", s);
        return i < d.hero.spec.length - 1 ? [span, text("span", "specline__sep", "→")] : [span];
      })
    )
  );
  // stagger the load-in animation
  heroEl.querySelectorAll(".reveal-load").forEach((node, i) => {
    node.style.animationDelay = `${0.15 + i * 0.12}s`;
  });

  /* ---------------- ABOUT ---------------- */
  const aboutEl = document.getElementById("aboutContent");
  const aboutHead = el("div", { class: "section__head reveal" }, [
    text("p", "eyebrow", d.about.eyebrow),
    el("h2", { class: "h2", innerHTML: d.about.heading.join("<br>") }),
  ]);
  const plates = el(
    "div",
    { class: "plates reveal-group" },
    d.about.cards.map((card) =>
      el("article", { class: "plate" }, [
        el("div", { class: "plate__rivets", "aria-hidden": "true" }, [el("span"), el("span"), el("span"), el("span")]),
        text("p", "plate__tag", card.tag),
        text("h3", "plate__title", card.title),
        text("p", "plate__body", card.body),
      ])
    )
  );
  aboutEl.append(
    aboutHead,
    el("div", { class: "about__grid" }, [text("p", "about__lede reveal", d.about.lede), plates])
  );

  /* ---------------- DIVISIONS ---------------- */
  const divEl = document.getElementById("divisionsContent");
  divEl.append(
    el("div", { class: "section__head reveal" }, [
      text("p", "eyebrow", d.divisions.eyebrow),
      text("h2", "h2", d.divisions.heading),
      text("p", "section__sub", d.divisions.sub),
    ]),
    el(
      "div",
      { class: "fighters reveal-group" },
      d.divisions.fighters.map((f) =>
        el("article", { class: `fighter fighter--${f.variant}` }, [
          el("div", { class: "fighter__top" }, [
            text("span", `fighter__status fighter__status--${f.statusVariant}`, f.status),
            text("span", "fighter__class mono", f.classLabel),
          ]),
          text("h3", "fighter__name", f.name),
          el(
            "dl",
            { class: "fighter__specs mono" },
            f.specs.map((s) => el("div", {}, [text("dt", "", s.label), text("dd", "", s.value)]))
          ),
          text("p", "fighter__desc", f.desc),
        ])
      )
    )
  );

  /* ---------------- PROCESS ---------------- */
  const procEl = document.getElementById("processContent");
  procEl.append(
    el("div", { class: "section__head reveal" }, [
      text("p", "eyebrow", d.process.eyebrow),
      text("h2", "h2", d.process.heading),
    ]),
    el(
      "ol",
      { class: "pipeline reveal-group" },
      d.process.steps.map((step) =>
        el("li", { class: "pipeline__step" + (step.loop ? " pipeline__step--loop" : "") }, [
          text("span", "pipeline__num mono", step.num),
          text("h3", "", step.title),
          text("p", "", step.body),
        ])
      )
    )
  );

  /* ---------------- MISSION ---------------- */
  const missionEl = document.getElementById("missionContent");
  missionEl.append(
    el("div", { class: "section__head reveal" }, [
      text("p", "eyebrow", d.mission.eyebrow),
      text("h2", "h2", d.mission.heading),
    ]),
    text("p", "mission__lede reveal", d.mission.lede),
    el(
      "div",
      { class: "badges reveal-group" },
      d.mission.badges.map((b) => text("span", "badge", b))
    )
  );

  /* ---------------- JOIN ---------------- */
  const joinEl = document.getElementById("joinContent");
  joinEl.append(
    text("p", "eyebrow", d.join.eyebrow),
    el("h2", { class: "h2", innerHTML: d.join.heading.join("<br>") }),
    text("p", "join__sub", d.join.sub),
    el("div", { class: "join__actions" }, [
      el("a", { href: `mailto:${d.join.email}`, class: "btn btn--primary", textContent: d.join.emailLabel }),
      el("a", { href: d.join.social.href, class: "btn btn--ghost", textContent: d.join.social.label }),
    ]),
    text("p", "join__note mono", d.join.note)
  );
  [aboutEl, divEl, procEl, missionEl, joinEl].forEach((s) => s.classList.add("reveal"));

  /* ============================================================
     INTERACTIONS
     ============================================================ */

  // Mobile nav toggle
  const navToggle = document.getElementById("navToggle");
  const nav = document.getElementById("nav");
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
  navMobile.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  // Scroll reveal (single elements + staggered groups)
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealTargets = document.querySelectorAll(".reveal, .reveal-group > *");

  document.querySelectorAll(".reveal-group").forEach((group) => {
    [...group.children].forEach((child, i) => {
      child.classList.add("reveal");
      child.style.transitionDelay = reduceMotion ? "0s" : `${i * 90}ms`;
    });
  });

  if ("IntersectionObserver" in window && revealTargets.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealTargets.forEach((target) => observer.observe(target));
  } else {
    revealTargets.forEach((t) => t.classList.add("is-visible"));
  }

  // Scroll-spy: highlight the active nav link
  const sections = d.nav.links.map((l) => document.querySelector(l.href)).filter(Boolean);
  const navAnchors = [...navLinks.querySelectorAll("[data-navlink]")];
  if ("IntersectionObserver" in window && sections.length) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const href = "#" + entry.target.id;
          const anchor = navAnchors.find((a) => a.getAttribute("href") === href);
          if (!anchor) return;
          if (entry.isIntersecting) {
            navAnchors.forEach((a) => a.classList.remove("is-active"));
            anchor.classList.add("is-active");
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => spy.observe(s));
  }

  // Scroll-progress gauge
  const progressFill = document.getElementById("progressFill");
  const updateProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressFill.style.width = pct + "%";
  };
  window.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();

  // Mechanical tilt on plate / fighter cards (skipped if reduced motion or touch-only)
  const supportsHover = window.matchMedia("(hover: hover)").matches;
  if (!reduceMotion && supportsHover) {
    document.querySelectorAll(".plate, .fighter").forEach((card) => {
      card.style.willChange = "transform";
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(700px) rotateX(${(-y * 6).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg) translateY(-4px)`;
      });
      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
      });
    });
  }

  // Footer year (fallback if meta.year not used directly above)
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = d.meta.year;
})();
