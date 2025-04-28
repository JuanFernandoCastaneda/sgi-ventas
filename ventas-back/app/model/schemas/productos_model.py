from sqlmodel import SQLModel, Field
from decimal import Decimal
from sqlalchemy import CheckConstraint
from pydantic import computed_field


class ProductoBase(SQLModel):
    """
    Modelo base para un producto.

    Extiende de: SQLModel

    :ivar nombre: Nombre del producto.
    :ivar iva: Porcentaje de IVA aplicado al producto (entre 0 y 1).
    :ivar precio_sin_iva: Precio del producto sin incluir IVA.
    :ivar precio_con_iva: Precio del producto incluyendo IVA.
    """

    nombre: str = Field()
    iva: Decimal = Field(default=Decimal("0"), decimal_places=3, ge=0, le=1)
    precio_sin_iva: Decimal = Field(decimal_places=3, ge=0)

    @computed_field  # type: ignore
    @property
    def precio_con_iva(self) -> Decimal:
        return round(self.precio_sin_iva * (1 + self.iva), 3)


class Producto(ProductoBase, table=True):
    """
    Tabla en la base de datos que representa un producto.

    Extiende de: ProductoBase

    :ivar id: Identificador único del producto.
    """

    id: int | None = Field(default=None, primary_key=True)

    __table_args__ = (
        CheckConstraint("precio_sin_iva >= 0", name="precio_sin_iva_positivo"),
        CheckConstraint("iva >= 0", name="iva_mayor_o_igual_0"),
        CheckConstraint("iva <= 1", name="iva_max_1"),
    )


class CantidadProductoCarrito(ProductoBase):
    """
    Modelo que representa un producto en un carrito con su cantidad.

    Extiende de: ProductoBase

    :ivar id: Identificador único del producto.
    :ivar cantidad: Cantidad del producto en el carrito.
    :ivar valor_total_sin_iva: Valor total sin incluir IVA.
    :ivar valor_total_con_iva: Valor total incluyendo IVA.
    """

    id: int = Field(primary_key=True)
    cantidad: int = Field()

    @computed_field  # type: ignore
    @property
    def valor_total_sin_iva(self) -> Decimal:
        return round(self.precio_sin_iva * self.cantidad, 3)

    # Type ignore se puede explicar por https://github.com/python/mypy/issues/1362
    @computed_field  # type: ignore
    @property
    def valor_total_con_iva(self) -> Decimal:
        return round(self.precio_con_iva * self.cantidad, 3)
