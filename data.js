/* ============================================================
   WOLF COMBAT TECH TEAM — SITE CONTENT
   Edit this file to change anything on the page. Nothing else
   needs to change — index.html and script.js read from here.
   ============================================================ */

const SITE_DATA = {

  meta: {
    title: "Wolf Combat Tech Team — Texas Robot Combat",
    description:
      "Wolf Combat Tech Team is a student-built engineering team designing, building, and competing with combat robots in Texas Robot Combat events.",
    year: new Date().getFullYear(),
  },

  nav: {
    brandName: "Wolf Combat",
    brandSub: "Tech Team",
    links: [
      { label: "About", href: "#about" },
      { label: "Divisions", href: "#divisions" },
      { label: "Build Process", href: "#process" },
      { label: "Mission", href: "#mission" },
    ],
    cta: { label: "Join the Team", href: "#join" },
  },

  hero: {
    eyebrow: "Student-Built · Texas Robot Combat",
    titleLines: ["We Build", "Fighting Robots."],
    accentLineIndex: 1, // which line above gets the accent color
    subtitle:
      "Wolf Combat Tech Team designs, machines, and pilots combat robots from a blank CAD file to the arena floor — learning real engineering by building things that hit back.",
    ctas: [
      { label: "Join the Team", href: "#join", variant: "primary" },
      { label: "See Our Robots", href: "#divisions", variant: "ghost" },
    ],
    spec: [
      "Division 1: Plastic Antweight (150g)",
      "Division 2: Antweight (1lb) — in development",
    ],
  },

  about: {
    eyebrow: "About the Team",
    heading: ["Built by students.", "Proven in the arena."],
    lede:
      "We're a student-built engineering team focused on designing, building, and competing with combat robots in Texas Robot Combat events. There's no simulation that teaches you torque, tolerances, and teamwork like a robot that has to survive getting hit.",
    cards: [
      {
        tag: "01 / Design",
        title: "Mechanical & CAD",
        body:
          "Members model every chassis, weapon, and drivetrain before a single part gets cut, learning real-world CAD and mechanical design skills along the way.",
      },
      {
        tag: "02 / Systems",
        title: "Electronics & Programming",
        body:
          "From receivers and ESCs to weapon motor control, members wire, program, and debug the systems that make a robot drive, fight, and survive.",
      },
      {
        tag: "03 / Shop",
        title: "Manufacturing & Teamwork",
        body:
          "Parts get cut, printed, and machined by hand. Every build is a team effort — design, build, and pit crew working off the same plan.",
      },
    ],
  },

  divisions: {
    eyebrow: "Weight Classes",
    heading: "Tale of the Tape",
    sub: "The robots we build, and the ones we're building toward.",
    fighters: [
      {
        status: "Active",
        statusVariant: "active",
        classLabel: "Class 01",
        name: "Plastic Antweight",
        specs: [
          { label: "Weight Limit", value: "150 g" },
          { label: "Materials", value: "Plastic only" },
          { label: "Status", value: "Competing now" },
        ],
        desc:
          "Our entry point into combat robotics — small, fast, and brutal on lessons learned. This is where new members get their first hands-on build.",
        variant: "accent",
      },
      {
        status: "In Development",
        statusVariant: "dev",
        classLabel: "Class 02",
        name: "Antweight",
        specs: [
          { label: "Weight Limit", value: "1 lb / 454 g" },
          { label: "Materials", value: "Metal & plastic" },
          { label: "Status", value: "Next up" },
        ],
        desc:
          "As the team grows, this is our next weight class — tougher builds, heavier weapons, and a step closer to the full Texas Robot Combat circuit.",
        variant: "steel",
      },
    ],
  },

  process: {
    eyebrow: "How We Build",
    heading: "Design. Build. Test. Compete. Repeat.",
    steps: [
      { num: "01", title: "Design", body: "CAD the chassis, weapon, and drivetrain before anything is cut." },
      { num: "02", title: "Build", body: "Machine, print, and wire the robot in the shop, one part at a time." },
      { num: "03", title: "Test", body: "Drive it, break it, find out why — then fix the real problem." },
      { num: "04", title: "Compete", body: "Bring it to the arena at Texas Robot Combat events." },
      { num: "↻", title: "Iterate", body: "Every match teaches us what to redesign next.", loop: true },
    ],
  },

  mission: {
    eyebrow: "Our Mission",
    heading: "More than a robot.",
    lede:
      "Through iterative design, testing, and competition, we aim to sharpen our engineering skills, promote STEM education, and bring some real innovation into a fun, competitive environment. As the team grows, we want to mentor new members, expand into additional weight classes, and represent our school at robotics competitions across Texas.",
    badges: ["STEM Education", "Mentorship", "Hands-On Engineering", "Texas Robot Combat"],
  },

  join: {
    eyebrow: "Join the Pit Crew",
    heading: ["Want to build something", "that fights back?"],
    sub:
      "We're always looking for members interested in mechanical design, CAD, electronics, programming, or just turning wrenches. No experience required — just curiosity and a willingness to break things on purpose.",
    email: "wolfcombat@yourschool.edu", // EDIT ME — real contact email
    emailLabel: "Email the Team →",
    social: { label: "Follow Our Builds", href: "#" }, // EDIT ME — real social / build-log link
    note: "Edit me — swap in your real contact email & social link in data.js",
  },

  footer: {
    brandName: "Wolf Combat Tech Team",
    note: "Texas Robot Combat",
  },
};

// Explicitly attach to window so script.js can read it reliably.
window.SITE_DATA = SITE_DATA;
