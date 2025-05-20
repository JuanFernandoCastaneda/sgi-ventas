from app.model.schemas.productos_model import Producto, ProductoConCantidad
from sqlmodel import Session

from sqlmodel import select, col
from app.model.schemas.carrito_model import FilaCarrito
from sqlalchemy import func, desc


async def ver_productos(session: Session) -> list[Producto]:
    """
    Lógica para obtener todos los productos registrados.

    :param session: La dependencia de la sesión.
    :type session: Session
    :return: Una lista de productos.
    """
    return list(session.exec(select(Producto)).all())


async def ver_top3(session: Session) -> list[ProductoConCantidad]:
    """
    Lógica para obtener los 3 productos más vendidos con su cantidad total vendida.

    :param session: La dependencia de la sesión.
    :type session: Session
    :return: Una lista de productos con su cantidad total vendida.
    """

    statement = (
        select(Producto, func.sum(FilaCarrito.cantidad).label("total_vendido"))
        .where(Producto.id == FilaCarrito.id_producto)
        .group_by(col(Producto.id))
        .order_by(desc("total_vendido"))
        .limit(3)
    )

    """
    More SQLAlchemy like way of solving it
    statement = (
        select(Producto, func.sum(FilaCarrito.cantidad).label("total_vendido"))
        .join(FilaCarrito, col(FilaCarrito.id_producto) == Producto.id)
        .group_by(col(Producto.id))
        .order_by(desc("total_vendido"))
        .limit(3)
    )
    """

    results = session.exec(statement)
    listaProductos = []
    for producto, total_vendido in results:
        listaProductos.append(
            ProductoConCantidad(
                **vars(producto),
                cantidad=total_vendido,
            )
        )
    return listaProductos
