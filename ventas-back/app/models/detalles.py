from sqlmodel import SQLModel, Field

class DetalleOrden(SQLModel):
    id_producto: int = Field(foreign_key="Producto.id")
    id_orden: int = Field(foreign_key="Orden.id")
    cantidad: int = Field(default=1)