from typing import Sequence
from sqlmodel import select
from sqlmodel import Session

from app.model.schemas.ordenes_model import (
    Orden,
    OrdenConProductosPublic,
    OrdenConProductosCreate,
)
from app.model.schemas.productos_model import ProductoConCantidad, Producto
from app.model.schemas.carrito_model import FilaCarrito
from app.logic.carrito_logic import (
    crear_fila_carrito,
    eliminar_fila_carrito,
    parchar_fila_carrito,
)


async def ver_ordenes(session: Session) -> list[OrdenConProductosPublic]:
    """
    Devuelve todas las órdenes de la base de datos con sus productos asociados.

    :param session: Sesión de base de datos activa.
    :type session: Session
    :return: Lista de órdenes con sus productos asociados.
    :rtype: list[OrdenConProductosPublic]
    """
    ids_ordenes = session.exec(select(Orden.id)).all()
    # Literally had to do this because Python typing doesn't work on subtypes of collections.
    ordenes = [
        await ver_orden_por_id(id_orden, session)
        for id_orden in ids_ordenes
        if id_orden != None
    ]
    return [orden for orden in ordenes if orden is not None]


async def ver_orden_por_id(
    orden_id: int, session: Session
) -> OrdenConProductosPublic | None:
    """
    Devuelve una orden específica con sus productos asociados.

    :param orden_id: Identificador único de la orden.
    :type orden_id: int
    :param session: Sesión de base de datos activa.
    :type session: Session
    :return: Una instancia de OrdenConProductosPublic si la orden existe, de lo contrario None.
    :rtype: OrdenConProductosPublic | None
    """
    orden = session.get(Orden, orden_id)
    productos_orden = await ver_productos_orden(orden_id, session)
    if productos_orden is None or orden is None:
        return None
    return OrdenConProductosPublic(
        **vars(orden), informacionCompletaProductos=productos_orden
    )


async def crear_orden(
    orden: OrdenConProductosCreate, session: Session
) -> OrdenConProductosPublic | str:
    """
    Crea una nueva orden en la base de datos junto con sus productos y productos asociados.

    :param orden: Objeto que contiene los productos de la orden y los productos.
    :type orden: OrdenConProductosCreate
    :param session: Sesión de base de datos activa.
    :type session: Session
    :return: Una instancia de OrdenConProductosPublic si la creación es exitosa, de lo contrario None.
    :rtype: OrdenConProductosPublic | None
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
    assert (
        orden_sin_productos.id is not None
    ), "There was an error updating on DB the order"

    for fila_carrito in orden.carrito:
        detalle_orden = FilaCarrito(
            id_producto=fila_carrito.id_producto,
            cantidad=fila_carrito.cantidad,
            id_orden=orden_sin_productos.id,
        )
        nuevo_detalle = await crear_fila_carrito(detalle_orden, session)
        if type(nuevo_detalle) == str:
            return nuevo_detalle

    created_order = await ver_orden_por_id(orden_sin_productos.id, session)
    if not created_order:
        return "La orden fue borrada por alguien más recién creada"
    return created_order


async def ver_productos_orden(
    id_orden: int, session: Session
) -> list[ProductoConCantidad] | None:
    """
    Obtiene los productos asociados a una orden específica.

    :param id_orden: Identificador único de la orden.
    :type id_orden: int
    :param session: Sesión de base de datos activa.
    :type session: Session
    :return: Lista de productos con sus cantidades si la orden existe, de lo contrario None.
    :rtype: list[ProductoConCantidad] | None
    """
    orden = session.get(Orden, id_orden)
    if orden is None:
        return None

    statement = (
        select(FilaCarrito, Producto)
        .where(FilaCarrito.id_producto == Producto.id)
        .where(FilaCarrito.id_orden == id_orden)
    )
    results = session.exec(statement)

    listaProductos = []
    for detalle_orden, producto in results:
        # No es necesario hacerle deep copy.
        productoFilaCarrito = ProductoConCantidad(
            **vars(producto), cantidad=detalle_orden.cantidad
        )
        listaProductos.append(productoFilaCarrito)
    return listaProductos


async def eliminar_orden(id_orden: int, session: Session) -> bool:
    """
    Elimina una orden y sus productos asociados de la base de datos.

    :param id_orden: Identificador único de la orden a eliminar.
    :type id_orden: int
    :param session: Sesión de base de datos activa.
    :type session: Session
    :return: True si la orden fue eliminada exitosamente, False si la orden no existe.
    :rtype: bool
    """
    orden = session.get(Orden, id_orden)
    if orden is None:
        return False
    session.delete(orden)
    productos = session.exec(
        select(FilaCarrito).where(FilaCarrito.id_orden == id_orden)
    ).all()
    for detalle in productos:
        session.delete(detalle)
    session.commit()
    return True


async def reemplazar_orden(
    id_orden: int, orden: OrdenConProductosCreate, session: Session
) -> OrdenConProductosPublic | str:
    """
    Actualiza los datos de una orden existente sin modificar sus productos.

    :param id_orden: Identificador único de la orden a reemplazar.
    :type id_orden: int
    :param orden: Nueva información de la orden.
    :type orden: Orden
    :param session: Sesión de base de datos activa.
    :type session: Session
    :return: La orden actualizada si existe, de lo contrario None.
    :rtype: Orden | None
    """
    # Data in Order table
    orden_a_reemplazar = session.get(Orden, id_orden)
    if orden_a_reemplazar is None:
        return "ordenes_logic - reemplazar_orden - No se encontró la orden con ese id"
    orden_a_reemplazar.observaciones = orden.observaciones
    orden_a_reemplazar.fecha_facturacion = orden.fecha_facturacion
    orden_a_reemplazar.id_forma_pago = orden.id_forma_pago
    orden_a_reemplazar.descuento = orden.descuento
    print("BEFORE", orden.descuento)

    session.add(orden_a_reemplazar)
    session.commit()
    session.refresh(orden_a_reemplazar)
    print("AFTER", orden_a_reemplazar.descuento)

    # Data in FilaCarrito table
    ids_productos_carrito_antiguo = session.exec(
        select(FilaCarrito.id_producto).where(FilaCarrito.id_orden == id_orden)
    ).all()

    for fila_carrito in orden.carrito:
        if fila_carrito.id_producto in ids_productos_carrito_antiguo:
            response = await parchar_fila_carrito(
                id_orden,
                fila_carrito.id_producto,
                fila_carrito.cantidad,
                session,
            )
            if isinstance(response, str):
                return response

            # Delete the ones that are being updated from the list of old ones.
            ids_productos_carrito_antiguo = [
                id_antiguo
                for id_antiguo in ids_productos_carrito_antiguo
                if id_antiguo != fila_carrito.id_producto
            ]
        else:
            response = await crear_fila_carrito(fila_carrito, session)
            if isinstance(response, str):
                return response

    # Delete the filasCarrito that weren't updated and thus must be deleted.
    for id_por_eliminar in ids_productos_carrito_antiguo:
        response = await eliminar_fila_carrito(id_orden, id_por_eliminar, session)
        if isinstance(response, str):
            return response

    updated_order = await ver_orden_por_id(id_orden, session)
    if not updated_order:
        return "La orden fue borrada por alguien más recién actualizada"
    return updated_order
