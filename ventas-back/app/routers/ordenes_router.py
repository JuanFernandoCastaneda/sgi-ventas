from fastapi import APIRouter, HTTPException
from app.dependencies.database import SessionDep
from app.logic.ordenes_logic import (
    ver_orden_por_id as ver_orden_por_id_logic,
    ver_ordenes as ver_ordenes_logic,
    crear_orden as crear_orden_logic,
    eliminar_orden as eliminar_orden_logica,
    reemplazar_orden as reemplazar_orden_logica,
)
from app.model.schemas.ordenes_model import (
    OrdenConProductosPublic,
    OrdenConProductosCreate,
)

router = APIRouter(
    prefix="/ordenes",
    tags=["ordenes"],
    responses={404: {"descripción": "No encontrado"}},
)


@router.get("/")
async def ver_ordenes(session: SessionDep):
    """
    Endpoint para ver todas las órdenes registradas.

    :param session: La dependencia de la sesión.
    :type session: SessionDep
    :return: Una lista de órdenes.
    """
    ordenes = await ver_ordenes_logic(session)
    return ordenes


@router.post("/")
async def crear_orden(
    orden: OrdenConProductosCreate, session: SessionDep
) -> OrdenConProductosPublic:
    """
    Endpoint para crear una nueva orden.

    :param orden: Los productos de la orden a crear.
    :type orden: OrdenConProductosCreate
    :param session: La dependencia de la sesión.
    :type session: SessionDep
    :return: La orden creada con sus productos.
    :rtype: OrdenConProductosPublic
    :raise HTTPException: Si algún producto no existe.
    """
    nueva_orden = await crear_orden_logic(orden, session)
    if isinstance(nueva_orden, str):
        if nueva_orden == "La cantidad debe ser mayor a 0":
            raise HTTPException(status_code=422, detail=nueva_orden)
        else:
            raise HTTPException(
                status_code=404,
                detail=nueva_orden,
            )
    return nueva_orden


@router.get("/{id_orden}")
async def ver_orden_por_id(id_orden: int, session: SessionDep):
    """
    Endpoint para ver una orden específica junto con sus productos.

    :param id_orden: Identificador de la orden.
    :type id_orden: str
    :param session: La dependencia de la sesión.
    :type session: SessionDep
    :return: La orden con sus productos.
    :raise HTTPException: Si no se encuentra la orden.
    """
    orden = await ver_orden_por_id_logic(id_orden, session)
    if orden is None:
        raise HTTPException(status_code=404, detail="Orden no encontrada")
    return orden


@router.put("/{id_orden}")
async def reemplazar_orden(
    id_orden: int, orden: OrdenConProductosCreate, session: SessionDep
) -> OrdenConProductosPublic:
    """
    Endpoint para reemplazar los productos de una orden existente.
    No reemplaza la lista de sus productos, solo la información complementaria.

    :param id_orden: Identificador de la orden.
    :type id_orden: str
    :param orden: Los nuevos productos de la orden.
    :type orden: OrdenConProductosCreate
    :param session: La dependencia de la sesión.
    :type session: SessionDep
    :return: La orden actualizada.
    :raise HTTPException: Si no se encuentra la orden.
    """
    print(orden)
    orden_actualizada = await reemplazar_orden_logica(id_orden, orden, session)
    if isinstance(orden_actualizada, str):
        raise HTTPException(status_code=404, detail=orden_actualizada)
    return orden_actualizada


@router.delete("/{id_orden}")
async def eliminar_orden(id_orden: int, session: SessionDep):
    """
    Endpoint para eliminar una orden registrada.

    :param id_orden: Identificador de la orden.
    :type id_orden: str
    :param session: La dependencia de la sesión.
    :type session: SessionDep
    :return: True si la orden fue eliminada.
    :rtype: bool
    :raise HTTPException: Si no se encuentra la orden.
    """
    eliminado = await eliminar_orden_logica(id_orden, session)
    if not eliminado:
        raise HTTPException(status_code=404, detail="Orden no encontrada")
    return True
