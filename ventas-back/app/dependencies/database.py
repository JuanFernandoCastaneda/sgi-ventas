from sqlmodel import create_engine, Session, SQLModel
from typing import Annotated
from fastapi import Depends
import app.model.migrations

sqlite_file_name = "database.db"
sqlite_url = f"sqlite:///{sqlite_file_name}"

connect_args = {"check_same_thread": False}
engine = create_engine(sqlite_url, connect_args=connect_args)


def get_session():
    with Session(engine) as session:
        yield session


SessionDep = Annotated[Session, Depends(get_session)]


def create_db_and_tables():
    app.model.migrations.create_db_and_tables(engine)


def populate_db():
    with Session(engine) as session:
        app.model.migrations.populate_db(session)
