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
    Producto(nombre="Carne", precio_sin_iva=Decimal("250.00"), iva=Decimal("0.08")),
    Producto(
        nombre="Forro Iphone", precio_sin_iva=Decimal("300.00"), iva=Decimal("0.21")
    ),
    Producto(
        nombre="Producto exageradoooooooooooooooooooooooooooooooooooooo",
        precio_sin_iva=Decimal(
            "1300000.000000000000000000000000000000000000000"
        ),  # Para aceptar un número de este tamaño hay que modificar el tipo de datos en la DB. In practice it won't be needed.
        iva=Decimal("0.50"),
    ),
    *[
        Producto(
            nombre=f"ProductoSpam{i}",
            precio_sin_iva=Decimal(f"{20000.00*i}"),
            iva=Decimal(f"{0.05*i}"),
        )
        for i in range(10)
    ],
]

ordenes = [
    Orden(
        observaciones="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
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
        observaciones="At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. ",
        fecha_facturacion=datetime(2025, 10, 3),
        id_forma_pago=3,
        descuento=Decimal("0.4"),
    ),
    Orden(
        observaciones="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
        fecha_facturacion=datetime(2025, 10, 3),
        id_forma_pago=1,
        descuento=Decimal("0.8"),
    ),
]

productos_orden = [
    FilaCarrito(id_orden=1, id_producto=1, cantidad=2),
    FilaCarrito(id_orden=1, id_producto=2, cantidad=1),
    FilaCarrito(id_orden=2, id_producto=3, cantidad=5),
    FilaCarrito(id_orden=3, id_producto=1, cantidad=10),
]
