from sqlmodel import SQLModel, Session
from sqlalchemy import Engine
from app.model.schemas.productos_model import Producto
from app.model.schemas.ordenes_model import Orden
from app.model.initial_data import formas_pago, productos, ordenes, detalles_orden


def create_db_and_tables(engine: Engine) -> None:
    """
    Crea la base de datos y las tablas necesarias.
    """
    SQLModel.metadata.create_all(engine)


def populate_db(session: Session) -> None:
    """
    Crea datos de prueba en la base de datos.
    No importa si ya existen los datos.
    """
    try:
        session.add_all(formas_pago)
        session.add_all(productos)
        session.add_all(ordenes)
        session.add_all(detalles_orden)
        session.commit()
    except Exception as e:
        session.rollback()
    finally:
        session.close()
