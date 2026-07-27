import {
  Rocket,
  Radiation,
  Wind,
  Sprout,
  ArrowDownToDot,
  Home,
  Zap,
  RadioTower,
  HeartPulse,
  Pickaxe,
  type LucideIcon,
} from "lucide-react";

export type Roadblock = {
  id: string;
  title: string;
  code: string;
  icon: LucideIcon;
  /** 0-1 position along the Earth -> Mars path */
  t: number;
  /** vertical offset in the diagram, -1 (up) .. 1 (down) */
  offset: number;
  phase: "Departure" | "Transit" | "Arrival" | "Surface";
  readiness: number; // 1-9 technology readiness level
  opportunity: number; // 0-100 remaining innovation headroom
  problem: string;
  solutions: string[];
  organizations: string[];
  future: string[];
};

export const roadblocks: Roadblock[] = [
  {
    id: "propulsion",
    title: "Propulsion",
    code: "RB-01",
    icon: Rocket,
    t: 0.05,
    offset: -0.75,
    phase: "Departure",
    readiness: 6,
    opportunity: 55,
    problem:
      "Chemical rockets need enormous propellant mass for a 6-9 month transit, and launch windows only open every 26 months. Every extra tonne of hardware multiplies the propellant stack behind it.",
    solutions: [
      "Methalox full-flow staged combustion engines with orbital refueling",
      "Hohmann-class low-energy transfers timed to the 26-month synodic window",
      "Solar electric propulsion tugs for pre-positioning uncrewed cargo",
    ],
    organizations: [
      "SpaceX (Raptor / Starship)",
      "NASA Space Nuclear Propulsion",
      "DARPA + Lockheed Martin (DRACO)",
      "Ad Astra Rocket Company (VASIMR)",
    ],
    future: [
      "Nuclear thermal propulsion cutting transit to ~90-120 days",
      "Nuclear electric propulsion for continuous low-thrust cruise",
      "Fusion-driven and pulsed plasma concepts for sub-60-day transits",
    ],
  },
  {
    id: "radiation",
    title: "Radiation",
    code: "RB-02",
    icon: Radiation,
    t: 0.15,
    offset: 0.72,
    phase: "Transit",
    readiness: 4,
    opportunity: 80,
    problem:
      "Outside Earth's magnetosphere the crew absorbs galactic cosmic rays continuously plus unpredictable solar particle events. A round trip approaches career dose limits and raises cancer, CNS and cardiovascular risk.",
    solutions: [
      "Water and polyethylene storm shelters around crew sleep stations",
      "Active dosimetry and heliophysics-driven solar storm forecasting",
      "Shortening exposure by shortening the transit itself",
    ],
    organizations: [
      "NASA Space Radiation Laboratory (BNL)",
      "ESA / DLR (MARE, Matroshka)",
      "Roscosmos IBMP",
      "CERN radiation-shielding materials groups",
    ],
    future: [
      "Superconducting active magnetic shielding around the habitat",
      "Hydrogen-rich boron nitride nanotube structural shielding",
      "Radioprotective pharmaceuticals and DNA-repair therapeutics",
    ],
  },
  {
    id: "life-support",
    title: "Life Support",
    code: "RB-03",
    icon: Wind,
    t: 0.25,
    offset: -0.68,
    phase: "Transit",
    readiness: 5,
    opportunity: 65,
    problem:
      "No resupply for up to three years. Air, water and waste loops must close to near-100% with hardware that is repairable in flight — Current ISS Environmental Control and Life Support Systems recover much of the water and oxygen, but still require periodic resupply and maintenance.",
    solutions: [
      "Sabatier CO2 reduction plus electrolysis oxygen generation",
      "Urine and humidity condensate recovery above 90%",
      "Redundant, crew-serviceable line-replaceable units",
    ],
    organizations: [
      "NASA ECLSS / Marshall Space Flight Center",
      "ESA MELiSSA consortium",
      "Paragon Space Development",
      "Sierra Space",
    ],
    future: [
      "Fully closed bioregenerative loops using algae and microbes",
      "Self-healing membranes and additive-manufactured spares",
      "Solid-state CO2 electrolysis with no consumable beds",
    ],
  },
  {
    id: "food",
    title: "Food Production",
    code: "RB-04",
    icon: Sprout,
    t: 0.35,
    offset: 0.66,
    phase: "Transit",
    readiness: 4,
    opportunity: 78,
    problem:
      "Pre-packaged food degrades in vitamin content well before a three-year mission ends, and growing crops costs power, volume, water and crew time in partial gravity.",
    solutions: [
      "LED-lit hydroponic and aeroponic salad crops (Veggie, APH)",
      "Shelf-stable, nutrient-fortified packaged rations",
      "Crew-time-light harvest cycles with high-yield dwarf cultivars",
    ],
    organizations: [
      "NASA Kennedy Space Center Space Crop Production",
      "ESA EDEN ISS (Antarctica analogue)",
      "Interstellar Lab",
      "University of Arizona CEAC",
    ],
    future: [
      "Precision-fermented protein and cultivated meat bioreactors",
      "Engineered crops tuned for low pressure and high CO2",
      "Regolith-based soil substrates with microbial conditioning",
    ],
  },
  {
    id: "edl",
    title: "Entry, Descent & Landing",
    code: "RB-05",
    icon: ArrowDownToDot,
    t: 0.45,
    offset: -0.7,
    phase: "Arrival",
    readiness: 4,
    opportunity: 72,
    problem:
      "Mars' atmosphere is thick enough to burn you but too thin to stop you. The largest object ever landed is ~1 t; crewed missions need 20-50 t delivered within hundreds of metres of a prepared site, with no proven system for such large payloads.",
    solutions: [
      "Guided hypersonic entry with supersonic retropropulsion",
      "Sky crane and terrain-relative navigation (Perseverance heritage)",
      "Reusable heat shields sized for high-ballistic-coefficient vehicles",
    ],
    organizations: [
      "NASA JPL EDL",
      "SpaceX (Starship Mars EDL)",
      "NASA Langley (HIAD, LOFTID)",
      "ESA ExoMars EDL team",
    ],
    future: [
      "Inflatable hypersonic aerodecelerators for heavy payloads",
      "Autonomous precision landing to a pre-built pad",
      "Aerocapture into Mars orbit to remove a full propulsive burn",
    ],
  },
  {
    id: "habitat",
    title: "Surface Habitats",
    code: "RB-06",
    icon: Home,
    t: 0.56,
    offset: 0.7,
    phase: "Surface",
    readiness: 4,
    opportunity: 70,
    problem:
      "Habitats must hold one atmosphere of pressure against near-vacuum, shed radiation, survive dust storms and -125 C nights, and last decades with no delivery of structural spares.",
    solutions: [
      "Inflatable expandable modules (BEAM heritage)",
      "Regolith berms and buried modules for passive shielding",
      "Analogue-validated layouts (HERA, CHAPEA, HI-SEAS)",
    ],
    organizations: [
      "NASA Moon-to-Mars Habitation",
      "Sierra Space (LIFE habitat)",
      "ICON (Project Olympus)",
      "AI SpaceFactory",
    ],
    future: [
      "3D-printed regolith-concrete shells built before crew arrival",
      "Mycelium-grown and self-repairing bio-structures",
      "Lava tube habitats using natural rock shielding",
    ],
  },
  {
    id: "power",
    title: "Power",
    code: "RB-07",
    icon: Zap,
    t: 0.66,
    offset: -0.55,
    phase: "Surface",
    readiness: 5,
    opportunity: 58,
    problem:
      "Sunlight at Mars is ~43% of Earth's and global dust storms can black out solar arrays for weeks. ISRU propellant production alone demands tens of kilowatts continuously.",
    solutions: [
      "Large deployable solar arrays plus lithium battery banks",
      "Radioisotope units for critical survival loads",
      "Kilopower/KRUSTY-class fission reactor demonstrations",
    ],
    organizations: [
      "NASA Fission Surface Power",
      "DOE Idaho National Laboratory",
      "Westinghouse, Lockheed Martin, IX (FSP awards)",
      "Rolls-Royce Space Micro-Reactor",
    ],
    future: [
      "40+ kWe surface fission plants with autonomous load balancing",
      "Beamed power from orbit to shadowed or remote work sites",
      "Regolith-derived thermal storage for overnight buffering",
    ],
  },
  {
    id: "comms",
    title: "Communication",
    code: "RB-08",
    icon: RadioTower,
    t: 0.76,
    offset: 0.6,
    phase: "Surface",
    readiness: 6,
    opportunity: 45,
    problem:
      "Signal latency runs 4-24 minutes each way and solar conjunction blacks out contact for about two weeks every 26 months. Real-time help from Earth simply does not exist.",
    solutions: [
      "Deep Space Network with Mars relay orbiters",
      "Delay-tolerant networking protocols",
      "Onboard autonomy and crew-led anomaly procedures",
    ],
    organizations: [
      "NASA Deep Space Network / SCaN",
      "ESA ESTRACK",
      "MIT & JPL Deep Space Optical Comms",
      "Commercial Mars relay concepts",
    ],
    future: [
      "Laser optical comms delivering 100x current data rates",
      "A permanent Mars relay constellation with mesh routing",
      "On-site AI mission control that never waits for Earth",
    ],
  },
  {
    id: "health",
    title: "Human Health",
    code: "RB-09",
    icon: HeartPulse,
    t: 0.86,
    offset: -0.5,
    phase: "Surface",
    readiness: 3,
    opportunity: 85,
    problem:
      "Microgravity drives bone and muscle loss, fluid shifts cause SANS vision damage, immune function drops, and a small isolated crew faces years of behavioural stress with no evacuation option.",
    solutions: [
      "Daily resistive and aerobic exercise countermeasures",
      "ISS one-year missions and CHAPEA isolation analogues",
      "Telemedicine kits with autonomous diagnostic protocols",
    ],
    organizations: [
      "NASA Human Research Program",
      "Translational Research Institute for Space Health (TRISH)",
      "ESA & JAXA life sciences",
      "Baylor College of Medicine",
    ],
    future: [
      "Artificial gravity via tethered spin or short-radius centrifuge",
      "Pharmacological bone and muscle preservation",
      "Surgical robotics and bioprinted tissue for in-situ care",
    ],
  },
  {
    id: "isru",
    title: "In-Situ Resources",
    code: "RB-10",
    icon: Pickaxe,
    t: 0.95,
    offset: 0.45,
    phase: "Surface",
    readiness: 4,
    opportunity: 75,
    problem:
      "Bringing return propellant from Earth is close to impossible at crew scale. Oxygen, water, methane and construction feedstock must be manufactured from Martian atmosphere and regolith.",
    solutions: [
      "MOXIE-demonstrated solid oxide CO2 electrolysis for oxygen",
      "Sabatier methane synthesis using atmospheric CO2 plus hydrogen",
      "Subsurface ice mapping from orbit (SWIM, MRO/SHARAD)",
    ],
    organizations: [
      "NASA MOXIE / JPL & MIT Haystack",
      "SpaceX propellant plant architecture",
      "Honeybee Robotics",
      "Colorado School of Mines Space Resources",
    ],
    future: [
      "Industrial-scale propellant plants running before crew arrival",
      "Regolith metal extraction and on-surface additive manufacturing",
      "Autonomous ice mining swarms feeding water and hydrogen loops",
    ],
  },
];

export const readinessLabel = (trl: number) => {
  if (trl <= 3) return "Early research";
  if (trl <= 5) return "Prototype / analogue";
  if (trl <= 7) return "Flight demonstration";
  return "Mission proven";
};
