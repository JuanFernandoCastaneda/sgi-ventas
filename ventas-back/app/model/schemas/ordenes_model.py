from sqlmodel import SQLModel, Field
from datetime import datetime
from decimal import Decimal
from pydantic import computed_field
from sqlalchemy import CheckConstraint
from app.model.schemas.productos_model import CantidadProductoCarrito
from app.model.schemas.detalles_model import DetalleOrden


class OrdenBase(SQLModel):
    """
    Modelo base para una orden.

    Extiende de: SQLModel

    :ivar observaciones: Observaciones adicionales sobre la orden.
    :ivar fecha_facturacion: Fecha de facturación de la orden.
    :ivar id_forma_pago: Identificador de la forma de pago asociada.
    :ivar descuento: Descuento aplicado a la orden (entre 0 y 1).
    """

    observaciones: str = Field(default="")
    fecha_facturacion: datetime = Field(default=datetime.now())
    id_forma_pago: int = Field(foreign_key="formapago.id")
    descuento: Decimal = Field(default=Decimal("0"), decimal_places=3, ge=0, le=1)


class Orden(OrdenBase, table=True):
    """
    Tabla en la base de datos que representa una orden.

    Extiende de: OrdenBase

    :ivar id: Identificador único de la orden.
    """

    id: int | None = Field(default=None, primary_key=True)

    __table_args__ = (
        CheckConstraint("descuento >= 0", name="descuento_mayor_o_igual_0"),
        CheckConstraint("descuento <= 1", name="descuento_max_1"),
    )


class OrdenConDetalle(OrdenBase):
    """
    Modelo que representa una orden con detalles.

    Extiende de: OrdenBase

    :ivar id: Identificador único de la orden.
    :ivar detalles: Lista de detalles asociados a la orden.
    """

    id: int = Field(primary_key=True)
    detalles: list[DetalleOrden] = Field(default=[])


class OrdenConProductos(OrdenBase):
    """
    Modelo que representa una orden con productos.

    Extiende de: OrdenBase

    :ivar id: Identificador único de la orden.
    :ivar productos: Lista de productos asociados a la orden.
    :ivar subtotal_sin_iva: Subtotal sin incluir IVA.
    :ivar total_gravado_iva: Total gravado con IVA.
    :ivar total_no_gravado_iva: Total no gravado con IVA.
    :ivar total_iva: Total del IVA aplicado.
    :ivar valor_total: Valor total de la orden después de aplicar el descuento.
    """

    id: int = Field(primary_key=True)

    productos: list[CantidadProductoCarrito] = Field(default=[])

    @computed_field  # type: ignore
    @property
    def subtotal_sin_iva(self) -> Decimal:
        return round(
            sum([producto.valor_total_sin_iva for producto in self.productos]), 0
        )

    @computed_field  # type: ignore
    @property
    def total_gravado_iva(self) -> Decimal:
        return round(
            sum(
                [
                    producto.valor_total_con_iva
                    for producto in self.productos
                    if producto.iva > 0
                ]
            ),
            0,
        )

    @computed_field  # type: ignore
    @property
    def total_no_gravado_iva(self) -> Decimal:
        return round(
            sum(
                [
                    producto.valor_total_con_iva
                    for producto in self.productos
                    if producto.iva == 0
                ]
            ),
            0,
        )

    @computed_field  # type: ignore
    @property
    def valor_total(self) -> Decimal:
        return round(self.total_gravado_iva + self.total_no_gravado_iva, 0)

    @computed_field  # type: ignore
    @property
    def total_iva(self) -> Decimal:
        return round(self.valor_total - self.subtotal_sin_iva, 0) 