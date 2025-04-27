from sqlmodel import SQLModel, Session
from sqlalchemy import Engine
from .models.productos_model import Producto
from decimal import Decimal

def create_db_and_tables(engine: Engine) -> None:
    SQLModel.metadata.create_all(engine)