from fastapi import APIRouter
from app.dependencies.database import SessionDep
from app.logic.reportes_logic import ver_reportes as ver_reportes_logic

router = APIRouter(
    prefix="/reportes",
    tags=["reportes"],
    responses={404: {"descripción": "No encontrado"}},
)


@router.get("/")
async def ver_reportes(session: SessionDep):
    """
    Endpoint para ver todos los reportes registrados.

    :param session: La dependencia de la sesión.
    :type session: SessionDep
    :return: Una lista de reportes.
    """
    return await ver_reportes_logic(session)
