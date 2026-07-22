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
