/* =============================================================================
   styles.css — Wolf Tech Combat Team
   Redesigned: industrial combat identity. Gritty, high-contrast, arena-hardened.
   ============================================================================= */

/* ── DESIGN TOKENS ─────────────────────────────────────────────────────────── */
:root {
  /* Core palette — steel, carbon, electric */
  --c-black:       #060709;
  --c-carbon:      #0E1015;
  --c-steel:       #181C24;
  --c-steel-mid:   #232834;
  --c-white:       #F0F2F5;
  --c-off-white:   #E8ECF2;
  --c-blue:        #0055A4;
  --c-blue-bright: #1877D2;
  --c-blue-glow:   #3A9EFF;
  --c-gold:        #E8A000;
  --c-gold-dim:    #B07800;
  --c-spark:       #FF6B1A;   /* danger / energy accent */
  --c-gray-600:    #4B5563;
  --c-gray-400:    #8B95A4;
  --c-gray-200:    #C8D0DC;

  /* Type */
  --font-display: 'Barlow Condensed', 'Impact', sans-serif;
  --font-body:    'Inter', system-ui, sans-serif;

  /* Scale */
  --fs-hero:   clamp(3.5rem, 10vw, 8rem);
  --fs-h2:     clamp(2rem, 4.5vw, 3.2rem);
  --fs-h3:     clamp(1.25rem, 2vw, 1.6rem);
  --fs-body:   1rem;
  --fs-small:  0.875rem;
  --fs-micro:  0.72rem;

  /* Spacing */
  --sp-xs: 0.5rem;
  --sp-sm: 1rem;
  --sp-md: 2rem;
  --sp-lg: 4rem;
  --sp-xl: 8rem;

  /* Layout */
  --wrap:   1180px;
  --nav-h:  60px;
  --radius: 3px;        /* deliberately tight — industrial, not bubbly */
  --radius-lg: 6px;

  /* Transitions */
  --t-fast: 150ms ease;
  --t-mid:  250ms ease;
}

/* ── RESET ──────────────────────────────────────────────────────────────────── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; -webkit-text-size-adjust: 100%; }
body {
  font-family: var(--font-body);
  font-size: var(--fs-body);
  color: var(--c-gray-200);
  background: var(--c-carbon);
  line-height: 1.6;
  overflow-x: hidden;
}
img { display: block; max-width: 100%; height: auto; }
a { color: inherit; text-decoration: none; }
ul { list-style: none; }
button { font: inherit; cursor: pointer; border: none; background: none; }

/* ── ACCESSIBILITY ──────────────────────────────────────────────────────────── */
.skip-link {
  position: absolute; top: -999px; left: 0;
  padding: 0.5rem 1rem;
  background: var(--c-blue); color: var(--c-white);
  font-weight: 600; z-index: 9999;
}
.skip-link:focus { top: 0; }
:focus-visible { outline: 2px solid var(--c-blue-glow); outline-offset: 3px; }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
  html { scroll-behavior: auto; }
}

/* ── PROGRESS BAR ────────────────────────────────────────────────────────────  */
.progress-bar {
  position: fixed; top: 0; left: 0;
  width: 100%; height: 2px;
  background: rgba(255,255,255,0.04);
  z-index: 9998;
}
.progress-bar__fill {
  height: 100%; width: 0%;
  background: linear-gradient(90deg, var(--c-blue-bright), var(--c-blue-glow));
  transition: width 0.08s linear;
  box-shadow: 0 0 8px var(--c-blue-glow);
}

/* ── LAYOUT ─────────────────────────────────────────────────────────────────── */
.wrap {
  max-width: var(--wrap);
  margin-inline: auto;
  padding-inline: var(--sp-md);
}

