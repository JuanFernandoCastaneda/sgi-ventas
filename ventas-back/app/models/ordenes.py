from sqlmodel import SQLModel, Field
from datetime import datetime
from decimal import Decimal

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