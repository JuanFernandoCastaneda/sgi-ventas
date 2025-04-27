from fastapi import APIRouter

router = APIRouter(
    prefix="/productos",
    tags=["productos"],
    #responses={404: {"descripción": "No encontrado"}},
)