/* ── NAV ────────────────────────────────────────────────────────────────────── */
.nav {
  position: sticky; top: 0; z-index: 100;
  height: var(--nav-h);
  background: rgba(6,7,9,0.92);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
/* Thin colored accent strip at very top */
.nav::before {
  content: '';
  position: absolute; top: 0; left: 0; right: 0; height: 2px;
  background: linear-gradient(90deg, var(--c-blue) 0%, var(--c-blue-glow) 50%, var(--c-spark) 100%);
}
.nav__inner {
  height: 100%;
  display: flex; align-items: center;
  justify-content: space-between;
  gap: var(--sp-md);
}
.brand {
  display: flex; align-items: center;
  gap: 0.65rem;
  color: var(--c-white);
}
.brand__logo {
  width: 34px; height: 34px; object-fit: contain;
  filter: drop-shadow(0 0 6px rgba(26,119,210,0.5));
}
.brand__name {
  font-family: var(--font-display);
  font-size: 1.15rem; font-weight: 800;
  letter-spacing: 0.06em; text-transform: uppercase;
  color: var(--c-white);
}
.nav__links { display: flex; gap: 0.1rem; }
.nav__links a {
  font-size: var(--fs-micro);
  font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.1em;
  color: var(--c-gray-400);
  padding: 0.4rem 0.8rem;
  border-radius: var(--radius);
  transition: color var(--t-fast), background var(--t-fast);
}
.nav__links a:hover { color: var(--c-white); background: rgba(255,255,255,0.06); }
.nav__links a.is-active { color: var(--c-blue-glow); }

.nav__toggle {
  display: none; flex-direction: column;
  gap: 5px; padding: 8px;
}
.nav__toggle span {
  display: block; width: 22px; height: 2px;
  background: var(--c-white); border-radius: 1px;
  transition: transform var(--t-mid), opacity var(--t-mid);
}
.nav__toggle[aria-expanded="true"] span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.nav__toggle[aria-expanded="true"] span:nth-child(2) { opacity: 0; }
.nav__toggle[aria-expanded="true"] span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

.nav__mobile {
  display: none; flex-direction: column;
  background: var(--c-black);
  border-top: 1px solid rgba(255,255,255,0.05);
  padding: var(--sp-sm) var(--sp-md);
  gap: 0.15rem;
}
.nav__mobile.is-open { display: flex; }
.nav__mobile a {
  font-size: 1rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.07em;
  color: var(--c-gray-400);
  padding: 0.7rem 0;
  border-bottom: 1px solid rgba(255,255,255,0.04);
  transition: color var(--t-fast);
}
.nav__mobile a:hover { color: var(--c-white); }

@media (max-width: 760px) {
  .nav__links { display: none; }
  .nav__toggle { display: flex; }
  .nav { height: auto; }
  .nav__inner { height: var(--nav-h); }
}

/* ── HERO ────────────────────────────────────────────────────────────────────── */
.hero {
  background: var(--c-black);
  min-height: calc(100vh - var(--nav-h));
  display: flex; align-items: center;
  position: relative; overflow: hidden;
}

/* Diagonal scan-line texture */
.hero::before {
  content: '';
  position: absolute; inset: 0;
  background:
    radial-gradient(ellipse 90% 70% at 65% 45%, rgba(0,85,164,0.28) 0%, transparent 65%),
    radial-gradient(ellipse 40% 50% at 10% 80%, rgba(232,160,0,0.06) 0%, transparent 60%),
    repeating-linear-gradient(
      -55deg,
      transparent 0px, transparent 22px,
      rgba(255,255,255,0.018) 22px, rgba(255,255,255,0.018) 24px
    );
  pointer-events: none;
}

/* Wolf + axe SVG watermark */
.hero::after {
  content: '';
  position: absolute;
  right: -60px; bottom: -60px;
  width: min(600px, 72vw);
  aspect-ratio: 1;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cg fill='none' stroke='rgba(26%2C119%2C210%2C0.12)' stroke-width='0.9' stroke-linejoin='round'%3E%3Cpath d='M100 28 C74 28 53 44 48 65 C43 76 42 84 44 93 C40 91 36 91 34 95 C38 97 42 99 45 100 C46 109 52 118 61 123 C70 129 81 130 90 129 C91 135 93 142 91 150 L109 150 C107 142 109 135 110 129 C119 130 130 129 139 123 C148 118 154 109 155 100 C158 99 162 97 166 95 C164 91 160 91 156 93 C158 84 157 76 152 65 C147 44 126 28 100 28 Z'/%3E%3Cpath d='M76 31 L64 12 L83 27' stroke-width='1.2'/%3E%3Cpath d='M124 31 L136 12 L117 27' stroke-width='1.2'/%3E%3Ccircle cx='82' cy='76' r='8'/%3E%3Ccircle cx='118' cy='76' r='8'/%3E%3Ccircle cx='82' cy='76' r='3.5' fill='rgba(26%2C119%2C210%2C0.09)'/%3E%3Ccircle cx='118' cy='76' r='3.5' fill='rgba(26%2C119%2C210%2C0.09)'/%3E%3Cellipse cx='100' cy='100' rx='16' ry='12'/%3E%3Ccircle cx='93' cy='97' r='3'/%3E%3Ccircle cx='107' cy='97' r='3'/%3E%3Cpath d='M87 106 Q100 114 113 106'/%3E%3Cpath d='M90 129 L87 150 M110 129 L113 150'/%3E%3Cline x1='150' y1='58' x2='178' y2='24' stroke-width='2.2'/%3E%3Cpath d='M170 17 C175 12 183 13 185 18 C187 25 184 33 178 37 L168 28 Z' stroke-width='1.4'/%3E%3Cpath d='M178 37 C184 43 185 52 180 56 L168 45 Z' stroke-width='1.4'/%3E%3Cline x1='158' y1='52' x2='164' y2='40' stroke-width='1'/%3E%3C/g%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-size: contain;
  pointer-events: none; z-index: 0;
}

.hero__inner {
  position: relative; z-index: 1;
  padding-block: var(--sp-xl);
  display: grid;
  grid-template-columns: 1fr;
  max-width: 780px;
}

.hero__eyebrow {
  display: inline-flex; align-items: center; gap: 0.5rem;
  font-size: var(--fs-micro);
  font-weight: 700; letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--c-blue-glow);
  margin-bottom: var(--sp-md);
}
/* dash before eyebrow */
.hero__eyebrow::before {
  content: '';
  display: block;
  width: 28px; height: 2px;
  background: var(--c-blue-bright);
}

