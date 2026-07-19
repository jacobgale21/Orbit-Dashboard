import type { LucideIcon } from "lucide-react";
import { Sun, Orbit, Activity, Radio, Globe, Telescope } from "lucide-react";
import type { Mission } from "@/api";
// src/data/placeholders.ts
export const placeholderMissions: Mission[] = [
  {
    id: "voyager-1",
    name: "Voyager 1",
    description:
      "NASA's farthest spacecraft, now exploring interstellar space beyond the heliosphere.",
    destination: "Interstellar Space",
    year: "1977",
    status: "Active",
    details: {
      Agency: "NASA",
      Distance: "24.3B km",
      Phase: "Interstellar cruise",
    },
    impact:
      "First human-made object to enter interstellar space and return data from beyond the solar wind.",
    distance: "24.3B km",
    phase: "Interstellar cruise",
  },
  {
    id: "voyager-2",
    name: "Voyager 2",
    description:
      "The only spacecraft to fly by Uranus and Neptune, now on an interstellar trajectory.",
    destination: "Interstellar Space",
    year: "1977",
    status: "Active",
    details: {
      Agency: "NASA",
      Flybys: "Jupiter → Saturn → Uranus → Neptune",
      Phase: "Interstellar cruise",
    },
    impact:
      "Completed the Grand Tour and remains the only probe to visit the ice giants up close.",
    distance: "24.3B km",
    phase: "Interstellar cruise",
  },
  {
    id: "perseverance",
    name: "Perseverance",
    description:
      "Mars rover searching for signs of ancient life and collecting samples for future return.",
    destination: "Mars",
    year: "2020",
    status: "Active",
    details: {
      Agency: "NASA / JPL",
      Distance: "225M km",
      Phase: "Surface ops",
    },
    impact:
      "Caching Mars rock cores and flying Ingenuity, the first powered aircraft on another planet.",
    distance: "225M km",
    phase: "Surface ops",
  },
  {
    id: "curiosity",
    name: "Curiosity",
    description:
      "Long-running Mars Science Laboratory rover studying Gale Crater's habitability.",
    destination: "Mars",
    year: "2011",
    status: "Active",
    details: {
      Agency: "NASA / JPL",
      Landing: "Gale Crater",
      Phase: "Surface ops",
    },
    impact: "Confirmed Mars once had conditions suitable for microbial life.",
    distance: "225M km",
    phase: "Surface ops",
  },
  {
    id: "europa-clipper",
    name: "Europa Clipper",
    description:
      "Mission to assess Europa's ice shell and subsurface ocean as a potential habitat.",
    destination: "Jupiter / Europa",
    year: "2024",
    status: "En Route",
    details: {
      Agency: "NASA",
      Distance: "480M km",
      Phase: "Outbound",
    },
    impact:
      "Will map Europa's ocean and ice to guide the search for habitability in the outer solar system.",
    distance: "480M km",
    phase: "Outbound",
  },
  {
    id: "jwst",
    name: "James Webb Space Telescope",
    description:
      "Infrared observatory studying the early universe, exoplanets, and star formation from L2.",
    destination: "L2",
    year: "2021",
    status: "Active",
    details: {
      Agency: "NASA / ESA / CSA",
      Orbit: "Sun–Earth L2",
      Wavelength: "Infrared",
    },
    impact:
      "Delivered the deepest infrared views of the cosmos and transformed exoplanet atmosphere science.",
    distance: "1.5M km",
    phase: "Orbiting Earth",
  },
];

export const timeline = [
  "Sputnik",
  "Apollo 11",
  "Voyager",
  "Hubble",
  "Cassini",
  "Curiosity",
  "James Webb",
  "Europa Clipper",
];

export type Discovery = {
  title: string;
  subtitle: string;
  year: string;
  icon: LucideIcon;
  color: string;
  glow: string;
  description: string;
  impact: string;
  details: Record<string, string>;
};
export const discoveries: Discovery[] = [
  {
    title: "Heliocentrism",
    subtitle: "The Sun Takes Center Stage",
    year: "1543",
    icon: Sun,
    color: "#f59e0b",
    glow: "#fbbf24",
    description:
      "Copernicus placed the Sun, not Earth, at the center of the solar system — a shift that redefined humanity's place in the cosmos.",
    impact: "Sparked the Scientific Revolution and modern astronomy.",
    details: {
      Pioneer: "Nicolaus Copernicus",
      Work: "De revolutionibus orbium coelestium",
      Shift: "Earth orbits the Sun",
    },
  },
  {
    title: "Expanding Universe",
    subtitle: "Galaxies Racing Apart",
    year: "1929",
    icon: Orbit,
    color: "#ec4899",
    glow: "#f472b6",
    description:
      "Hubble showed that distant galaxies are receding, and the farther they are, the faster they move — evidence that space itself is stretching.",
    impact: "Laid the foundation for Big Bang cosmology.",
    details: {
      Pioneer: "Edwin Hubble",
      Law: "v = H₀ × d",
      Implication: "Universe had a beginning",
    },
  },
  {
    title: "General Relativity",
    subtitle: "Gravity as Geometry",
    year: "1915",
    icon: Activity,
    color: "#8b5cf6",
    glow: "#a78bfa",
    description:
      "Einstein's theory describes gravity not as a force, but as the curvature of spacetime caused by mass and energy.",
    impact: "Enables GPS, black-hole science, and cosmology.",
    details: {
      Pioneer: "Albert Einstein",
      Core: "Mass curves spacetime",
      Test: "1919 solar eclipse",
    },
  },
  {
    title: "Cosmic Microwave Background",
    subtitle: "The Echo of the Big Bang",
    year: "1964",
    icon: Radio,
    color: "#06b6d4",
    glow: "#67e8f9",
    description:
      "A faint glow of microwave radiation fills the universe, leftover from when the cosmos became transparent about 380,000 years after the Big Bang.",
    impact: "The strongest evidence for the Big Bang theory.",
    details: {
      Founders: "Penzias & Wilson",
      Temperature: "2.725 K",
      Origin: "Recombination era",
    },
  },
  {
    title: "Exoplanets",
    subtitle: "Worlds Beyond Our Sun",
    year: "1995",
    icon: Globe,
    color: "#10b981",
    glow: "#34d399",
    description:
      "The first confirmed planet orbiting a sun-like star opened the floodgates to thousands of detected worlds across the galaxy.",
    impact: "Changed the search for life beyond Earth.",
    details: {
      First: "51 Pegasi b",
      Method: "Radial velocity",
      Count: "5,000+ confirmed",
    },
  },
  {
    title: "Gravitational Waves",
    subtitle: "Ripples in Spacetime",
    year: "2015",
    icon: Telescope,
    color: "#3b82f6",
    glow: "#60a5fa",
    description:
      "LIGO detected tiny vibrations from merging black holes, opening a brand-new way to observe the universe beyond light.",
    impact: "Launched the era of multi-messenger astronomy.",
    details: {
      Detectors: "LIGO / Virgo",
      Source: "Black-hole merger",
      Signal: "GW150914",
    },
  },
];

export const destinations = [
  "Moon",
  "Mars",
  "Asteroid Belt",
  "Jupiter",
  "Saturn",
  "Uranus",
  "Neptune",
  "Interstellar Space",
];
