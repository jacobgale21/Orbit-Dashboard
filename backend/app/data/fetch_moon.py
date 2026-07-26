import requests
import os
from dotenv import load_dotenv
import json
# from app.schemas.planet_schemas import StructureIngest, StructureOut
from app.database import SessionLocal
from app.models.structure_model import Structure
from sqlalchemy import select
import asyncio

load_dotenv()

async def fetch_moons():
    try:
        headers = {
            "Authorization": f"Bearer {os.getenv('STRUCTURE_API_KEY')}"
        }

        query_params = [
            ("filter[]", "englishName,eq,Moon"),
            ("filter[]", "englishName,eq,Europa"),
            ("filter[]", "englishName,eq,Titan"),
            ("satisfy", "any"),
        ]
        planet_response = requests.get(os.getenv('STRUCTURE_API_URL'), params=query_params, headers=headers)
        planet_response.raise_for_status()

        planet_data = planet_response.json()
        planet_dict = planet_data['bodies']
        return planet_dict
    except Exception as e:
        print(f"Error fetching moons: {e}")
        return None

async def store_moons(planet_dict):
    try:
        async with SessionLocal() as session:
            for moon in planet_dict:
                new_planet = Structure(
                    name=moon['englishName'],
                    gravity=moon['gravity'],
                    temperature=moon['avgTemp'],
                    escape=moon['escape'],
                    mass=moon['mass'],
                    volume=moon['vol'],
                    semimajoraxis=moon['semimajorAxis'],
                    eccentricity=moon['eccentricity'],
                    inclination=moon['inclination'],
                )
                session.add(new_planet)
            await session.commit()
    except Exception as e:
        print(f"Error storing moons: {e}")
        return None

async def store_moons_data():
    try:
        with open("./app/data/moon_data.json", "r", encoding="utf-8") as file:
            moon_data = json.load(file)

        async with SessionLocal() as session:
            for name, data in moon_data.items():
                result = await session.execute(
                    select(Structure).where(Structure.name == name)
                )
                structure = result.scalar_one_or_none()
                if structure is None:
                    print(f"No structure named {name!r} — run store_moons first")
                    continue

                structure.period = data["period"]
                structure.type_planet = data["type_planet"]
                structure.glow = data["glow"]
                structure.tagline = data["tagline"]
                structure.fact = data["fact"]
                structure.radius = data["radius"]
            await session.commit()
    except Exception as e:
        print(f"Error storing moons data: {e}")
        return None

async def add_api_data():
    try:
        async with SessionLocal() as session:
            moons = await fetch_moons()
            for moon in moons:
                result = await session.execute(
                    select(Structure).where(Structure.name == moon['englishName'])
                )
                structure = result.scalar_one_or_none()
                if structure is None:
                    continue
                structure.radius = moon['equaRadius']
            await session.commit()
    except Exception as e:
        print(f"Error adding api data: {e}")
        return None

if __name__ == "__main__":
    asyncio.run(add_api_data())