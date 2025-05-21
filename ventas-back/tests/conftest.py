import pytest
from sqlalchemy import StaticPool, create_engine
from sqlmodel import Session
from app.dependencies import database
from app.dependencies.database import get_session
from app.main import app
from fastapi.testclient import TestClient
from app.model import migrations


@pytest.fixture(name="session")
def session_fixture():
    engine = create_engine(
        "sqlite:///testing.db", connect_args={"check_same_thread": False}
    )
    migrations.create_db_and_tables(engine)

    # IMPORTANTÍSIMO DEJAR EXPIRE ON COMMIT EN FALSO. Si no, la creación de la tabla (un poco más abajo) se re frutea.
    with Session(engine, expire_on_commit=False) as session:
        yield session


@pytest.fixture(name="client")
def client_fixture(session: Session):
    def get_session_override():
        return session

    migrations.populate_db(session)

    app.dependency_overrides[get_session] = get_session_override

    client = TestClient(app)

    yield client
    app.dependency_overrides.clear()
