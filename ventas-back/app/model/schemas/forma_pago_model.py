from sqlmodel import SQLModel, Field

class FormaPago(SQLModel, table=True):
    id: int = Field(primary_key=True)
    tipo: str = Field()
