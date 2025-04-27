from fastapi import APIRouter, HTTPException
from logic.logic import ver_productos_orden as ver_productos_orden_model
from models.detalles_model import DetalleOrden
from dependencies.database import SessionDep

router = APIRouter(
    prefix="/productos",
    tags=["productos"],
    #responses={404: {"descripción": "No encontrado"}},
)

@router.get("/{id_orden}")
async def ver_productos_orden(id_orden: int) -> list[DetalleOrden]:
    productos = await ver_productos_orden_model(id_orden)
    if not productos:
        raise HTTPException(status_code=404, detail="No se encontraron productos para la orden")
    return productos