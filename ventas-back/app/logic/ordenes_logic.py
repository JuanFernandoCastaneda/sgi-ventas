from sqlmodel import select
from app.dependencies.database import SessionDep
from app.model.schemas.ordenes_model import Orden, OrdenConProductos, OrdenConDetalle
from app.model.schemas.productos_model import CantidadProductoCarrito, Producto
from app.model.schemas.detalles_model import DetalleOrden
from app.logic.detalle_orden_logic import crear_detalle_orden


async def ver_ordenes(session: SessionDep) -> list[OrdenConProductos]:
    """
    Devuelve todas las órdenes de la base de datos con sus productos asociados.

    :param session: Sesión de base de datos activa.
    :type session: SessionDep
    :return: Lista de órdenes con sus productos asociados.
    :rtype: list[OrdenConProductos]
    """
    ids_ordenes = session.exec(select(Orden.id)).all()
    return [await ver_orden_por_id(id_orden, session) for id_orden in ids_ordenes]


async def ver_orden_por_id(orden_id: int, session: SessionDep) -> OrdenConProductos:
    """
    Devuelve una orden específica con sus productos asociados.

    :param orden_id: Identificador único de la orden.
    :type orden_id: int
    :param session: Sesión de base de datos activa.
    :type session: SessionDep
    :return: Una instancia de OrdenConProductos si la orden existe, de lo contrario None.
    :rtype: OrdenConProductos | None
    """
    orden = session.get(Orden, orden_id)
    if orden is None:
        return None
    productos_orden = await ver_productos_orden(orden_id, session)
    return OrdenConProductos(**vars(orden), productos=productos_orden)


async def crear_orden(
    orden: OrdenConDetalle, session: SessionDep
) -> OrdenConProductos | str:
    """
    Crea una nueva orden en la base de datos junto con sus detalles y productos asociados.

    :param orden: Objeto que contiene los detalles de la orden y los productos.
    :type orden: OrdenConDetalle
    :param session: Sesión de base de datos activa.
    :type session: SessionDep
    :return: Una instancia de OrdenConProductos si la creación es exitosa, de lo contrario None.
    :rtype: OrdenConProductos | None
    """
    orden_sin_productos = Orden(
        observaciones=orden.observaciones,
        fecha_facturacion=orden.fecha_facturacion,
        id_forma_pago=orden.id_forma_pago,
        descuento=orden.descuento,
    )
    session.add(orden_sin_productos)
    session.commit()
    session.refresh(orden_sin_productos)

    print(orden_sin_productos)

    for cantidad_productos_carrito in orden.detalles:
        detalle_orden = DetalleOrden(
            id_producto=cantidad_productos_carrito.id_producto,
            cantidad=cantidad_productos_carrito.cantidad,
            id_orden=orden_sin_productos.id,
        )
        nuevo_detalle = await crear_detalle_orden(detalle_orden, session)
        if type(nuevo_detalle) == str:
            return nuevo_detalle

    return await ver_orden_por_id(orden_sin_productos.id, session)


async def ver_productos_orden(
    id_orden: int, session: SessionDep
) -> list[CantidadProductoCarrito] | None:
    """
    Obtiene los productos asociados a una orden específica.

    :param id_orden: Identificador único de la orden.
    :type id_orden: int
    :param session: Sesión de base de datos activa.
    :type session: SessionDep
    :return: Lista de productos con sus cantidades si la orden existe, de lo contrario None.
    :rtype: list[CantidadProductoCarrito] | None
    """
    orden = session.get(Orden, id_orden)
    if orden is None:
        return None

    statement = (
        select(DetalleOrden, Producto)
        .where(DetalleOrden.id_producto == Producto.id)
        .where(DetalleOrden.id_orden == id_orden)
    )
    results = session.exec(statement)

    listaProductos = []
    for detalle_orden, producto in results:
        # No es necesario hacerle deep copy.
        productoCarrito = CantidadProductoCarrito(
            **vars(producto), cantidad=detalle_orden.cantidad
        )
        listaProductos.append(productoCarrito)
    return listaProductos


async def eliminar_orden(id_orden: int, session: SessionDep) -> bool:
    """
    Elimina una orden y sus detalles asociados de la base de datos.

    :param id_orden: Identificador único de la orden a eliminar.
    :type id_orden: int
    :param session: Sesión de base de datos activa.
    :type session: SessionDep
    :return: True si la orden fue eliminada exitosamente, False si la orden no existe.
    :rtype: bool
    """
    orden = session.get(Orden, id_orden)
    if orden is None:
        return False
    session.delete(orden)
    detalles = session.exec(
        select(DetalleOrden).where(DetalleOrden.id_orden == id_orden)
    ).all()
    for detalle in detalles:
        session.delete(detalle)
    session.commit()
    return True


async def reemplazar_orden(
    id_orden: int, orden: Orden, session: SessionDep
) -> Orden | None:
    """
    Actualiza los datos de una orden existente sin modificar sus productos.

    :param id_orden: Identificador único de la orden a reemplazar.
    :type id_orden: int
    :param orden: Nueva información de la orden.
    :type orden: Orden
    :param session: Sesión de base de datos activa.
    :type session: SessionDep
    :return: La orden actualizada si existe, de lo contrario None.
    :rtype: Orden | None
    """
    orden_a_reemplazar = session.get(Orden, id_orden)
    if orden_a_reemplazar is None:
        return None
    orden_a_reemplazar.observaciones = orden.observaciones
    orden_a_reemplazar.fecha_facturacion = orden.fecha_facturacion
    orden_a_reemplazar.id_forma_pago = orden.id_forma_pago
    orden_a_reemplazar.descuento = orden.descuento
    session.add(orden_a_reemplazar)
    session.commit()
    session.refresh(orden_a_reemplazar)
    return orden_a_reemplazar
