from sqlmodel import SQLModel, Field, select
from datetime import datetime
from decimal import Decimal
from database import SessionDep
from app.models.productos_model import ProductoConCantidad
from detalles_model import DetalleOrden
from productos_model import Producto

class FormaPago(SQLModel, table=True):
    id: int = Field(primary_key=True)
    nombre: str = Field()

class OrdenBase(SQLModel):
    observaciones: str = Field(default="")
    fechaFacturacion: datetime = Field(default=datetime.now())
    formaPago: int = Field(foreign_key="FormaPago.id")
    descuento: Decimal = Field(default=0)
    # Revisar si realmente es necesario subtotalSinIva

class Orden(OrdenBase, table=True):
    id: int = Field(primary_key=True)

class OrdenConProductos(Orden):
    listaProductos: list[ProductoConCantidad]
    subtotalSinIva: Decimal = Field()
    totalGravadoIva: Decimal = Field()
    totalNoGravadoIva: Decimal = Field()
    totalIva: Decimal = Field()
    valorTotalODC: Decimal = Field()
