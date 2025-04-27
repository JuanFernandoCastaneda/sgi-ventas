from model.schemas.detalles_model import DetalleOrden
from dependencies.database import SessionDep

async def crear_o_actualizar_detalle_orden(detalle_orden: DetalleOrden, session: SessionDep) -> DetalleOrden:
    """
    Crea un detalle de orden en la base de datos o actualiza uno existente.
    """
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
