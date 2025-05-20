from fastapi import APIRouter
from sqlmodel import Session

from app.logic.reportes_logic import generar_reporte
from fastapi.responses import FileResponse

from app.dependencies.database import SessionDep

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
    :type session: Session
    :return: Una lista de reportes.
    """
    reporte = await generar_reporte(session)
    return FileResponse(reporte["filename"])
