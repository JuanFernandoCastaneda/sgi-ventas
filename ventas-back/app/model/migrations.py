from sqlmodel import SQLModel, Session
from sqlalchemy import Engine
from app.model.schemas.productos_model import Producto
from app.model.schemas.ordenes_model import Orden
from app.model.schemas.forma_pago_model import FormaPago
from app.model.schemas.detalles_model import DetalleOrden
from decimal import Decimal
from datetime import datetime

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
        formas_pago = [
            FormaPago(id=1, tipo="Efectivo"),
            FormaPago(id=2, tipo="Tarjeta de crédito"),
            FormaPago(id=3, tipo="Transferencia"),
        ]
        session.add_all(formas_pago)
        
        productos = [
            Producto(nombre="Papas", precio_sin_iva=Decimal("100.00"), iva=Decimal("0")),
            Producto(nombre="Carne", precio_sin_iva=Decimal("200.00"), iva=Decimal("0")),
            Producto(nombre="Forro Iphone", precio_sin_iva=Decimal("300.00"), iva=Decimal("0.21")),
        ]
        session.add_all(productos)

        ordenes = [
            Orden(observaciones="Orden 1", fecha_facturacion=datetime(2025, 10, 1), id_forma_pago=1, descuento=Decimal("0")),
            Orden(observaciones="Orden 2", fecha_facturacion=datetime(2025, 10, 2), id_forma_pago=2, descuento=Decimal("0")),
            Orden(observaciones="Orden 3", fecha_facturacion=datetime(2025, 10, 3), id_forma_pago=3, descuento=Decimal("0.4")),
        ]
        session.add_all(ordenes)

        detalles_orden = [
            DetalleOrden(id_orden=1, id_producto=1, cantidad=2),
            DetalleOrden(id_orden=1, id_producto=2, cantidad=1),
            DetalleOrden(id_orden=2, id_producto=3, cantidad=5),
            DetalleOrden(id_orden=3, id_producto=1, cantidad=10),
        ]
        session.add_all(detalles_orden)
        
        session.commit()
    except Exception as e:
        session.rollback()
    finally:
        session.close()