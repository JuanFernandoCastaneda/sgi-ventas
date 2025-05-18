from app.model.schemas.forma_pago_model import FormaPago
from app.model.schemas.productos_model import Producto
from app.model.schemas.ordenes_model import Orden
from app.model.schemas.carrito_model import FilaCarrito
from decimal import Decimal
from datetime import datetime

"""
Archivo con toda la data de prueba
"""

formas_pago = [
    FormaPago(id=1, tipo="Efectivo"),
    FormaPago(id=2, tipo="Tarjeta de crédito"),
    FormaPago(id=3, tipo="Transferencia"),
]

productos = [
    Producto(nombre="Papas", precio_sin_iva=Decimal("100.00"), iva=Decimal("0")),
    Producto(nombre="Carne", precio_sin_iva=Decimal("200.00"), iva=Decimal("0")),
    Producto(
        nombre="Forro Iphone", precio_sin_iva=Decimal("300.00"), iva=Decimal("0.21")
    ),
    Producto(
        nombre="Producto exageradoooooooooooooooooooooooooooooooooooooo",
        precio_sin_iva=Decimal(
            "1300.000000000000000000000000000000000000000000"
        ),  # Para aceptar un número de este tamaño hay que modificar el tipo de datos en la DB. In practice it won't be needed.
        iva=Decimal("0.50"),
    ),
    Producto(nombre="ProductoSpam", precio_sin_iva=Decimal("200.00"), iva=Decimal("0")),
    *[
        Producto(
            nombre="ProductoSpam", precio_sin_iva=Decimal("200.00"), iva=Decimal("0")
        )
        for i in range(10)
    ],
]

ordenes = [
    Orden(
        observaciones="Orden 1",
        fecha_facturacion=datetime(2025, 10, 1),
        id_forma_pago=1,
        descuento=Decimal("0"),
    ),
    Orden(
        observaciones="Orden 2",
        fecha_facturacion=datetime(2025, 10, 2),
        id_forma_pago=2,
        descuento=Decimal("0"),
    ),
    Orden(
        observaciones="Orden 3",
        fecha_facturacion=datetime(2025, 10, 3),
        id_forma_pago=3,
        descuento=Decimal("0.4"),
    ),
]

productos_orden = [
    FilaCarrito(id_orden=1, id_producto=1, cantidad=2),
    FilaCarrito(id_orden=1, id_producto=2, cantidad=1),
    FilaCarrito(id_orden=2, id_producto=3, cantidad=5),
    FilaCarrito(id_orden=3, id_producto=1, cantidad=10),
]
