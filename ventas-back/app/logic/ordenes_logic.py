from sqlmodel import select
from app.dependencies.database import SessionDep
from app.model.schemas.ordenes_model import Orden, OrdenConProductos, OrdenConDetalle
from app.model.schemas.forma_pago_model import FormaPago
from app.model.schemas.productos_model import CantidadProductoCarrito, Producto
from app.model.schemas.detalles_model import DetalleOrden
from app.logic.detalle_orden_logic import crear_o_actualizar_detalle_orden
from decimal import Decimal

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

async def crear_orden(orden: OrdenConDetalle, session: SessionDep) -> OrdenConProductos | None:
    """
    Crea una orden en la base de datos, esta debe incluir sus productos.
    """
    orden_sin_productos = Orden(observaciones=orden.observaciones, fecha_facturacion=orden.fecha_facturacion, id_forma_pago=orden.id_forma_pago, descuento=orden.descuento)
    session.add(orden_sin_productos)
    session.commit()
    session.refresh(orden_sin_productos)

    for cantidad_productos_carrito in orden.detalles:
        nuevo_detalle = await crear_o_actualizar_detalle_orden(DetalleOrden(id_producto=cantidad_productos_carrito.id_producto, cantidad=cantidad_productos_carrito.cantidad, id_orden=orden_sin_productos.id), session)
        if not nuevo_detalle: return None
    
    return await ver_orden_por_id(orden_sin_productos.id, session)

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