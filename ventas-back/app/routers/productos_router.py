from fastapi import APIRouter
from sqlmodel import Session

from app.logic.productos_logic import ver_productos as ver_productos_logic
from app.logic.productos_logic import ver_top3 as ver_top3_logic
from app.dependencies.database import SessionDep
from app.model.schemas.productos_model import Producto, ProductoConCantidad

router = APIRouter(
    prefix="/productos",
    tags=["productos"],
    responses={404: {"descripción": "Producto no encontrado"}},
)


@router.get("/")
async def ver_productos(session: SessionDep) -> list[Producto]:
    """
    Endpoint para ver todos los productos registrados.

    :param session: La dependencia de la sesión.
    :type session: Session
    :return: Una lista de productos.
    """
    productos = await ver_productos_logic(session)
    return productos


@router.get("/top3")
async def ver_top3(session: SessionDep) -> list[ProductoConCantidad]:
    """
    Endpoint para ver los 3 productos más vendidos.

    :param session: La dependencia de la sesión.
    :type session: Session
    :return: Una lista de productos.
    """
    productos = await ver_top3_logic(session)
    return productos
