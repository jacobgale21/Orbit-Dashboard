from app.schemas.planet_schemas import StructureDocument
from app.schemas.mission_schemas import MissionDocument
from app.schemas.discovery_schemas import DiscoveryDocument

def technology_to_document(entity):
    c = entity["content"]
    related = ", ".join(entity["relationships"]) if entity.get("relationships") else "none listed"

    return f"""
{entity['title']} is a technology in the category of {c['category']}.
{entity['summary']}

Its current technology readiness level is described as {c['readiness']},
with development progress around {c['progress']}%.
The primary challenge is {c['challenge']}.
If successful, the potential impact is {c['impact']}.
It relates to these milestones: {related}.
""".strip()


def future_theory_to_document(entity):
    c = entity["content"]
    focus = ", ".join(c["focus"]) if c.get("focus") else "not specified"
    related = ", ".join(entity["relationships"]) if entity.get("relationships") else "none listed"

    return f"""
{entity['title']} is a future exploration milestone.
{entity['summary']}

This idea is associated with the timeframe of {c['timeframe']}.
Its main areas of focus are {focus}.
It connects to these related topics: {related}.
""".strip()


def roadblock_to_document(entity):
    solutions = ", ".join(entity["solutions"]) if entity.get("solutions") else "none listed"
    orgs = ", ".join(entity["organizations"]) if entity.get("organizations") else "none listed"
    future = ", ".join(entity["future"]) if entity.get("future") else "none listed"

    return f"""
{entity['title']} is a major roadblock to deeper space exploration.
The core problem is {entity['problem']}.

Possible solutions include {solutions}.
Organizations working on this challenge include {orgs}.
Looking ahead, relevant future directions include {future}.
""".strip()


def structures_to_documents(entity: StructureDocument):
    mass = (
        f"{entity.mass['massValue']} × 10^{entity.mass['massExponent']} kg"
        if entity.mass else "unknown"
    )
    volume = (
        f"{entity.volume['volValue']} × 10^{entity.volume['volExponent']} km³"
        if entity.volume else "unknown"
    )

    return f"""
{entity.name} is a {entity.type_planet or 'solar system body'}.
{entity.tagline or ''}
{entity.fact or ''}

It has a mass of about {mass} and a volume of about {volume}.
Surface gravity is roughly {entity.gravity} m/s², with an escape velocity of {entity.escape} km/s.
The average temperature is around {entity.temperature} K.
Its orbital period is about {entity.period} days, {f'at a distance of {entity.distance} (in the dataset\'s distance units)' if entity.distance else ''}.
The body has a radius of about {entity.radius} km, a semimajor axis of {entity.semimajoraxis},
an eccentricity of {entity.eccentricity}, and an inclination of {entity.inclination} degrees.
""".strip()


def missions_to_documents(entity: MissionDocument):
    return f"""
{entity.name} is a space mission operated by {entity.agency or 'an unspecified agency'}.
Its current status is {entity.status or 'unknown'}.
It launched (or is scheduled) on {entity.launch_date}, using the {entity.rocket or 'unspecified'} rocket
from {entity.launch_site or 'an unspecified launch site'}, with a destination of {entity.destination or 'unknown'}.

Mission overview:
{entity.description or 'No description available.'}
""".strip()


def discoveries_to_documents(entity: DiscoveryDocument):
    details = (
        "; ".join(f"{key} is {value}" for key, value in entity.details.items())
        if entity.details else "No additional details are available."
    )

    return f"""
{entity.name} is a space discovery{f' from {entity.year}' if entity.year else ''}.
{entity.subtitle or ''}
{entity.description or ''}

The impact of this discovery is {entity.impact or 'not specified'}.
Additional details: {details}
""".strip()