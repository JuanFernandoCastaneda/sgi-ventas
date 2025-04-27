from sqlmodel import SQLModel, Field
from decimal import Decimal
from app.models.productos_model import SessionDep

"""
No es necesario tener la separación, por lo que no se van a crear Productos desde la API.
"""
class ProductoBase(SQLModel):
    nombre: str = Field()
    precioSinIva: Decimal = Field(decimal_places=3)
    iva: Decimal = Field(default=0, decimal_places=3)

class Producto(ProductoBase, table=True):
    id: int = Field(primary_key=True)

class ProductoPublic(Producto):
    precioConIva: Decimal = Field(decimal_places=3)

class ProductoConCantidad(ProductoPublic):
    cantidad: int = Field()
     