.hero__headline {
  font-family: var(--font-display);
  font-size: var(--fs-hero);
  font-weight: 800;
  line-height: 0.92;
  color: var(--c-white);
  text-transform: uppercase;
  letter-spacing: -0.02em;
  margin-bottom: var(--sp-md);
}
.hero__headline span {
  display: block;
  /* Second line: gold to blue-glow gradient */
  background: linear-gradient(95deg, var(--c-gold) 0%, var(--c-blue-glow) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero__sub {
  font-size: 1.05rem;
  color: var(--c-gray-400);
  max-width: 48ch;
  line-height: 1.7;
  margin-bottom: var(--sp-lg);
}

.hero__ctas {
  display: flex; gap: 0.75rem; flex-wrap: wrap;
}

/* ── BUTTONS ─────────────────────────────────────────────────────────────────── */
.btn {
  display: inline-flex; align-items: center; gap: 0.4rem;
  font-weight: 700; font-size: var(--fs-micro);
  letter-spacing: 0.1em; text-transform: uppercase;
  padding: 0.8rem 1.8rem;
  border-radius: var(--radius);
  transition: background var(--t-mid), transform var(--t-fast), box-shadow var(--t-mid);
  cursor: pointer; white-space: nowrap;
}
.btn:active { transform: translateY(1px); }

.btn--primary {
  background: var(--c-blue);
  color: var(--c-white);
  border: 1px solid var(--c-blue-bright);
  box-shadow: 0 0 0 0 rgba(26,119,210,0);
}
.btn--primary:hover {
  background: var(--c-blue-bright);
  box-shadow: 0 0 20px rgba(58,158,255,0.35), inset 0 1px 0 rgba(255,255,255,0.1);
}

.btn--secondary {
  background: transparent;
  color: var(--c-gray-200);
  border: 1px solid rgba(255,255,255,0.15);
}
.btn--secondary:hover {
  border-color: rgba(255,255,255,0.4);
  color: var(--c-white);
  background: rgba(255,255,255,0.04);
}

.btn--donate {
  background: var(--c-gold);
  color: var(--c-black);
  border: 1px solid var(--c-gold);
  font-size: 0.95rem;
  padding: 0.9rem 2.4rem;
  font-weight: 800;
}
.btn--donate:hover {
  background: #FFB800;
  box-shadow: 0 0 24px rgba(232,160,0,0.4);
}

/* ── SECTIONS ─────────────────────────────────────────────────────────────────  */
.section {
  padding-block: var(--sp-xl);
  background: var(--c-carbon);
  color: var(--c-gray-200);
  position: relative;
}
/* Subtle horizontal rule between sections */
.section + .section::before {
  content: '';
  position: absolute; top: 0; left: var(--sp-md); right: var(--sp-md);
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.06) 70%, transparent);
}

