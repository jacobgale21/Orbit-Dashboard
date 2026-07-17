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


if __name__ == "__main__":
    # result_list = fetch_structures()
    # if result_list:
    #     asyncio.run(store_structures(result_list))
    structures = asyncio.run(get_structures())
    for structure in structures:
        print(StructureOut.model_validate(structure).model_dump_json())