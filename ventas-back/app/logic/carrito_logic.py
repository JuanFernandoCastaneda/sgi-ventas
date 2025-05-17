from app.model.schemas.productos_model import Producto
from app.model.schemas.carrito_model import FilaCarrito
from app.model.schemas.ordenes_model import Orden
from app.dependencies.database import SessionDep


async def parchar_fila_carrito(
    id_orden: int, id_producto: int, cantidad_nueva: int, session: SessionDep
) -> FilaCarrito | str:
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
    detalle_orden = session.get(FilaCarrito, (id_producto, id_orden))
    if not detalle_orden:
        return "No se había ordenado el producto en la orden"

    detalle_orden.cantidad = cantidad_nueva
    session.add(detalle_orden)
    session.commit()
    session.refresh(detalle_orden)
    return detalle_orden


async def crear_fila_carrito(
    detalle_orden: FilaCarrito, session: SessionDep
) -> FilaCarrito | str:
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
        FilaCarrito, (detalle_orden.id_producto, detalle_orden.id_orden)
    )
    if existente:
        return "Ya existe ese producto en esa orden"
    if detalle_orden.cantidad <= 0:
        return "La cantidad debe ser mayor a 0"
    session.add(detalle_orden)
    session.commit()
    session.refresh(detalle_orden)
    return detalle_orden


async def eliminar_fila_carrito(
    id_orden: int, id_producto: int, session: SessionDep
) -> FilaCarrito | None:
    """
    Elimina el producto del carro de la orden

    :param id_orden: El id de la orden.
    :param id_producto: El id del producto a borrar.
    :param session: La dependencia de la sesión de la base de datos.
    :return: La fila del carrito eliminada o None si no encontró.
    """
    fila_carrito = session.get(FilaCarrito, (id_orden, id_producto))
    if not fila_carrito:
        return None
    session.delete(fila_carrito)
    session.commit()
    return fila_carrito
