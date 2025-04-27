from sqlmodel import SQLModel, Field

class DetalleOrden(SQLModel, table=True):
    id_producto: int = Field(primary_key=True, foreign_key="producto.id")
    id_orden: int = Field(primary_key=True, foreign_key="orden.id")
    cantidad: int = Field(default=1)
