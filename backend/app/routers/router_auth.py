from fastapi import APIRouter

router = APIRouter()


@router.get("/")
async def read_root():
    return {"message": "Hello, World!"}


@router.post("/register")
async def register():
    return {"message": "User logged in successfully"}

@router.post("/login")
async def login():
    return {"message": "User logged out successfully"}