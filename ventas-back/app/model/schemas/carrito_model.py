from sqlmodel import SQLModel, Field
from sqlalchemy import CheckConstraint


class Carrito(SQLModel, table=True):
    """
    Tabla en la base de datos que representa la cantidad de producto que se encargó en una orden.

    Extiende de: SQLModel

    :ivar id_producto: El identificador del producto.
    :ivar id_orden: El identificador de la orden.
    :ivar cantidad: La cantidad de producto que se encargó. Debe ser mayor o igual a 0.
    """

    id_producto: int = Field(primary_key=True, foreign_key="producto.id")
    id_orden: int = Field(primary_key=True, foreign_key="orden.id")
    cantidad: int = Field(default=0, ge=0)

    __table_args__ = (
        CheckConstraint("cantidad >= 0", name="cantidad_mayor_o_igual_a_cero"),
    )
