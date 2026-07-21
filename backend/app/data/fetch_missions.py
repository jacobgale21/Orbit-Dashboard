import requests
import os
from dotenv import load_dotenv
from sqlalchemy import select
import asyncio
from app.database import SessionLocal
from pathlib import Path
import json
from app.models.mission_model import Mission
import datetime

load_dotenv()
async def fetch_missions():
   try:
      MISSION_NAMES = [{"name": "Curiosity", "ID": "2011-070"}, {"name": "James Webb Space Telescope", "ID": "2021-130"}, {"name": "Europa Clipper", "ID": "2024-182"}, {"name": "Perseverance", "ID": "2020-052"}]
        
      result_list = []

      for mission in MISSION_NAMES:
            response = requests.get(
                os.getenv("MISSION_API_URL"),
                params={
                    "launch_designator": mission["ID"],
                    "limit": 1
                }
            )
            
            if not response.ok:
                print(mission["name"], response.status_code, response.text)
                continue

            data = response.json()

            if not data.get("results"):

                continue
            launch = data["results"][0]

            mission = {
               "external_id": launch.get("id"),
               "name": (launch.get("mission") or {}).get("name") or launch.get("name"),

               "image_url": (launch.get("image") or {}).get("image_url"),
               "thumbnail_url": (launch.get("image") or {}).get("thumbnail_url"),

               "status": (launch.get("status") or {}).get("name"),
               "launch_date": launch.get("net"),
               "description": (launch.get("mission") or {}).get("description"),

               "agency": (launch.get("launch_service_provider") or {}).get("name"),
               "rocket": (
                  ((launch.get("rocket") or {}).get("configuration") or {}).get("full_name")
               ),
               "destination": (
                  (
                        ((launch.get("mission") or {}).get("orbit") or {}).get("celestial_body")
                        or {}
                  ).get("name")
               ),
               "launch_site": (
                  ((launch.get("pad") or {}).get("location") or {}).get("name")
               ),
            }
            out_path = Path(__file__).with_name("missions_result.json")
            out_path.write_text(json.dumps(mission, indent=2, default=str), encoding="utf-8")
            print(f"Saved mission to {out_path}")
            result_list.append(mission)
      return result_list
   except Exception as e:
        print(f"Error fetching missions: {e}")
        return None

async def store_missions(result_list = None, mission_data_path = None):
    try:
      async with SessionLocal() as session:
         if result_list:
            for mission in result_list:
               existing = await session.execute(
                  select(Mission).where(Mission.name == mission.name)
               )
               if existing.scalar_one_or_none():
                  continue
               new_mission = Mission(name=mission.name, image_url=mission.image_url, thumbnail_url=mission.thumbnail_url, status=mission.status, launch_date=mission.launch_date, description=mission.description, agency=mission.agency, rocket=mission.rocket, destination=mission.destination, launch_site=mission.launch_site)
               session.add(new_mission)
            await session.commit()
         elif mission_data_path:
            with open(mission_data_path, "r") as file:
               mission_data = json.load(file)
            for mission in mission_data:
               existing = await session.execute(
                  select(Mission).where(Mission.name == mission['name'])
               )
               if existing.scalar_one_or_none():
                  continue
               new_mission = Mission(external_id=mission['external_id'], 
                  name=mission['name'], 
                  image_url=mission['image_url'], 
                  thumbnail_url=mission['thumbnail_url'], 
                  status=mission['status'], 
                  launch_date=datetime.datetime.strptime(mission['launch_date'], "%Y-%m-%dT%H:%M:%SZ"), 
                  description=mission['description'], 
                  agency=mission['agency'], 
                  rocket=mission['rocket'], 
                  destination=mission['destination'],
                  launch_site=mission['launch_site']
               )
               session.add(new_mission)
            await session.commit()
    except Exception as e:
        print(f"Error storing missions: {e}")
        return None


if __name__ == "__main__":
   print(asyncio.run(store_missions(mission_data_path=Path(__file__).with_name("mission_data.json"))))
