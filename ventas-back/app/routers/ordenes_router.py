from fastapi import APIRouter
from dependencies.database import SessionDep
from logic.ordenes_logic import ver_productos_orden as ver_productos_orden_logic
from model.schemas.productos_model import CantidadProductoCarrito
from dependencies.database import SessionDep
from logic.ordenes_logic import ver_orden_por_id as ver_orden_por_id_logic
from fastapi import HTTPException
from logic.ordenes_logic import ver_ordenes as ver_ordenes_logic
from model.schemas.ordenes_model import Orden
from model.schemas.ordenes_model import OrdenConProductos
from logic.ordenes_logic import crear_orden as crear_orden_logic
from logic.detalle_orden_logic import crear_o_actualizar_detalle_orden as crear_o_actualizar_detalle_orden_logic
from model.schemas.detalles_model import DetalleOrden

router = APIRouter(
    prefix="/ordenes",
    tags=["ordenes"],
    responses={404: {"descripción": "No encontrado"}},
)

@router.get("/")
async def ver_ordenes(session: SessionDep):
    """
    Devuelve todas las ordenes de la base de datos.
    """
    ordenes = await ver_ordenes_logic(session)
    return ordenes

@router.post("/")
async def crear_orden(orden: OrdenConProductos, session: SessionDep) -> OrdenConProductos:
    """
    Crea una orden en la base de datos.
    """
    # Falta definir objeto orden acá
    return crear_orden_logic(orden, session)

@router.post("/{id_orden}/productos/{id_producto}")
async def agregar_producto_orden(id_orden: int, id_producto: int, cantidad: int, session: SessionDep):
    """
    Agrega un producto a una orden.
    """
    return await crear_o_actualizar_detalle_orden_logic(DetalleOrden(id_producto=id_producto, cantidad=cantidad, id_orden=id_orden), session)
    

@router.get("/{id_orden}")
async def ver_orden_por_id(id_orden: str, session: SessionDep):
    """
    Devuelve la orden con el id pasado por parámetro. Incluye la lista de productos dentro de esa orden.
    """
    orden = await ver_orden_por_id_logic(id_orden, session)
    if orden is None:
        raise HTTPException(status_code=404, detail="Orden no encontrada")
    return orden

# Falta definir objeto orden acá
@router.put("/{id_orden}")
async def reemplazar_orden(id_orden: str, session: SessionDep):
    pass

@router.delete("/{id_orden}")
async def eliminar_orden(id_orden: str, session: SessionDep):
    pass

@router.get("/{id_orden}/productos")
async def ver_productos_orden(id_orden: int, session: SessionDep) -> list[CantidadProductoCarrito]:
    productos = await ver_productos_orden_logic(id_orden, session)
    if productos is None:
        raise HTTPException(status_code=404, detail="Orden no encontrada")
    return productos