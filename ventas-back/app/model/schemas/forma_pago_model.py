from sqlmodel import SQLModel, Field


class FormaPago(SQLModel, table=True):
    """
    Tabla en la base de datos que representa las formas de pago.

    Extiende de: SQLModel

    :ivar id: El identificador único de la forma de pago.
    :ivar tipo: El tipo de forma de pago (por ejemplo, efectivo, tarjeta).
    """

    id: int = Field(primary_key=True)
    tipo: str = Field()
