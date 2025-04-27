from fastapi import APIRouter
from dependencies.database import SessionDep
from logic.logic import ver_productos_orden as ver_productos_orden_logic
from models.productos_model import ProductoCantidad
from dependencies.database import SessionDep

router = APIRouter(
    prefix="/ordenes",
    tags=["ordenes"],
    responses={404: {"descripción": "No encontrado"}},
)

@router.get("/")
async def ver_ordenes(session: SessionDep):
    pass

@router.post("/")
async def crear_orden(session: SessionDep):
    pass

@router.get("/{id_orden}")
async def ver_orden_por_id(id_orden: str, session: SessionDep):
    pass

# Falta definir objeto orden acá
@router.put("/{id_orden}")
async def reemplazar_orden(id_orden: str, session: SessionDep):
    pass

@router.delete("/{id_orden}")
async def eliminar_orden(id_orden: str, session: SessionDep):
    pass

@router.get("/{id_orden}/productos")
async def ver_productos_orden(id_orden: int, session: SessionDep) -> list[ProductoCantidad]:
    productos = await ver_productos_orden_logic(id_orden, session)
    return productos