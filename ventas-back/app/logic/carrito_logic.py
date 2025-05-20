from app.model.schemas.productos_model import Producto
from app.model.schemas.carrito_model import FilaCarrito
from app.model.schemas.ordenes_model import Orden
from sqlmodel import Session


async def parchar_fila_carrito(
    id_orden: int, id_producto: int, cantidad_nueva: int, session: Session
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
        return "carrito_logic - parchar_fila_carrito - No existe la orden"
    existe_producto = session.get(Producto, id_producto)
    if not existe_producto:
        return "carrito_logic - parchar_fila_carrito - No existe el producto"
    detalle_orden = session.get(FilaCarrito, (id_orden, id_producto))
    if not detalle_orden:
        return f"carrito_logic - parchar_fila_carrito - No se había ordenado el producto {id_producto} en la orden {id_orden}"

    detalle_orden.cantidad = cantidad_nueva
    session.add(detalle_orden)
    session.commit()
    session.refresh(detalle_orden)
    return detalle_orden


async def crear_fila_carrito(
    detalle_orden: FilaCarrito, session: Session
) -> FilaCarrito | str:
    """
    Crea un detalle de orden en la base de datos.

    :param detalle_orden: El detalle de orden a crear.
    :param session: La dependencia de la sesión de la base de datos.
    :return: El detalle de orden creado o un mensaje de error si no existe la orden o el producto.
    """
    id_orden = detalle_orden.id_orden
    id_producto = detalle_orden.id_producto
    existe_producto = session.get(Producto, id_producto)
    if not existe_producto:
        return f"carrito_logic - crear_fila_carrito - El producto con id {id_producto} no existe"
    existe_orden = session.get(Orden, id_orden)
    if not existe_orden:
        return (
            f"carrito_logic - crear_fila_carrito - La orden con id {id_orden} no existe"
        )
    existente = session.get(FilaCarrito, (id_orden, id_producto))
    if existente:
        return f"carrito_logic - crear_fila_carrito - Ya existe el producto {id_producto} en la orden {id_orden}"
    if detalle_orden.cantidad <= 0:
        return "carrito_logic - crear_fila_carrito - La cantidad debe ser mayor a 0"
    session.add(detalle_orden)
    session.commit()
    session.refresh(detalle_orden)
    return detalle_orden


async def eliminar_fila_carrito(
    id_orden: int, id_producto: int, session: Session
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
