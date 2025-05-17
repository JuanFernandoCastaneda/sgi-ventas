from app.model.schemas.forma_pago_model import FormaPago
from app.dependencies.database import SessionDep
from sqlmodel import select


async def ver_formas_pago(session: SessionDep) -> list[FormaPago]:
    """
    Lógica para obtener todas las formas de pago registradas.

    :param session: La dependencia de la sesión.
    :type session: SessionDep
    :return: Lista de tipos de formas de pago.
    :rtype: list[str]
    """
    statement = select(FormaPago)
    return list(session.exec(statement).all())
