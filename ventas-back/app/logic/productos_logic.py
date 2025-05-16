from app.model.schemas.productos_model import Producto, ProductoConCantidad
from app.dependencies.database import SessionDep
from sqlmodel import select, col
from app.model.schemas.carrito_model import Carrito
from sqlalchemy import func, desc


async def ver_productos(session: SessionDep) -> list[Producto]:
    """
    Lógica para obtener todos los productos registrados.

    :param session: La dependencia de la sesión.
    :type session: SessionDep
    :return: Una lista de productos.
    """
    return list(session.exec(select(Producto)).all())


async def ver_top3(session: SessionDep) -> list[ProductoConCantidad]:
    """
    Lógica para obtener los 3 productos más vendidos con su cantidad total vendida.

    :param session: La dependencia de la sesión.
    :type session: SessionDep
    :return: Una lista de productos con su cantidad total vendida.
    """

    statement = (
        select(Producto, func.sum(Carrito.cantidad).label("total_vendido"))
        .where(Producto.id == Carrito.id_producto)
        .group_by(col(Producto.id))
        .order_by(desc("total_vendido"))
        .limit(3)
    )

    """
    More SQLAlchemy like way of solving it
    statement = (
        select(Producto, func.sum(Carrito.cantidad).label("total_vendido"))
        .join(Carrito, col(Carrito.id_producto) == Producto.id)
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
