from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import router_auth
from app.routers import router_planet
from app.routers import router_missions
from app.routers import router_discoveries
app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router_auth.router)
app.include_router(router_discoveries.router)
app.include_router(router_planet.router)
app.include_router(router_missions.router)