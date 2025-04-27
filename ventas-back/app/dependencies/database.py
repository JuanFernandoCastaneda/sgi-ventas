from sqlmodel import create_engine, Session, SQLModel
from typing import Annotated
from fastapi import Depends
import migrations

# Importar tablas. Necesario para que SQLModel cree las tablas.
import models.productos_model
import models.ordenes_model
import models.detalles_model

sqlite_file_name = "database.db"
sqlite_url = f"sqlite:///{sqlite_file_name}"

connect_args = {"check_same_thread": False}
engine = create_engine(sqlite_url, connect_args=connect_args)

migrations.create_db_and_tables(engine)

def get_session():
    with Session(engine) as session:
        yield session

SessionDep = Annotated[Session, Depends(get_session)]