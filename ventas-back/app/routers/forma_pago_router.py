from fastapi import APIRouter, Depends
from sqlmodel import Session
from app.dependencies.database import get_session
from app.logic.forma_pago_logic import ver_formas_pago as ver_formas_pago_logic
from app.dependencies.database import SessionDep
from app.model.schemas.forma_pago_model import FormaPago

router = APIRouter(
    prefix="/formas_pago",
    tags=["formas de pago"],
)


@router.get("/")
async def ver_formas_pago(session: SessionDep) -> list[FormaPago]:
    """
    Endpoint para obtener todas las formas de pago registradas.

    :return: Lista de tipos de formas de pago.
    :rtype: list[str]
    """
    return await ver_formas_pago_logic(session)
