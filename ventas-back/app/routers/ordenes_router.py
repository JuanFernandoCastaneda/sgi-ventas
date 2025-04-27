from fastapi import APIRouter
from dependencies.database import SessionDep
from logic.logic import ver_productos_orden as ver_productos_orden_logic
from model.schemas.productos_model import CantidadProductoCarrito
from dependencies.database import SessionDep
from logic.logic import ver_orden_por_id as ver_orden_por_id_logic
from fastapi import HTTPException

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
    """
    Devuelve la orden con el id pasado por parámetro. Incluye la lista de productos dentro de esa orden.
    """
    orden = await ver_orden_por_id_logic(id_orden, session)
    if orden is None:
        raise HTTPException(status_code=404, detail="Orden no encontrada")
    return orden

# Falta definir objeto orden acá
@router.put("/{id_orden}")
async def reemplazar_orden(id_orden: str, session: SessionDep):
    pass

@router.delete("/{id_orden}")
async def eliminar_orden(id_orden: str, session: SessionDep):
    pass

@router.get("/{id_orden}/productos")
async def ver_productos_orden(id_orden: int, session: SessionDep) -> list[CantidadProductoCarrito]:
    productos = await ver_productos_orden_logic(id_orden, session)
    if productos is None:
        raise HTTPException(status_code=404, detail="Orden no encontrada")
    return productos