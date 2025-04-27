from sqlmodel import select
from dependencies.database import SessionDep
from models.ordenes_model import Orden
from models.forma_pago_model import FormaPago
from models.productos_model import ProductoConCantidad, Producto
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
    listaProductos: list[ProductoConCantidad] 
    subtotal_sin_iva: Decimal
    total_gravado_iva: Decimal
    total_no_gravado_iva: Decimal
    total_iva: Decimal
    valor_total_odc: Decimal


def verOrdenPorId(orden_id: int, session: SessionDep) -> OrdenConProductos:
    """
    Podría tal vez simplificarse haciendo un join, procesando, y luego haciendo el otro join.
    """
    # Puede generar un problema de performance porque lee lista producto varias veces.
    pass

async def ver_productos_orden(id_orden: int, session: SessionDep) -> list[DetalleOrden] | None:
    """
    Devuelve la lista de productos de una orden.
    """
    statement = select(DetalleOrden, Producto, FormaPago).where(DetalleOrden.id_producto == Producto.id).where(DetalleOrden.id_orden == id_orden).where(FormaPago.id == Producto.id_forma_pago)
    results = session.exec(statement)
    if results.all() == []:
        return None
    listaProductos = []
    for detalle_orden, producto in results:
        # No es necesario hacerle deep copy.
        productoConCantidad = ProductoConCantidad(**vars(producto), cantidad=detalle_orden.cantidad, precio_con_iva = producto.precio_sin_iva * (1 + producto.iva))
        listaProductos.append(productoConCantidad)
    return listaProductos