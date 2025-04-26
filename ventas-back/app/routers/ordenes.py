from fastapi import APIRouter

router = APIRouter(
    prefix="/ordenes",
    tags=["ordenes"],
    responses={404: {"descripción": "No encontrado"}},
)

@router.get("/")
async def verOrdenes():
    pass

@router.post("/")
async def crearOrden():
    pass

@router.get("/{orden_id}")
async def verOrdenPorId(orden_id: str):
    pass

# Falta definir objeto orden acá
@router.put("/{orden_id}")
async def reemplazarOrden(orden_id: str):
    pass

@router.delete("/{orden_id}")
async def eliminarOrden(orden_id: str):
    pass

