export type Technology = {
  name: string;
  category:
    | "Propulsion"
    | "Life Support"
    | "Energy"
    | "Construction"
    | "Communications";
  readiness: string;
  progress: number;
  challenge: string;
  impact: string;
};

export type Milestone = {
  id: string;
  stage: number;
  title: string;
  timeframe: string;
  icon: string;
  description: string;
  focus: string[];
  technologies: Technology[];
};

export const milestones: Milestone[] = [
  {
    id: "leo",
    stage: 1,
    title: "Low Earth Orbit Expansion",
    timeframe: "Current → 2035",
    icon: "Rocket",
    description:
      "Launch becomes routine and cheap. Orbit turns from a destination into an industrial neighbourhood.",
    focus: [
      "reusable launch systems",
      "commercial stations",
      "satellite servicing",
      "orbital manufacturing",
    ],
    technologies: [
      {
        name: "Chemical Rockets",
        category: "Propulsion",
        readiness: "TRL 9 — Operational",
        progress: 96,
        challenge: "Cost per kilogram and turnaround cadence.",
        impact:
          "Full reusability drops launch prices by an order of magnitude.",
      },
      {
        name: "Water Recycling",
        category: "Life Support",
        readiness: "TRL 8 — Flight proven",
        progress: 82,
        challenge: "Long-duration reliability without resupply.",
        impact: "Removes the heaviest consumable from every crewed mission.",
      },
      {
        name: "Large Solar Farms",
        category: "Energy",
        readiness: "TRL 8",
        progress: 74,
        challenge: "Deployable structures at hundred-metre scale.",
        impact: "Powers orbital factories and station clusters.",
      },
      {
        name: "Space Manufacturing",
        category: "Construction",
        readiness: "TRL 5",
        progress: 41,
        challenge: "Microgravity process control and quality assurance.",
        impact: "Fibre optics, alloys and organs made better off-world.",
      },
    ],
  },
  {
    id: "moon",
    stage: 2,
    title: "Permanent Moon Presence",
    timeframe: "2030 — 2050",
    icon: "Moon",
    description:
      "The Moon becomes a proving ground: habitats, water ice mining and the first off-world industry.",
    focus: [
      "lunar habitats",
      "ISRU",
      "mining water ice",
      "power systems",
      "moon bases",
    ],
    technologies: [
      {
        name: "ISRU (In-Situ Resources)",
        category: "Construction",
        readiness: "TRL 4",
        progress: 34,
        challenge:
          "Extracting and purifying ice in permanently shadowed craters.",
        impact: "Local propellant ends the tyranny of Earth logistics.",
      },
      {
        name: "Nuclear Fission Surface Power",
        category: "Energy",
        readiness: "TRL 5",
        progress: 46,
        challenge: "Compact reactors that survive 14-day lunar nights.",
        impact: "Continuous megawatt power for mining and refining.",
      },
      {
        name: "Inflatable Habitats",
        category: "Construction",
        readiness: "TRL 6",
        progress: 52,
        challenge: "Regolith shielding and micrometeoroid protection.",
        impact: "Large pressurised volume for a fraction of launch mass.",
      },
      {
        name: "Laser Communication",
        category: "Communications",
        readiness: "TRL 7",
        progress: 63,
        challenge: "Pointing accuracy across cislunar distances.",
        impact: "Gigabit links between Earth and the lunar surface.",
      },
    ],
  },
  {
    id: "mars",
    stage: 3,
    title: "Mars Exploration",
    timeframe: "2040 — 2065",
    icon: "Globe",
    description:
      "First crews land, live off the land and prove that a second world can sustain people.",
    focus: [
      "first human missions",
      "surface habitats",
      "fuel production",
      "food production",
      "radiation protection",
    ],
    technologies: [
      {
        name: "Nuclear Thermal Propulsion",
        category: "Propulsion",
        readiness: "TRL 4",
        progress: 30,
        challenge: "High-temperature fuel elements and ground testing.",
        impact: "Cuts transit time and crew radiation exposure nearly in half.",
      },
      {
        name: "Closed-loop Food Production",
        category: "Life Support",
        readiness: "TRL 4",
        progress: 28,
        challenge: "Crop yield stability under partial gravity and low light.",
        impact: "Calories that do not need to be shipped from Earth.",
      },
      {
        name: "Radiation Shielding",
        category: "Construction",
        readiness: "TRL 3",
        progress: 22,
        challenge: "Mass-efficient protection against galactic cosmic rays.",
        impact: "Makes multi-year surface stays medically survivable.",
      },
      {
        name: "Delay-tolerant Networking",
        category: "Communications",
        readiness: "TRL 6",
        progress: 55,
        challenge: "Store-and-forward protocols across 20-minute light lag.",
        impact: "An interplanetary internet that simply works.",
      },
    ],
  },
  {
    id: "industrial",
    stage: 4,
    title: "Industrial Solar System",
    timeframe: "2060 — 2100",
    icon: "Factory",
    description:
      "Robots outnumber people off-world. Asteroids feed shipyards; ships are built where they fly.",
    focus: [
      "asteroid mining",
      "orbital shipyards",
      "automated factories",
      "massive solar arrays",
      "autonomous robotics",
    ],
    technologies: [
      {
        name: "Nuclear Electric Propulsion",
        category: "Propulsion",
        readiness: "TRL 4",
        progress: 26,
        challenge: "Megawatt-class power conversion and heat rejection.",
        impact: "Economical cargo tugs across the inner system.",
      },
      {
        name: "Autonomous Construction Robots",
        category: "Construction",
        readiness: "TRL 4",
        progress: 31,
        challenge: "Dexterity and self-repair with no humans nearby.",
        impact: "Infrastructure that builds itself before crews arrive.",
      },
      {
        name: "Space-based Solar",
        category: "Energy",
        readiness: "TRL 4",
        progress: 24,
        challenge: "Kilometre-scale assembly and wireless power beaming.",
        impact: "Uninterrupted gigawatts for industry anywhere in orbit.",
      },
      {
        name: "AI Autonomy",
        category: "Communications",
        readiness: "TRL 5",
        progress: 44,
        challenge: "Trustworthy decision-making beyond real-time control.",
        impact: "Fleets that operate without waiting on Earth.",
      },
    ],
  },
  {
    id: "outer",
    stage: 5,
    title: "Outer Solar System",
    timeframe: "2100+",
    icon: "Orbit",
    description:
      "Gas giants and ocean moons open up. Cryogenic worlds become field sites for life detection.",
    focus: [
      "Jupiter missions",
      "Europa",
      "Titan",
      "Enceladus",
      "cryogenic exploration",
    ],
    technologies: [
      {
        name: "Fusion Propulsion",
        category: "Propulsion",
        readiness: "TRL 2",
        progress: 12,
        challenge: "Net-positive burn in a flight-weight machine.",
        impact: "Months instead of decades to the outer planets.",
      },
      {
        name: "Medical Autonomy",
        category: "Life Support",
        readiness: "TRL 3",
        progress: 21,
        challenge: "Surgery and pharmacy with no evacuation option.",
        impact: "Crews survive emergencies years from home.",
      },
      {
        name: "Deep-space Networking",
        category: "Communications",
        readiness: "TRL 5",
        progress: 38,
        challenge: "Relay architecture across billions of kilometres.",
        impact: "Persistent contact with the far system.",
      },
      {
        name: "Fusion Power",
        category: "Energy",
        readiness: "TRL 3",
        progress: 18,
        challenge: "Sustained confinement and tritium breeding.",
        impact: "Energy independence far from the Sun.",
      },
    ],
  },
  {
    id: "civilization",
    stage: 6,
    title: "Interplanetary Civilization",
    timeframe: "2200+",
    icon: "Building2",
    description:
      "Travel becomes routine, colonies become cities, and an economy spans multiple worlds.",
    focus: [
      "routine travel",
      "thriving colonies",
      "interplanetary economy",
      "autonomous settlements",
      "large rotating habitats",
    ],
    technologies: [
      {
        name: "Artificial Gravity",
        category: "Life Support",
        readiness: "TRL 3",
        progress: 17,
        challenge: "Structural loads and coriolis comfort at scale.",
        impact: "Children born and raised healthily off Earth.",
      },
      {
        name: "Closed-loop Ecosystems",
        category: "Life Support",
        readiness: "TRL 3",
        progress: 19,
        challenge: "Century-stable biological balance.",
        impact: "Settlements that need nothing from Earth.",
      },
      {
        name: "Orbital Shipyards",
        category: "Construction",
        readiness: "TRL 3",
        progress: 16,
        challenge: "Heavy assembly without a gravity well.",
        impact: "Ships too large to ever launch from a planet.",
      },
      {
        name: "Wireless Power",
        category: "Energy",
        readiness: "TRL 4",
        progress: 27,
        challenge: "Beam efficiency and safety over long ranges.",
        impact: "Power grids spanning orbital clusters.",
      },
    ],
  },
  {
    id: "interstellar",
    stage: 7,
    title: "Beyond the Solar System",
    timeframe: "Far Future",
    icon: "Sparkles",
    description:
      "The first true departures — probes, sails, and eventually ships that never intend to come back.",
    focus: [
      "fusion propulsion",
      "antimatter concepts",
      "laser sails",
      "generation ships",
      "interstellar probes",
    ],
    technologies: [
      {
        name: "Beamed Propulsion / Laser Sails",
        category: "Propulsion",
        readiness: "TRL 2",
        progress: 9,
        challenge: "Gigawatt beam arrays and sail survivability.",
        impact: "Gram-scale probes at a fraction of light speed.",
      },
      {
        name: "Antimatter Concepts",
        category: "Propulsion",
        readiness: "TRL 1",
        progress: 4,
        challenge: "Production and storage at usable quantities.",
        impact: "The highest energy density physics permits.",
      },
      {
        name: "Cryogenic Storage",
        category: "Life Support",
        readiness: "TRL 1",
        progress: 6,
        challenge: "Reversible suspension of complex organisms.",
        impact: "Crossing centuries without living through them.",
      },
      {
        name: "Massive Energy Generation",
        category: "Energy",
        readiness: "TRL 1",
        progress: 7,
        challenge: "Harvesting a meaningful fraction of stellar output.",
        impact: "The power budget of a starfaring species.",
      },
    ],
  },
];

