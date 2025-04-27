from sqlmodel import select
from dependencies.database import SessionDep
from models.ordenes_model import Orden
from models.forma_pago_model import FormaPago
from models.productos_model import ProductoCantidad, Producto
from models.detalles_model import DetalleOrden
from dataclasses import dataclass
from datetime import datetime
from decimal import Decimal

@dataclass
class OrdenConProductos():
    id: int
    nombre: str
    observaciones: str
    fecha_facturacion: datetime
    id_forma_pago: int  
    descuento: Decimal
    listaProductos: list[ProductoCantidad] 
    subtotal_sin_iva: Decimal
    total_gravado_iva: Decimal
    total_no_gravado_iva: Decimal
    total_iva: Decimal
    valor_total_odc: Decimal


def ver_orden_por_id(orden_id: int, session: SessionDep) -> OrdenConProductos:
    """
    Devuelve la orden con el id pasado por parámetro.
    Podría tal vez simplificarse haciendo un join, procesando, y luego haciendo el otro join.
    """
    # Puede generar un problema de performance porque lee lista producto varias veces.
    pass

async def ver_productos_orden(id_orden: int, session: SessionDep) -> list[ProductoCantidad] | None:
    """
    Devuelve la lista de productos de una orden con el id pasado por parámetro.
    """
    orden = session.get(Orden, id_orden)
    if not orden:
        return None

    statement = select(DetalleOrden, Producto).where(DetalleOrden.id_producto == Producto.id).where(DetalleOrden.id_orden == id_orden)
    results = session.exec(statement)
    
    listaProductos = []
    for detalle_orden, producto in results:
        # No es necesario hacerle deep copy.
        productoCarrito = ProductoCantidad(**vars(producto), cantidad=detalle_orden.cantidad)
        listaProductos.append(productoCarrito)
    return listaProductos