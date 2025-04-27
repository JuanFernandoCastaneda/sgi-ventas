from sqlmodel import SQLModel, Field
from datetime import datetime
from decimal import Decimal

class OrdenBase(SQLModel):
    observaciones: str = Field(default="")
    fecha_facturacion: datetime = Field(default=datetime.now())
    id_forma_pago: int = Field(foreign_key="formapago.id")
    descuento: Decimal = Field(default="0")

class Orden(OrdenBase, table=True):
    id: int = Field(primary_key=True)