.section--dark {
  background: var(--c-steel);
  color: var(--c-gray-200);
}
.section--dark + .section::before,
.section + .section--dark::before { display: none; }

.section--blue {
  background: linear-gradient(135deg, #003a7a 0%, var(--c-blue) 60%, #0072c6 100%);
  color: var(--c-white);
}

.section-heading {
  font-family: var(--font-display);
  font-size: var(--fs-h2);
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.01em;
  line-height: 1;
  margin-bottom: var(--sp-sm);
  color: var(--c-white);
}

.section-intro {
  font-size: 1.05rem;
  line-height: 1.75;
  max-width: 58ch;
  color: var(--c-gray-400);
  margin-bottom: var(--sp-lg);
}

/* Section eyebrow label */
.section-label {
  display: inline-flex; align-items: center; gap: 0.5rem;
  font-size: var(--fs-micro);
  font-weight: 700; letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--c-blue-glow);
  margin-bottom: 0.6rem;
}
.section-label::before {
  content: '';
  display: block; width: 18px; height: 2px;
  background: var(--c-blue-bright);
}
.section--blue .section-label { color: rgba(255,255,255,0.75); }
.section--blue .section-label::before { background: rgba(255,255,255,0.5); }

/* ── ABOUT ──────────────────────────────────────────────────────────────────── */
.about-body {
  font-size: 1.1rem;
  line-height: 1.8;
  max-width: 62ch;
  color: var(--c-gray-200);
  margin-bottom: var(--sp-lg);
}
.about-pillars {
  display: flex; gap: 0; flex-wrap: wrap;
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: var(--radius-lg);
  overflow: hidden;
}
.pillar {
  flex: 1 1 140px;
  display: flex; flex-direction: column;
  gap: 0.2rem;
  padding: var(--sp-md) var(--sp-md);
  border-right: 1px solid rgba(255,255,255,0.07);
  background: rgba(255,255,255,0.02);
  transition: background var(--t-mid);
}
.pillar:last-child { border-right: none; }
.pillar:hover { background: rgba(255,255,255,0.04); }
.pillar__stat {
  font-family: var(--font-display);
  font-size: 2.4rem; font-weight: 800;
  color: var(--c-blue-glow);
  line-height: 1;
}
.pillar__label {
  font-size: var(--fs-small); font-weight: 600;
  text-transform: uppercase; letter-spacing: 0.08em;
  color: var(--c-gray-400);
}

/* ── BOTS GRID ──────────────────────────────────────────────────────────────── */
.bots-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1px;                   /* gap via 1px on a dark background = seam lines */
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: var(--radius-lg);
  overflow: hidden;
}
.bot-card {
  background: var(--c-steel);
  padding: var(--sp-md) var(--sp-md) var(--sp-md);
  position: relative;
  transition: background var(--t-mid);
}
/* top accent bar that lights up on hover */
.bot-card::before {
  content: '';
  position: absolute; top: 0; left: 0; right: 0; height: 2px;
  background: var(--c-blue);
  transition: background var(--t-mid), box-shadow var(--t-mid);
}
.bot-card:hover { background: var(--c-steel-mid); }
.bot-card:hover::before {
  background: var(--c-blue-glow);
  box-shadow: 0 0 12px rgba(58,158,255,0.5);
}