export type DependencyNode = {
  id: string;
  label: string;
  detail: string;
  children: string[];
};

export const dependencyChain: DependencyNode[] = [
  {
    id: "reusable",
    label: "Reusable Rockets",
    detail: "Fly, land, refuel, repeat.",
    children: ["cheap-launch"],
  },
  {
    id: "cheap-launch",
    label: "Cheap Launch",
    detail: "Mass to orbit stops being the bottleneck.",
    children: ["orbital-manufacturing"],
  },
  {
    id: "orbital-manufacturing",
    label: "Orbital Manufacturing",
    detail: "Structures built where they are used.",
    children: ["fuel-depots"],
  },
  {
    id: "fuel-depots",
    label: "Fuel Depots",
    detail: "Propellant waiting along the route.",
    children: ["mars-logistics"],
  },
  {
    id: "mars-logistics",
    label: "Mars Logistics",
    detail: "Regular cargo cadence to a second world.",
    children: ["colonies"],
  },
  {
    id: "colonies",
    label: "Permanent Colonies",
    detail: "Self-sustaining human presence.",
    children: [],
  },
];

export type FutureTheory = {
  id: string;
  title: string;
  icon: string;
  summary: string;
  detail: string;
};

export const futureTheories: FutureTheory[] = [
  {
    id: "economy",
    title: "Interplanetary Economy",
    icon: "Coins",
    summary: "Trade between planets and moons.",
    detail:
      "Volatiles from the outer system, metals from asteroids, and manufactured goods from orbit create the first market that spans worlds — priced in delta-v as much as currency.",
  },
  {
    id: "elevator",
    title: "Space Elevators",
    icon: "MoveVertical",
    summary: "Massive launch infrastructure.",
    detail:
      "A tether from the surface to beyond geostationary orbit turns launch into an elevator ride. Feasible on the Moon and Mars long before Earth.",
  },
  {
    id: "cities",
    title: "Orbital Cities",
    icon: "Building",
    summary: "O'Neill Cylinders and rotating habitats.",
    detail:
      "Kilometres-long spinning cylinders with rivers, weather and full gravity — homes designed rather than inherited.",
  },
  {
    id: "terraform",
    title: "Terraforming",
    icon: "Sprout",
    summary: "Long-term planetary engineering.",
    detail:
      "Thickening atmospheres, warming surfaces and seeding biospheres across centuries. The slowest and most ambitious project imaginable.",
  },
  {
    id: "ai",
    title: "AI Civilization",
    icon: "Cpu",
    summary: "Robotic construction throughout the Solar System.",
    detail:
      "Self-replicating machine fleets prospect, refine and build for decades before a single human arrives.",
  },
  {
    id: "dyson",
    title: "Dyson Swarm",
    icon: "Sun",
    summary: "Large-scale solar energy collection.",
    detail:
      "Millions of independent collectors orbiting the Sun, harvesting a growing fraction of its output for a civilization with no energy ceiling.",
  },
  {
    id: "interstellar",
    title: "Interstellar Exploration",
    icon: "Telescope",
    summary: "Probes, then people, beyond our Solar System.",
    detail:
      "Laser-driven sails reach nearby stars within a human lifetime; crewed ships follow only once we can carry an ecosystem with us.",
  },
];

