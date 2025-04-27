from sqlmodel import SQLModel, Field
from decimal import Decimal

"""
No es necesario tener la separación, por lo que no se van a crear Productos desde la API.
"""
class ProductoBase(SQLModel):
    nombre: str = Field()
    precio_sin_iva: Decimal = Field(decimal_places=3)
    iva: Decimal = Field(default="0", decimal_places=3)

class Producto(ProductoBase, table=True):
    id: int = Field(primary_key=True)

class ProductoPublic(Producto):
    precio_con_iva: Decimal = Field(decimal_places=3)

class ProductoConCantidad(ProductoPublic):
    cantidad: int = Field()
