import requests
import os
from dotenv import load_dotenv
from sqlalchemy import select
import asyncio
from app.database import SessionLocal

load_dotenv()
# async def fetch_missions():
#     try:
#         MISSION_NAMES = [
#         "Sputnik 1",
#         "Apollo 11",
#         "Voyager 1",
#         "Voyager 2",
#         "Hubble Space Telescope",
#         "Cassini",
#         "Curiosity",
#         "James Webb Space Telescope",
#         "Europa Clipper",
#         "Perseverance",
#         ]
        

#         result_list = []

#         for mission_name in MISSION_NAMES:
#             response = requests.get(
#                 os.getenv("MISSION_API_URL"),
#                 params={
#                     "search": mission_name,
#                     "limit": 1
#                 }
#             )
#             print(response.json())
#             if not response.ok:
#                 print(mission_name, response.status_code, response.text)
#                 continue

#             data = response.json()

#             if not data.get("results"):
#                 continue

#             launch = data["results"][0]

#             mission = {
#                 "external_id": launch.get("id"),
#                 "name": launch.get("mission", {}).get("name") or launch.get("name"),
#                 "slug": launch.get("slug"),

#                 "image_url": launch.get("image", {}).get("image_url"),
#                 "thumbnail_url": launch.get("image", {}).get("thumbnail_url"),
#                 "image_credit": launch.get("image", {}).get("credit"),
#                 "image_license": launch.get("image", {}).get("license", {}).get("name"),

#                 "status": launch.get("status", {}).get("name"),
#                 "launch_date": launch.get("net"),
#                 "description": launch.get("mission", {}).get("description"),

#                 "agency": launch.get("launch_service_provider", {}).get("name"),
#                 "rocket": launch.get("rocket", {})
#                                 .get("configuration", {})
#                                 .get("full_name"),

#                 "destination": launch.get("mission", {})
#                                     .get("orbit", {})
#                                     .get("celestial_body", {})
#                                     .get("name"),

#                 "launch_site": launch.get("pad", {})
#                                     .get("location", {})
#                                     .get("name"),
#             }

#             result_list.append(mission)

#         return result_list
    
#     except Exception as e:
#         print(f"Error fetching missions: {e}")
#         return None


if __name__ == "__main__":
   print(asyncio.run(fetch_missions()))

