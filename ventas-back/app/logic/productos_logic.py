from app.model.schemas.productos_model import Producto, CantidadProductoCarrito
from app.dependencies.database import SessionDep
from sqlmodel import select
from app.model.schemas.detalles_model import Carrito
from sqlalchemy import func, desc


async def ver_productos(session: SessionDep) -> list[Producto]:
    """
    Lógica para obtener todos los productos registrados.

    :param session: La dependencia de la sesión.
    :type session: SessionDep
    :return: Una lista de productos.
    """
    return session.exec(select(Producto)).all()


async def ver_top3(session: SessionDep) -> list[CantidadProductoCarrito]:
    """
    Lógica para obtener los 3 productos más vendidos con su cantidad total vendida.

    :param session: La dependencia de la sesión.
    :type session: SessionDep
    :return: Una lista de productos con su cantidad total vendida.
    """
    statement = (
        select(Producto, func.sum(Carrito.cantidad).label("total_vendido"))
        .join(Carrito, Carrito.id_producto == Producto.id)
        .group_by(Producto.id)
        .order_by(desc("total_vendido"))
        .limit(3)
    )
    results = session.exec(statement)
    listaProductos = []
    for producto, total_vendido in results:
        listaProductos.append(
            CantidadProductoCarrito(
                **vars(producto),
                cantidad=total_vendido,
            )
        )
    return listaProductos