.bot-card__name {
  font-family: var(--font-display);
  font-size: 2rem; font-weight: 800;
  text-transform: uppercase;
  color: var(--c-white);
  letter-spacing: 0.04em;
  line-height: 1;
  margin-bottom: 0.3rem;
}
.bot-card__class {
  font-size: var(--fs-micro);
  font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em;
  color: var(--c-blue-glow);
  margin-bottom: var(--sp-sm);
}
.bot-card__status {
  display: inline-block;
  font-size: 0.68rem; font-weight: 800;
  letter-spacing: 0.12em; text-transform: uppercase;
  padding: 0.2rem 0.65rem;
  border-radius: 2px;
  margin-bottom: var(--sp-md);
}
.status--active   { background: rgba(34,197,94,.12); color: #4ade80; border: 1px solid rgba(34,197,94,.25); }
.status--retired  { background: rgba(239,68,68,.10); color: #f87171; border: 1px solid rgba(239,68,68,.2); }
.status--in-build { background: rgba(232,160,0,.12); color: var(--c-gold); border: 1px solid rgba(232,160,0,.25); }

.bot-card__specs {
  display: flex; flex-direction: column;
  gap: 0.5rem;
  margin-bottom: var(--sp-md);
  padding-bottom: var(--sp-md);
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
.spec-row {
  display: flex; gap: 0.75rem;
  font-size: var(--fs-small);
}
.spec-key { font-weight: 700; color: var(--c-gray-400); min-width: 72px; }
.spec-val { color: var(--c-gray-200); }

.bot-card__notes {
  font-size: var(--fs-small);
  color: var(--c-gray-400);
  line-height: 1.6;
}

/* ── TEAM GRID ──────────────────────────────────────────────────────────────── */
.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: var(--sp-sm);
}
.member-card {
  background: var(--c-carbon);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: var(--radius-lg);
  padding: var(--sp-md);
  display: grid;
  grid-template-rows: auto auto auto 1fr;
  position: relative;
  overflow: hidden;
  transition: border-color var(--t-mid), transform var(--t-mid);
}
/* Corner-cut industrial aesthetic */
.member-card::after {
  content: '';
  position: absolute; bottom: 0; right: 0;
  width: 28px; height: 28px;
  background: var(--c-blue);
  clip-path: polygon(100% 0, 100% 100%, 0 100%);
  opacity: 0;
  transition: opacity var(--t-mid);
}
.member-card:hover {
  border-color: rgba(58,158,255,0.3);
  transform: translateY(-3px);
}
.member-card:hover::after { opacity: 1; }

.member-card__avatar {
  width: 48px; height: 48px;
  border-radius: 4px;
  background: linear-gradient(135deg, var(--c-blue) 0%, var(--c-blue-glow) 100%);
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-display);
  font-size: 1.3rem; font-weight: 900;
  color: var(--c-white);
  margin-bottom: var(--sp-sm);
  letter-spacing: 0.04em;
}
.member-card__name {
  font-family: var(--font-display);
  font-size: 1.3rem; font-weight: 800;
  text-transform: uppercase;
  color: var(--c-white);
  letter-spacing: 0.04em;
  margin-bottom: 0.3rem;
}
.member-card__role {
  font-size: var(--fs-micro); font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.1em;
  color: var(--c-blue-glow);
  margin-bottom: var(--sp-sm);
}
.member-card__bio {
  font-size: var(--fs-small);
  color: var(--c-gray-400);
  line-height: 1.65;
}

/* ── DONATE ─────────────────────────────────────────────────────────────────── */
.section--blue { position: relative; overflow: hidden; }
.section--blue::before {
  content: '';
  position: absolute; inset: 0;
  background:
    radial-gradient(ellipse 60% 80% at 90% 50%, rgba(255,255,255,0.06) 0%, transparent 70%),
    repeating-linear-gradient(
      -45deg, transparent 0px, transparent 30px,
      rgba(255,255,255,0.025) 30px, rgba(255,255,255,0.025) 32px
    );
  pointer-events: none;
}
.section--blue .wrap { position: relative; z-index: 1; }

.donate-inner {
  display: flex; flex-direction: column;
  align-items: flex-start; gap: var(--sp-md);
  max-width: 620px;
}
.donate-body {
  font-size: 1.1rem; line-height: 1.8;
  color: rgba(255,255,255,0.85);
}
.donate-note {
  font-size: var(--fs-micro); font-weight: 700;
  letter-spacing: 0.1em; text-transform: uppercase;
  color: rgba(255,255,255,0.45);
}

/* ── MISSION ─────────────────────────────────────────────────────────────────── */
.mission-inner { max-width: 740px; }
.mission-quote {
  font-family: var(--font-display);
  font-size: clamp(1.7rem, 4vw, 2.6rem);
  font-weight: 800; color: var(--c-white);
  line-height: 1.15;
  padding-left: var(--sp-md);
  border-left: 3px solid var(--c-blue-glow);
  margin-block: var(--sp-md);
  position: relative;
}
.mission-body {
  font-size: 1.05rem; line-height: 1.8;
  color: var(--c-gray-400);
}

/* ── SPONSORS ────────────────────────────────────────────────────────────── */
.sponsors-grid {
  display: flex; flex-wrap: wrap;
  gap: var(--sp-sm);
  align-items: stretch;
}
.sponsor-card {
  background: var(--c-steel);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: var(--radius-lg);
  padding: var(--sp-md);
  display: flex; flex-direction: column;
  align-items: center; gap: 0.75rem;
  text-align: center; width: 200px;
  transition: border-color var(--t-mid), transform var(--t-mid);
}
.sponsor-card:hover {
  border-color: rgba(58,158,255,0.3);
  transform: translateY(-3px);
}
.sponsor-card img { width: 120px; height: 80px; object-fit: contain; }
.sponsor-card__name {
  font-family: var(--font-display);
  font-size: 1rem; font-weight: 800;
  text-transform: uppercase; letter-spacing: 0.06em;
  color: var(--c-white);
}
.sponsor-card__tier {
  font-size: 0.65rem; font-weight: 800;
  letter-spacing: 0.12em; text-transform: uppercase;
  padding: 0.2rem 0.6rem; border-radius: 2px;
}
.tier--gold   { background: rgba(232,160,0,.12); color: var(--c-gold); border: 1px solid rgba(232,160,0,.25); }
.tier--silver { background: rgba(156,163,175,.1); color: #9ca3af;      border: 1px solid rgba(156,163,175,.2); }
.tier--bronze { background: rgba(180,83,9,.1);   color: #d97706;       border: 1px solid rgba(180,83,9,.2); }

/* ── FOOTER ─────────────────────────────────────────────────────────────────── */
.footer {
  background: var(--c-black);
  border-top: 1px solid rgba(255,255,255,0.06);
  padding-block: var(--sp-lg);
  position: relative;
}
.footer::before {
  content: '';
  position: absolute; top: 0; left: 0; right: 0; height: 2px;
  background: linear-gradient(90deg, var(--c-blue) 0%, var(--c-blue-glow) 50%, var(--c-spark) 100%);
}
.footer__inner {
  display: flex; align-items: center;
  justify-content: space-between; flex-wrap: wrap;
  gap: var(--sp-md);
}
.footer__brand { display: flex; align-items: center; gap: 0.65rem; }
.footer__brand img { width: 30px; height: 30px; object-fit: contain; filter: drop-shadow(0 0 5px rgba(26,119,210,0.4)); }
.footer__brand-name {
  font-family: var(--font-display);
  font-size: 1rem; font-weight: 800;
  text-transform: uppercase; letter-spacing: 0.06em;
  color: var(--c-white);
}
.footer__meta { display: flex; flex-direction: column; gap: 0.35rem; text-align: right; }
.footer__copy { font-size: var(--fs-small); color: var(--c-gray-400); }
.footer__link { font-size: var(--fs-small); }
.footer__link a { color: var(--c-blue-glow); transition: color var(--t-fast); }
.footer__link a:hover { color: var(--c-white); }

/* ── SCROLL ANIMATIONS ───────────────────────────────────────────────────────── */
.reveal {
  opacity: 0; transform: translateY(18px);
  transition: opacity 0.55s ease, transform 0.55s ease;
}
.reveal.is-visible { opacity: 1; transform: none; }
.reveal--delay-1 { transition-delay: 0.08s; }
.reveal--delay-2 { transition-delay: 0.16s; }
.reveal--delay-3 { transition-delay: 0.24s; }

/* ── RESPONSIVE ─────────────────────────────────────────────────────────────── */
@media (max-width: 640px) {
  .about-pillars { flex-direction: column; }
  .pillar { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.07); }
  .pillar:last-child { border-bottom: none; }
  .hero__ctas { flex-direction: column; align-items: flex-start; }
  .footer__inner { flex-direction: column; align-items: flex-start; }
  .footer__meta { text-align: left; }
  .donate-inner { align-items: stretch; }
  .bots-grid { grid-template-columns: 1fr; gap: 1px; }
}
