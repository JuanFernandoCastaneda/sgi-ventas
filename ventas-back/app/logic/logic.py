from sqlmodel import select
from dependencies.database import SessionDep
from model.schemas.ordenes_model import Orden, OrdenConProductos
from model.schemas.forma_pago_model import FormaPago
from model.schemas.productos_model import CantidadProductoCarrito, Producto
from model.schemas.detalles_model import DetalleOrden

async def ver_ordenes(session: SessionDep) -> list[OrdenConProductos]:
    """
    Devuelve todas las ordenes de la base de datos.
    """
    ids_ordenes = session.exec(select(Orden.id)).all()
    return [await ver_orden_por_id(id_orden, session) for id_orden in ids_ordenes]

async def ver_orden_por_id(orden_id: int, session: SessionDep) -> OrdenConProductos:
    """
    Devuelve la orden con el id pasado por parámetro. Incluye la lista de productos dentro de esa orden.
    """
    orden = session.get(Orden, orden_id)
    if orden is None:
        return None
    productos_orden = await ver_productos_orden(orden_id, session)
    return OrdenConProductos(**vars(orden), productos=productos_orden)


async def ver_productos_orden(id_orden: int, session: SessionDep) -> list[CantidadProductoCarrito] | None:
    """
    Devuelve la lista de productos de una orden con el id pasado por parámetro.
    Retorna None si no existe la orden.
    """
    orden = session.get(Orden, id_orden)
    if orden is None:
        return None

    statement = select(DetalleOrden, Producto).where(DetalleOrden.id_producto == Producto.id).where(DetalleOrden.id_orden == id_orden)
    results = session.exec(statement)
    
    listaProductos = []
    for detalle_orden, producto in results:
        # No es necesario hacerle deep copy.
        productoCarrito = CantidadProductoCarrito(**vars(producto), cantidad=detalle_orden.cantidad)
        listaProductos.append(productoCarrito)
    return listaProductos