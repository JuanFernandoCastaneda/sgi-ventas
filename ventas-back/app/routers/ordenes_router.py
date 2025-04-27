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

@router.get("/{id_orden}")
async def verOrdenPorId(id_orden: str):
    pass

# Falta definir objeto orden acá
@router.put("/{id_orden}")
async def reemplazarOrden(id_orden: str):
    pass

@router.delete("/{id_orden}")
async def eliminarOrden(id_orden: str):
    pass

