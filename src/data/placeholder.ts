// src/data/placeholders.ts
export const missions = [
  {
    name: "Voyager 1",
    destination: "Interstellar Space",
    status: "Active",
    year: 1977,
  },
  {
    name: "Voyager 2",
    destination: "Interstellar Space",
    status: "Active",
    year: 1977,
  },
  { name: "Perseverance", destination: "Mars", status: "Active", year: 2020 },
  { name: "Curiosity", destination: "Mars", status: "Active", year: 2011 },
  {
    name: "Europa Clipper",
    destination: "Jupiter / Europa",
    status: "En Route",
    year: 2024,
  },
  {
    name: "James Webb Space Telescope",
    destination: "L2",
    status: "Active",
    year: 2021,
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

export const statuses = [
  {
    name: "Voyager 1",
    status: "Nominal",
    distance: "24.3B km",
    phase: "Interstellar cruise",
  },
  {
    name: "Perseverance",
    status: "Nominal",
    distance: "225M km",
    phase: "Surface ops",
  },
  {
    name: "Europa Clipper",
    status: "Cruise",
    distance: "480M km",
    phase: "Outbound",
  },
];

export const discoveries = [
  {
    title: "Organic molecules detected in Enceladus plumes",
    description:
      "Sample analysis expands the case for subsurface ocean chemistry.",
  },
  {
    title: "Ancient river channels mapped on Jezero crater rim",
    description:
      "High-resolution imagery refines Perseverance's sample strategy.",
  },
  {
    title: "JWST images a distant exoplanet atmosphere",
    description: "Spectral signatures point to water vapor and carbon dioxide.",
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
