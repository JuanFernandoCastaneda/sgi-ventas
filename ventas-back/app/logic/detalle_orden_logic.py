from app.model.schemas.productos_model import Producto
from app.model.schemas.detalles_model import Carrito
from app.model.schemas.ordenes_model import Orden
from app.dependencies.database import SessionDep


async def parchar_detalle_orden(
    id_orden: int, id_producto: int, cantidad_nueva: int, session: SessionDep
) -> Carrito | str:
    """
    Reemplaza el atributo cantidad en el detalle de una orden en la base de datos.

    :param id_orden: El id de la orden a modificar.
    :param id_producto: El id del producto a modificar.
    :param cantidad_nueva: La nueva cantidad del producto en la orden.
    :param session: La dependencia de la sesión de la base de datos.
    :return: El detalle de la orden parchado o un mensaje de error si no existe la orden o el producto.
    """
    existe_orden = session.get(Orden, id_orden)
    if not existe_orden:
        return "No existe la orden"
    existe_producto = session.get(Producto, id_producto)
    if not existe_producto:
        return "No existe el producto"
    detalle_orden = session.get(Carrito, (id_producto, id_orden))
    if not detalle_orden:
        return "No se había ordenado el producto en la orden"

    detalle_orden.cantidad = cantidad_nueva
    session.add(detalle_orden)
    session.commit()
    session.refresh(detalle_orden)
    return detalle_orden


async def crear_detalle_orden(
    detalle_orden: Carrito, session: SessionDep
) -> Carrito | str:
    """
    Crea un detalle de orden en la base de datos.

    :param detalle_orden: El detalle de orden a crear.
    :param session: La dependencia de la sesión de la base de datos.
    :return: El detalle de orden creado o un mensaje de error si no existe la orden o el producto.
    """
    existe_producto = session.get(Producto, detalle_orden.id_producto)
    if not existe_producto:
        return "El producto no existe"
    existe_orden = session.get(Orden, detalle_orden.id_orden)
    if not existe_orden:
        return "La orden no existe"
    existente = session.get(
        Carrito, (detalle_orden.id_producto, detalle_orden.id_orden)
    )
    if existente:
        return "Ya existe ese producto en esa orden"
    if detalle_orden.cantidad <= 0:
        return "La cantidad debe ser mayor a 0"
    session.add(detalle_orden)
    session.commit()
    session.refresh(detalle_orden)
    return detalle_orden
