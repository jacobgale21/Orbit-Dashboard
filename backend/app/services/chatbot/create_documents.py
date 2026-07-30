from app.schemas.planet_schemas import StructureDocument
from app.schemas.mission_schemas import MissionDocument
from app.schemas.discovery_schemas import DiscoveryDocument

# Technology json entity to document in roadmap
def technology_to_document(entity):
    c = entity["content"]

    return f"""
Title: {entity['title']}

Entity Type: Technology

Summary:
{entity['summary']}

Category:
{c['category']}

Technology Readiness:
{c['readiness']}

Development Progress:
{c['progress']}%

Primary Challenge:
{c['challenge']}

Potential Impact:
{c['impact']}

Related Milestones:
{", ".join(entity['relationships'])}
""".strip()

# Future Theory (milestone) json entity to document in roadmap
def future_theory_to_document(entity):
    c = entity["content"]
    return f"""
Title: {entity['title']}

Entity Type: Future Theory

Summary:
{entity['summary']}

Timeframe:
{c['timeframe']}

Focus:
{", ".join(c['focus'])}

Relationships:
{", ".join(entity['relationships'])}
""".strip()



# Roadblock json entity to document
def roadblock_to_document(entity):
    return f"""
Title: {entity['title']}

Entity Type: Roadblock

Problem:
{entity['problem']}

Solutions:
{", ".join(entity['solutions'])}

Organizations:
{", ".join(entity['organizations'])}

Future:
{", ".join(entity['future'])}
""".strip()

# Structure db model to document
def structures_to_documents(entity: StructureDocument):
    return f"""
    Title: {entity.name}

    Entity Type: Structure

    Mass: {entity.mass['massValue']} * 10 ** {entity.mass['massExponent']} kg
    Volume: {entity.volume['volValue']} * 10 ** {entity.volume['volExponent']} km³
    Gravity: {entity.gravity} m/s²
    Escape Velocity: {entity.escape} km/s
    Temperature: {entity.temperature} K
    Period: {entity.period} days
    Distance: {entity.distance} light years
    Planet Type: {entity.type_planet}
    Tagline: {entity.tagline}
    Fact: {entity.fact}
    Radius: {entity.radius} km
    Semimajoraxis: {entity.semimajoraxis}
    Eccentricity: {entity.eccentricity}
    Inclination: {entity.inclination}""".strip()

def missions_to_documents(entity: MissionDocument):
    return f"""
    Title: {entity.name}

    Entity Type: Mission

    Status: {entity.status}
    Launch Date: {entity.launch_date}
    Description: {entity.description}
    Agency: {entity.agency}
    Rocket: {entity.rocket}
    Destination: {entity.destination}
    Launch Site: {entity.launch_site}""".strip()

def discoveries_to_documents(entity: DiscoveryDocument):
    return f"""
    Title: {entity.name}

    Entity Type: Discovery

    Subtitle: {entity.subtitle}
    Year: {entity.year}
    Description: {entity.description}
    Impact: {entity.impact}
    Details: {", ".join(f"{key}: {value}" for key, value in entity.details.items())
}""".strip()
