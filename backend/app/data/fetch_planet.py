import requests
import os
from dotenv import load_dotenv
import json
from app.schemas.planet_schemas import StructureIngest, StructureOut
from app.database import SessionLocal
from app.models.structure_model import Structure
from sqlalchemy import select
import asyncio
load_dotenv()



# Fetching mass, volume, name, gravity, average temperature, escape velocity
# Need distance, orbital period, atmosphere, resources

def fetch_structures():
    try:
        headers = {
            "Authorization": f"Bearer {os.getenv('STRUCTURE_API_KEY')}"
        }

        query_params = {
            "include": "id,name,gravity,avgTemp,escape,mass,vol",
            "filter[]": "isPlanet,eq,true",
            "exclude": "moons"
        }
        planet_response = requests.get(os.getenv('STRUCTURE_API_URL'), params=query_params, headers=headers)
        planet_response.raise_for_status()

        planet_data = planet_response.json()
        planet_dict = planet_data['bodies']
        result_list = []

        for idx, planet in enumerate(planet_dict):
            name = planet['englishName']
            api_url = 'https://api.api-ninjas.com/v1/planets?name={}'.format(name)
            response = requests.get(api_url, headers={'X-Api-Key': os.getenv('NINJA_API_KEY')})
            if response.status_code == requests.codes.ok:
                planet_temp = response.json()[0]
            else:
                print("Error:", response.status_code, response.text)
            keys_planet = ["mass", "vol", "gravity","escape"]
            keys_ninja = ["name", "period", "temperature", "distance_light_year"]
            combined_dict = {
                **{k: planet[k] for k in keys_planet if k in planet},
                **{k: planet_temp[k] for k in keys_ninja if k in planet_temp}
            }
            item = StructureIngest.model_validate(combined_dict)
            result_list.append(item)
        # print(result_list)
        return result_list
    except requests.exceptions.RequestException as e:
        print(f"Error fetching structures: {e}")
        return None

async def store_structures(result_list):
    try:
        async with SessionLocal() as session:
            for item in result_list:
                existing = await session.execute(
                    select(Structure).where(Structure.name == item.name)
                )
                if existing.scalar_one_or_none():
                    continue

                new_planet = Structure(name=item.name, mass=item.mass, volume=item.vol, gravity=item.gravity, escape=item.escape, temperature=item.temperature, period=item.period, distance=item.distance_light_year)
                session.add(new_planet)

            await session.commit()
                
    except Exception as e:
        print(f"Error storing structures: {e}")
        return None

async def get_structures():
    try:
        async with SessionLocal() as session:
            structures = await session.execute(select(Structure))
            return structures.scalars().all()
    except Exception as e:
        print(f"Error getting structures: {e}")
        return None

async def get_images():
    try: 
        image_urls = {
            "Mars": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN0Gjajlb0cuAuDDoUJ1_fPj9-7e3dTt3xQqeTV-9PLQ&s=10",
            "Mercury": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBPp4RT04cro_m6iGZXoZ1WIS81z6RZMztL8nIBKxIAijHHTy_CTbTCno&s=10",
        }
        async with SessionLocal() as session:
            for name, url in image_urls.items():
                result = await session.execute(
                    select(Structure).where(Structure.name == name)
                )
                structure = result.scalar_one_or_none()
                if structure is None:
                    continue
                structure.image_url = url
            await session.commit()
    except Exception as e:
        print(f"Error getting images: {e}")
        return None

async def add_data():
    try:
        new_data = {
            "Mercury": {
                "type_planet": "Terrestrial",
                "glow": "#a8a29e",
                "tagline": "Scorched and swift",
                "fact": "A Mercury day lasts longer than its year.",
            },
            "Venus": {
                "type_planet": "Terrestrial",
                "glow": "#f59e0b",
                "tagline": "Earth's veiled twin",
                "fact": "Venus spins backwards relative to most planets.",
            },
            "Earth": {
                "type_planet": "Terrestrial",
                "glow": "#38bdf8",
                "tagline": "Our blue harbor",
                "fact": "The only known world with liquid water at the surface.",
            },
            "Mars": {
                "type_planet": "Terrestrial",
                "glow": "#ef4444",
                "tagline": "The red frontier",
                "fact": "Olympus Mons is the tallest volcano in the solar system.",
            },
            "Jupiter": {
                "type_planet": "Gas Giant",
                "glow": "#fbbf24",
                "tagline": "King of storms",
                "fact": "The Great Red Spot is a storm larger than Earth.",
            },
            "Saturn": {
                "type_planet": "Gas Giant", 
                "glow": "#fcd34d",
                "tagline": "Lord of the rings",
                "fact": "Saturn is less dense than water — it would float in a giant bathtub.",
            },
            "Uranus": {
                "type_planet": "Ice Giant",
                "glow": "#67e8f9",
                "tagline": "The sideways world",
                "fact": "Uranus rotates on its side, tilted nearly 98°.",
            },
            "Neptune": {
                "type_planet": "Ice Giant",
                "glow": "#6366f1",
                "tagline": "The distant wind",
                "fact": "Neptune hosts the fastest winds in the solar system.",
            },
        }
        async with SessionLocal() as session:
            for name, data in new_data.items():
                result = await session.execute(
                    select(Structure).where(Structure.name == name)
                )
                structure = result.scalar_one_or_none()
                if structure is None:
                    continue
                structure.type_planet = data["type_planet"]
                structure.glow = data["glow"]
                structure.tagline = data["tagline"]
                structure.fact = data["fact"]
            await session.commit()
    except Exception as e:
        print(f"Error adding data: {e}")
        return None


if __name__ == "__main__":
    asyncio.run(add_data())