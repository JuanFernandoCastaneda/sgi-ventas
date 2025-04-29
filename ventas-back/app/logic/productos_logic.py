from app.model.schemas.productos_model import Producto
from app.dependencies.database import SessionDep
from sqlmodel import select


async def ver_productos(session: SessionDep) -> list[Producto]:
    """
    Lógica para obtener todos los productos registrados.

    :param session: La dependencia de la sesión.
    :type session: SessionDep
    :return: Una lista de productos.
    """
    return session.exec(select(Producto)).all()
