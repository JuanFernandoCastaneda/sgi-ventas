from sqlmodel import SQLModel, Field
from decimal import Decimal

"""
No es necesario tener la separación, por lo que no se van a crear Productos desde la API.
"""
class ProductoBase(SQLModel):
    nombre: str = Field()
    precioSinIva: Decimal | None = Field(default=None, decimal_places=3)
    iva: Decimal = Field(default=0, decimal_places=3)
    precioConIva: Decimal | None = Field(default=None, decimal_places=3)

class Producto(ProductoBase, table=True):
    id: int = Field(primary_key=True)