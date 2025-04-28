from sqlmodel import SQLModel, Field
from decimal import Decimal
from sqlalchemy import CheckConstraint
from pydantic import computed_field

"""
No es necesario tener la separación, por lo que no se van a crear Productos desde la API.
"""
class ProductoBase(SQLModel):
    nombre: str = Field()
    iva: Decimal = Field(default="0", decimal_places=3)
    precio_sin_iva: Decimal = Field(decimal_places=3)

    @computed_field # type: ignore
    @property
    def precio_con_iva(self) -> Decimal:
        return round(self.precio_sin_iva * (1 + self.iva), 3)


class Producto(ProductoBase, table=True):
    id: int | None = Field(default=None, primary_key=True)

    __table_args__ = (
        CheckConstraint("precio_sin_iva >= 0", name="precio_sin_iva_positive"),
        CheckConstraint("iva >= 0", name="iva_positive"),
        CheckConstraint("iva <= 1", name="iva_max_1"),
    )

class CantidadProductoCarrito(ProductoBase):
    id: int = Field(primary_key=True)
    cantidad: int = Field()

    @computed_field # type: ignore
    @property
    def valor_total_sin_iva(self) -> Decimal:
        return round(self.precio_sin_iva * self.cantidad, 3)

    # Type ignore se puede explicar por https://github.com/python/mypy/issues/1362
    @computed_field # type: ignore
    @property
    def valor_total_con_iva(self) -> Decimal: 
        return round(self.precio_con_iva * self.cantidad, 3)
