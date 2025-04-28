from fastapi import APIRouter
from fastapi import HTTPException
from app.logic.detalle_orden_logic import crear_o_actualizar_detalle_orden as crear_o_actualizar_detalle_orden_logic
from app.logic.ordenes_logic import ver_productos_orden as ver_productos_orden_logic
from app.model.schemas.detalles_model import DetalleOrden
from app.model.schemas.productos_model import CantidadProductoCarrito
from app.dependencies.database import SessionDep
from app.logic.detalle_orden_logic import parchar_detalle_orden as parchar_producto_orden_logic

router = APIRouter(
    prefix="/ordenes",
    tags=["ordenes, productos"],
)

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

@router.patch("/{id_orden}/productos/{id_producto}")
async def parchar_producto_orden(id_orden: int, id_producto: int, cantidad: int, session: SessionDep):
    """
    Reemplaza el atributo cantidad en el detalle de una orden.
    """
    nuevo_detalle = await parchar_producto_orden_logic(DetalleOrden(id_producto=id_producto, cantidad=cantidad, id_orden=id_orden), session)
    if type(nuevo_detalle) == str:
        raise HTTPException(status_code=404, detail=nuevo_detalle)
    return nuevo_detalle