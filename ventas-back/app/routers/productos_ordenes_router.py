from fastapi import APIRouter, Query, HTTPException
from app.dependencies.database import SessionDep
from app.logic.detalle_orden_logic import (
    crear_detalle_orden as crear_detalle_orden_logic,
    parchar_detalle_orden as parchar_producto_orden_logic,
)
from app.logic.ordenes_logic import ver_productos_orden as ver_productos_orden_logic
from app.model.schemas.detalles_model import DetalleOrden
from app.model.schemas.productos_model import CantidadProductoCarrito
from typing import Annotated

router = APIRouter(
    prefix="/ordenes",
    tags=["productos en órdenes"],
)


@router.get("/{id_orden}/productos")
async def ver_productos_orden(
    id_orden: int, session: SessionDep
) -> list[CantidadProductoCarrito]:
    """
    Endpoint para obtener todos los productos de una orden específica.

    :param id_orden: Identificador de la orden.
    :type id_orden: int
    :param session: La dependencia de la sesión.
    :type session: SessionDep
    :return: Lista de productos con sus cantidades asociadas a la orden.
    :rtype: list[CantidadProductoCarrito]
    :raises HTTPException: Si la orden no existe.
    """
    productos = await ver_productos_orden_logic(id_orden, session)
    if productos is None:
        raise HTTPException(status_code=404, detail="Orden no encontrada")
    return productos


@router.post("/{id_orden}/productos/{id_producto}")
async def agregar_producto_orden(
    id_orden: int,
    id_producto: int,
    cantidad: Annotated[int, Query(ge=0)],
    session: SessionDep,
) -> DetalleOrden:
    """
    Endpoint para agregar un producto a una orden existente.

    :param id_orden: Identificador de la orden.
    :type id_orden: int
    :param id_producto: Identificador del producto.
    :type id_producto: int
    :param cantidad: La cantidad del producto a agregar.
    :type cantidad: int
    :param session: La dependencia de la sesión.
    :type session: SessionDep
    :return: El detalle de la orden con el producto agregado.
    :rtype: DetalleOrden
    :raises HTTPException: Si no existe la orden o el producto.
    """
    nuevo_detalle = await crear_detalle_orden_logic(
        DetalleOrden(id_producto=id_producto, cantidad=cantidad, id_orden=id_orden),
        session,
    )
    if type(nuevo_detalle) == str:
        raise HTTPException(status_code=404, detail=nuevo_detalle)
    return nuevo_detalle


@router.patch("/{id_orden}/productos/{id_producto}")
async def parchar_producto_orden(
    id_orden: int,
    id_producto: int,
    cantidad_nueva: Annotated[int, Query(ge=0)],
    session: SessionDep,
) -> DetalleOrden:
    """
    Endpoint para actualizar la cantidad de un producto en una orden existente.

    :param id_orden: Identificador de la orden.
    :type id_orden: int
    :param id_producto: Identificador del producto.
    :type id_producto: int
    :param cantidad_nueva: La nueva cantidad del producto en la orden.
    :type cantidad_nueva: int
    :param session: La dependencia de la sesión.
    :type session: SessionDep
    :return: El detalle de la orden actualizado.
    :rtype: DetalleOrden
    :raises HTTPException: Si no existe la orden o el producto.
    """
    nuevo_detalle = await parchar_producto_orden_logic(
        id_orden, id_producto, cantidad_nueva, session
    )
    if type(nuevo_detalle) == str:
        raise HTTPException(status_code=404, detail=nuevo_detalle)
    return nuevo_detalle
