// =============================================================================
// data.js  —  GROUND TRUTH FOR ALL SITE CONTENT
// =============================================================================
// Edit this file to update any content on the site.
// After editing, just save and reload — no HTML hunting required.
//
// SECTIONS:
//   meta         → <title>, description, theme color
//   nav          → navigation links & brand name
//   hero         → big opening section
//   about        → "who we are" section
//   bots         → Bots page — add/edit robots here
//   team         → Team Members page — add/edit members here
//   donate       → Donate page content & HCB link
//   mission      → mission statement panel
//   footer       → footer text
// =============================================================================

const SITE_DATA = {

  // ---------------------------------------------------------------------------
  // META
  // ---------------------------------------------------------------------------
  meta: {
    title: "Wolf Tech Combat Team — Robot Combat",
    description: "Wolf Tech is a student-run combat robotics team from Frisco, TX. We design, machine, and fight our own robots.",
    themeColor: "#0055A4",
  },
   // ---------------------------------------------------------------------------
// SPONSORS  ← edit this to add/change sponsors
// ---------------------------------------------------------------------------
sponsors: {
  heading: "Our Sponsors",
  intro: "These organizations make Wolf Tech possible. Interested in sponsoring? Reach out.",
  list: [
    {
      name: "Repeat Robotics",
      logo: "sponsors/RR.png",   // ← put your .png in a sponsors/ folder
      url: "https://repeat-robotics.com/",
      tier: "Gold",
    },
   {
      name: "Singularity FRC",
      logo: "sponsors/Sing.png",   // ← put your .png in a sponsors/ folder
      url: "https://www.singularity-frc.com/",
      tier: "Gold",
    },

     
    // Add more sponsors here ↓
    // {
    //   name: "Sponsor Name",
    //   logo: "sponsors/sponsor.png",
    //   url: "https://sponsor.com",
    //   tier: "Silver",   // Gold | Silver | Bronze
    // },
  ],
},

  // ---------------------------------------------------------------------------
  // NAV
  // ---------------------------------------------------------------------------
  nav: {
    brand: "Wolf Tech Combat Team",
    links: [
      { label: "Home",    href: "#top"     },
      { label: "About",   href: "#about"   },
      { label: "Bots",    href: "#bots"    },
      { label: "Team",    href: "#team"    },
      { label: "Donate",  href: "#donate"  },
      { label: "Sponsors", href: "#sponsors" },
    ],
  },

  // ---------------------------------------------------------------------------
  // HERO
  // ---------------------------------------------------------------------------
  hero: {
    eyebrow: "Combat Robotics · Frisco, TX",
    headline: "Built to Compete. Built to Win.",
    sub: "We're a student-run team from Frisco, TX — designing, machining, and fighting our own combat robots from the ground up.",
    cta: [
      { label: "Meet Our Bots",  href: "#bots",   style: "primary" },
      { label: "Support Us",     href: "#donate", style: "secondary" },
    ],
  },

  // ---------------------------------------------------------------------------
  // ABOUT
  // ---------------------------------------------------------------------------
  about: {
    heading: "Who We Are",
    body: "Wolf Tech Combat Team is a student-built engineering program where members learn CAD, fabrication, programming, and strategy — all in the context of real competitive combat robotics. We design every component, machine every part, and drive every bot ourselves.",
    pillars: [
      { stat: "100%", label: "Student-designed" },
      { stat: "In",  label: "Frisco, Texas" },
      { stat: "⚙️",   label: "Hands-on engineering" },
    ],
  },

  // ---------------------------------------------------------------------------
  // BOTS  ← edit this to add/change robots
  // ---------------------------------------------------------------------------
  bots: {
    heading: "Our Bots",
    intro: "Every machine is designed, fabricated, and driven by our student team. Below is our current roster.",
    list: [
      {
        name: "FENRIR",
        weightClass: "1lb Plastic Antweight",
        weapon: "Drum Spinner",
        material: "PLA+, PETG, and ASA",
        status: "Active",
        notes: "Our first ever bot. Debuted at Texas Robot Combat: Metal Meltdown 2026",
      },
      // Add more bots here ↓
      // {
      //   name: "Bot Name",
      //   weightClass: "Weight class",
      //   weapon: "Weapon type",
      //   material: "Materials used",
      //   status: "Active | Retired | In Build",
      //   notes: "Any extra notes.",
      // },
    ],
  },

  // ---------------------------------------------------------------------------
  // TEAM  ← edit this to add/change members
  // ---------------------------------------------------------------------------
  team: {
    heading: "Team Members",
    intro: "The people behind the machines.",
    members: [
      {
        name: "Sahejdeep Singh",
        role: "Team Co-Captain, Software, and Electrical Lead",
        bio: "Leads elctric systems and software. Handles most autonomous and electrical functions.",
      },
      {
        name: "Dev Gavande",
        role: "Team Co-Captain, CAD, and Hardware Lead",
        bio: "Leads design and strategy. Handles CAD and overall robot architecture.",
      },
      {
        name: "Mohan Chillara",
        role: "Business Lead and Electronics",
        bio: "Handles buisness and electronics.",
      },
      {
        name: "Shreyas Konyala",
        role: "CAD, Hardware, and Electronics",
        bio: "Handles design, hardware and electronics.",
      },
      {
        name: "Jivansh Pandya",
        role: "CAD, and Hardware",
        bio: "Handles design, and hardware.",
      },
      {
        name: "Alexander Kolev",
        role: "Hardware and Strategy",
        bio: "Handles assembly and strategy.",
      },
      {
        name: "Jacob Esparza",
        role: "Hardware and Strategy",
        bio: "Handles assembly and strategy.",
      },
      
      // Add more members here ↓
      // {
      //   name: "Member Name",
      //   role: "Role / Department",
      //   bio: "Short bio.",
      // },
    ],
  },

  // ---------------------------------------------------------------------------
  // DONATE
  // ---------------------------------------------------------------------------
  donate: {
    heading: "Support Wolf Tech",
    body: "We're a student team that builds everything ourselves — but materials, tools, and entry fees add up. Your donation goes directly toward robot parts, machining, and competition fees. Wolf Tech Combat Team is fiscally sponsored by HCB, a 501(c)(3) nonprofit — your donation is fully tax-deductible.",
    hcbLink: "https://hcb.hackclub.com/donations/start/wolf-tech-combat-team",
    cta: "Donate via HCB",
    note: "Fiscally sponsored by HCB · 501(c)(3) tax-deductible",
  },

  // ---------------------------------------------------------------------------
  // MISSION
  // ---------------------------------------------------------------------------
  mission: {
    heading: "Our Mission",
    quote: "Give students real engineering problems — and the tools to solve them.",
    body: "Combat robotics forces you to think in systems: structural integrity, power budgets, weapon kinetics, repair speed. We believe the arena is one of the best classrooms around.",
  },

  // ---------------------------------------------------------------------------
  // FOOTER
  // ---------------------------------------------------------------------------
  footer: {
    copy: "© 2024 Wolf Tech Combat Team · Frisco, TX",
    contact: "wolftechcombat@gmail.com",   // ← replace with real email
    social: {
      label: "Build log",
      href: "#",   // ← replace with Instagram/YouTube/build-log URL
    },
  },

};
