from sqlmodel import SQLModel, Field
from datetime import datetime
from decimal import Decimal
from model.schemas.productos_model import CantidadProductoCarrito
from pydantic import computed_field

class OrdenBase(SQLModel):
    observaciones: str = Field(default="")
    fecha_facturacion: datetime = Field(default=datetime.now())
    id_forma_pago: int = Field(foreign_key="formapago.id")
    descuento: Decimal = Field(default="0")

class Orden(OrdenBase, table=True):
    id: int = Field(primary_key=True)

class OrdenConProductos(OrdenBase):
    productos: list[CantidadProductoCarrito] = Field(default=[])

    @computed_field # type: ignore
    @property
    def subtotal_sin_iva(self) -> Decimal:
        return round(sum([producto.valor_total_sin_iva for producto in self.productos]), 3)

    @computed_field # type: ignore
    @property
    def total_gravado_iva(self) -> Decimal:
        return round(sum([producto.valor_total_con_iva for producto in self.productos if producto.iva >= 0]), 3)

    @computed_field # type: ignore
    @property
    def total_no_gravado_iva(self) -> Decimal:
        return round(sum([producto.valor_total_con_iva for producto in self.productos if producto.iva == 0]), 3)
    
    @computed_field # type: ignore
    @property
    def total_iva(self) -> Decimal:
        return round(self.total_gravado_iva - self.subtotal_sin_iva, 3)
    
    @computed_field # type: ignore
    @property
    def valor_total(self) -> Decimal:
        return round((self.subtotal_sin_iva + self.total_iva) * (1 - self.descuento), 3)
