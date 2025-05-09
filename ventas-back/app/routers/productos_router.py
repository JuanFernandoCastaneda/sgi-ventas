from fastapi import APIRouter
from app.dependencies.database import SessionDep
from app.logic.productos_logic import ver_productos as ver_productos_logic
from app.logic.productos_logic import ver_top3 as ver_top3_logic

router = APIRouter(
    prefix="/productos",
    tags=["productos"],
    responses={404: {"descripción": "Producto no encontrado"}},
)


@router.get("/")
async def ver_productos(session: SessionDep):
    """
    Endpoint para ver todos los productos registrados.

    :param session: La dependencia de la sesión.
    :type session: SessionDep
    :return: Una lista de productos.
    """
    productos = await ver_productos_logic(session)
    return productos


@router.get("/top3")
async def ver_top3(session: SessionDep):
    """
    Endpoint para ver los 3 productos más vendidos.

    :param session: La dependencia de la sesión.
    :type session: SessionDep
    :return: Una lista de productos.
    """
    productos = await ver_top3_logic(session)
    return productos
