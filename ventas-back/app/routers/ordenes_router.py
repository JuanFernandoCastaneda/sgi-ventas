from fastapi import APIRouter
from app.dependencies.database import SessionDep
from app.logic.ordenes_logic import ver_productos_orden as ver_productos_orden_logic
from app.model.schemas.productos_model import CantidadProductoCarrito
from app.dependencies.database import SessionDep
from app.logic.ordenes_logic import ver_orden_por_id as ver_orden_por_id_logic
from fastapi import HTTPException
from app.logic.ordenes_logic import ver_ordenes as ver_ordenes_logic
from app.model.schemas.ordenes_model import OrdenConProductos, OrdenConDetalle
from app.logic.ordenes_logic import crear_orden as crear_orden_logic
from app.logic.detalle_orden_logic import crear_o_actualizar_detalle_orden as crear_o_actualizar_detalle_orden_logic
from app.model.schemas.detalles_model import DetalleOrden
from app.logic.ordenes_logic import eliminar_orden as eliminar_orden_logica
from app.logic.ordenes_logic import reemplazar_orden as reemplazar_orden_logica

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
async def crear_orden(orden: OrdenConDetalle, session: SessionDep) -> OrdenConProductos:
    """
    Crea una orden en la base de datos.
    """
    # Falta definir objeto orden acá
    nueva_orden = await crear_orden_logic(orden, session)
    if not nueva_orden:
        raise HTTPException(status_code=404, detail="Se creó la orden pero la lista de productos solo parcialmente. Hay un producto que no existe") 
    return nueva_orden

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
async def reemplazar_orden(id_orden: str, orden: OrdenConDetalle, session: SessionDep):
    """
    Reemplaza una orden en la base de datos.
    No reemplaza los productos de la orden, solo la orden en sí.
    """
    orden_actualizada = await reemplazar_orden_logica(id_orden, orden, session)
    if not orden_actualizada:
        raise HTTPException(status_code=404, detail="Orden no encontrada")
    return orden_actualizada

@router.delete("/{id_orden}")
async def eliminar_orden(id_orden: str, session: SessionDep):
    eliminado = await eliminar_orden_logica(id_orden, session)
    if not eliminado:
        raise HTTPException(status_code=404, detail="Orden no encontrada")
    return True

@router.get("/{id_orden}/productos")
async def ver_productos_orden(id_orden: int, session: SessionDep) -> list[CantidadProductoCarrito]:
    productos = await ver_productos_orden_logic(id_orden, session)
    if productos is None:
        raise HTTPException(status_code=404, detail="Orden no encontrada")
    return productos

@router.post("/{id_orden}/productos/{id_producto}")
async def agregar_producto_orden(id_orden: int, id_producto: int, cantidad: int, session: SessionDep):
    """
    Agrega un producto a una orden.
    """
    nuevo_detalle = await crear_o_actualizar_detalle_orden_logic(DetalleOrden(id_producto=id_producto, cantidad=cantidad, id_orden=id_orden), session)
    if not nuevo_detalle:
        raise HTTPException(status_code=404, detail="Orden o producto no encontrados")
    return nuevo_detalle