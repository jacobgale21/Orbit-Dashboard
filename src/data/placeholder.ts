export type TimelineEvent = {
  name: string;
  year: string;
  summary: string;
};

export const timeline: TimelineEvent[] = [
  {
    name: "Sputnik",
    year: "1957",
    summary: "First artificial satellite",
  },
  {
    name: "Apollo 11",
    year: "1969",
    summary: "First humans on the Moon",
  },
  {
    name: "Voyager",
    year: "1977",
    summary: "Grand Tour of the outer planets",
  },
  {
    name: "Hubble",
    year: "1990",
    summary: "Space telescope transforms astronomy",
  },
  {
    name: "Cassini",
    year: "1997",
    summary: "Long-term study of Saturn",
  },
  {
    name: "Curiosity",
    year: "2012",
    summary: "Mars rover explores Gale Crater",
  },
  {
    name: "James Webb",
    year: "2021",
    summary: "Infrared view of the early universe",
  },
  {
    name: "Europa Clipper",
    year: "2024",
    summary: "Probe to Jupiter’s icy moon",
  },
];

export type MoonBody = {
  name: string;
  parent: "Earth" | "Jupiter" | "Saturn";
  /** scene units around the parent — NOT heliocentric AU */
  a: number;
  periodDays: number;
  phase: number;
  color: string;
};

export const PLACEHOLDER_MOONS: MoonBody[] = [
  {
    name: "Moon",
    parent: "Earth",
    a: 4, // visual distance from Earth
    periodDays: 27.3,
    phase: 0.5,
    color: "#cbd5e1",
  },
  {
    name: "Europa",
    parent: "Jupiter",
    a: 5,
    periodDays: 3.55,
    phase: 1.2,
    color: "#a8b4c8",
  },
  {
    name: "Titan",
    parent: "Saturn",
    a: 6,
    periodDays: 15.95,
    phase: 2.0,
    color: "#f59e0b",
  },
];

export const PARENT_META = {
  Earth: { color: "#38bdf8", radius: 1.4 },
  Jupiter: { color: "#fbbf24", radius: 2.2 },
  Saturn: { color: "#fcd34d", radius: 2.0 },
} as const;