export type TechnologyGap = {
  name: string;
  status: string;
  difficulty: "Moderate" | "Hard" | "Extreme";
  timeline: string;
};

export const technologyGaps: TechnologyGap[] = [
  {
    name: "Radiation Shielding",
    status: "Early research",
    difficulty: "Hard",
    timeline: "2035+",
  },
  {
    name: "Artificial Gravity",
    status: "Concept studies",
    difficulty: "Hard",
    timeline: "2050+",
  },
  {
    name: "Fusion Propulsion",
    status: "Lab experiments",
    difficulty: "Extreme",
    timeline: "2080+",
  },
  {
    name: "Closed-loop Agriculture",
    status: "Prototype greenhouses",
    difficulty: "Hard",
    timeline: "2040+",
  },
  {
    name: "Autonomous Construction",
    status: "Field demonstrations",
    difficulty: "Moderate",
    timeline: "2035+",
  },
  {
    name: "Deep Space Medicine",
    status: "Analog studies",
    difficulty: "Hard",
    timeline: "2045+",
  },
  {
    name: "Cryogenic Storage",
    status: "Theoretical",
    difficulty: "Extreme",
    timeline: "2150+",
  },
  {
    name: "Massive Energy Generation",
    status: "Design studies",
    difficulty: "Extreme",
    timeline: "2090+",
  },
  {
    name: "Orbital Manufacturing",
    status: "First pilot plants",
    difficulty: "Moderate",
    timeline: "2032+",
  },
  {
    name: "Dust Mitigation",
    status: "Active testing",
    difficulty: "Moderate",
    timeline: "2030+",
  },
  {
    name: "Psychological Health Systems",
    status: "Analog missions",
    difficulty: "Moderate",
    timeline: "2038+",
  },
];
