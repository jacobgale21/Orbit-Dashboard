from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import router_auth
from app.routers import router_planet
app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router_auth.router)

app.include_router(router_planet.router)