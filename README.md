# Orbit Dashboard

An interactive platform for exploring humanity’s journey beyond Earth — missions, destinations, discoveries, and simulations across the Solar System, with a long-term focus on the path toward deep-space exploration and colonization.

## What this project is

**Orbit** is a full-stack web app that turns public space data into a navigable experience:

- **Dashboard** — missions, timelines, planetary destinations, moons, and major discoveries
- **Voyage Simulator** — a solar-system map with time scrubbing and planet/moon subsystem views
- **Mission Roadblocks Map** — engineering barriers between LEO and crewed Mars exploration
- **Future roadmap** — technology gaps and milestones toward sustained presence beyond Earth

The goal is not only to display facts, but to help people **see** how exploration, technology readiness, and destinations connect — from today’s flights to tomorrow’s settlements.

## What we’re targeting

| Near term                                                     | Longer term                                                                |
| ------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Educate and inspire with accurate, readable space data        | Model realistic transfer / voyage planning                                 |
| Visualize the Solar System and key moons                      | Support “what if” exploration scenarios                                    |
| Surface hard engineering roadblocks (TRL, logistics, biology) | Map a credible path toward colonization of the Moon, Mars, and beyond      |
| Give authenticated users a personal exploration hub           | Add assistants and personalized tools (chatbot, saved itineraries, alerts) |

## Features (current)

- **Auth** — register / login and a protected dashboard experience
- **Missions** — launch heritage, status, agency, sites, imagery
- **Destinations** — planets with physical stats and 3D texture globes
- **Moons** — curated bodies (e.g. Moon, Europa, Titan) with dossiers
- **Discoveries** — milestones that reshaped how we understand space
- **Simulator (`/simulator`)** — heliocentric map, timeline controls, Earth/Jupiter/Saturn subsystem views
- **Roadblocks map (`/map`)** — interactive path of challenges for human Mars exploration
- **Future (`/future`)** — roadmap and technology-gap framing for what comes next

## Tech stack

| Layer    | Stack                                                           |
| -------- | --------------------------------------------------------------- |
| Frontend | React, TypeScript, Vite, Tailwind CSS, React Router             |
| 3D       | Three.js, React Three Fiber, Drei                               |
| Backend  | FastAPI, SQLAlchemy, Alembic                                    |
| Data     | PostgreSQL (e.g. Neon), seeded / fetched from public space APIs |

## Simulations

The voyage simulator is a **visualization + approximate orbital model**, not a flight-certified ephemeris tool.

**What it does today**

- Places planets using semi-major axis, period, and related orbital fields
- Scrubs / plays time relative to a reference epoch (e.g. days since 2000-01-01)
- Opens local **subsystem** views so moons aren’t forced onto the Sun-centered scale
- Scales body sizes for readability (true scale would make planets invisible)

**Limits of the physics model**

- Circular / simplified Keplerian motion; not full n-body dynamics
- Epoch alignment depends on having correct mean longitude / phase data
- Visual scales (AU layout, body radii) are exaggerated for UI clarity
- Transfer arcs / Δv / launch windows are on the roadmap, not fully productized yet

Treat positions and timelines as **educational approximations** unless labeled otherwise.

## Current limitations

- Some destination / moon textures or equirectangular maps may be incomplete
- Not all Solar System bodies are modeled (focus on planets + selected moons)
- Performance can degrade if many WebGL canvases run at once (prefer dedicated simulator pages)
- Mission and discovery content may mix live API data with curated seed fields
- No chatbot or advanced personalization yet
- Colonization / settlement tooling is conceptual (roadmap UI), not a full planning suite

## Roadmap — exploration → colonization

1. **Strengthen the living atlas** — richer body data, moons, better textures, arrival dossiers
2. **Voyage planning** — Hohmann / transfer sketches, Δv and duration estimates, craft classes
3. **Mission intelligence** — deeper roadblocks, TRL tracking, linked tech gaps
4. **Future systems** — expandable roadmap from cislunar → Mars → outer system presence
5. **Orbit Assistant (chatbot)** — Q&A over missions, destinations, and “how do we get there?” using project data
6. **User-oriented features** — saved destinations/voyages, notes, alerts for launch windows, profiles
7. **Colonization framing** — habitats, ISRU, radiation, logistics — as structured scenarios, not science fiction wallpaper

## Getting started

### Frontend

```bash
pnpm install
pnpm dev
```
