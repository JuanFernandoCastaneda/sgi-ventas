from sqlmodel import SQLModel, Field
from datetime import datetime
from decimal import Decimal
from models.productos_model import ProductoConCantidad

class FormaPago(SQLModel, table=True):
    id: int = Field(primary_key=True)
    nombre: str = Field()

class OrdenBase(SQLModel):
    observaciones: str = Field(default="")
    fecha_facturacion: datetime = Field(default=datetime.now())
    id_forma_pago: int = Field(foreign_key="formapago.id")
    descuento: Decimal = Field(default="0")
    # Revisar si realmente es necesario subtotal_sin_iva

class Orden(OrdenBase, table=True):
    id: int = Field(primary_key=True)