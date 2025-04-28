from app.model.schemas.productos_model import Producto
from app.model.schemas.detalles_model import DetalleOrden
from app.model.schemas.ordenes_model import Orden
from app.dependencies.database import SessionDep

async def parchar_detalle_orden(id_orden: int, id_producto: int, cantidad_nueva: int, session: SessionDep) -> DetalleOrden | str:
    """
    Reemplaza el atributo cantidad en el detalle de una orden.
    Puede retornar None si no existe producto u orden.
    """
    existe_orden = session.get(Orden, id_orden)
    if not existe_orden: return "No existe la orden"
    existe_producto = session.get(Producto, id_producto)
    if not existe_producto: return "No existe el producto"
    detalle_orden = session.get(DetalleOrden, (id_producto, id_orden))
    if not detalle_orden: return "No se había ordenado el producto en la orden"

    detalle_orden.cantidad = cantidad_nueva
    session.add(detalle_orden)
    session.commit()
    session.refresh(detalle_orden)
    return detalle_orden

async def crear_o_actualizar_detalle_orden(detalle_orden: DetalleOrden, session: SessionDep) -> DetalleOrden | None:
    """
    Crea un detalle de orden en la base de datos o actualiza uno existente.
    Puede retornar None si no existe producto u orden.
    """
    existe_producto = session.get(Producto, detalle_orden.id_producto)
    if not existe_producto: return None
    existe_orden = session.get(Orden, detalle_orden.id_orden)
    if not existe_orden: return None
    existente = session.get(DetalleOrden, (detalle_orden.id_producto, detalle_orden.id_orden))
    if existente:
        existente.cantidad = detalle_orden.cantidad
        session.add(existente)
        session.commit()
        session.refresh(existente)
        return existente
    else:
        session.add(detalle_orden)
        session.commit()
        session.refresh(detalle_orden)
        return detalle_orden
