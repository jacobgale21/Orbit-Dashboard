from sqlalchemy import select
import asyncio
from app.database import SessionLocal
from pathlib import Path
import json
from app.models.discovery_model import Discovery

async def fetch_discoveries(discoveries_data_path):
    try:
        async with SessionLocal() as session:
            with open(discoveries_data_path, "r") as file:
                discoveries_data = json.load(file)
            for discovery in discoveries_data:
                existing = await session.execute(
                    select(Discovery).where(Discovery.name == discovery['title'])
                )
                if existing.scalar_one_or_none():
                    continue
                new_discovery = Discovery(
                    name=discovery['title'], 
                    subtitle=discovery['subtitle'],
                    year=discovery['year'],
                    icon=discovery['icon'],
                    color=discovery['color'],
                    glow=discovery['glow'],
                    description=discovery['description'], 
                    impact=discovery['impact'], 
                    details=discovery['details']
                )
                session.add(new_discovery)
            await session.commit()
    except Exception as e:
        print(f"Error fetching discoveries: {e}")


if __name__ == "__main__":
    print(asyncio.run(fetch_discoveries(discoveries_data_path=Path(__file__).with_name("discoveries_data.json"))))