from fastapi.testclient import TestClient
from app.model.initial_data import productos, productos_orden
from app.main import app
import json
from decimal import Decimal


def test_ver_productos(client: TestClient):
    """
    Test para verificar que el endpoint /productos devuelve todos los productos.
    """
    response = client.get("/productos")
    assert response.status_code == 200
    productos_respuesta = json.loads(response.content)
    for producto_respuesta in productos_respuesta:
        assert producto_respuesta["nombre"] in [
            p.nombre for p in productos
        ], f"The name does not correspond for product {producto_respuesta["id"]}"
        assert Decimal(producto_respuesta["precio_sin_iva"]) in [
            p.precio_sin_iva for p in productos
        ], f"The precio_sin_iva does not correspond for product {producto_respuesta["id"]}"
        # Máximo tienen 2 decimales en la db
        assert [
            producto_respuesta["iva"]
            for p in productos
            if round(p.iva, 2) == round(Decimal(producto_respuesta["iva"]), 2)
        ] != [], f"The iva does not correspond for product {producto_respuesta["id"]}"


def test_ver_top3(client: TestClient):
    """
    Prueba del endpoint ver top 3 productos.

    No considera el caso en que todos los productos han vendido la misma cantidad.
    """
    response = client.get("/productos/top3")
    assert response.status_code == 200
    productos_respuesta = json.loads(response.content)

    ventas_totales: dict[int, int] = {}
    for fila_carrito in productos_orden:
        actual = ventas_totales.get(fila_carrito.id_producto, 0)
        ventas_totales[fila_carrito.id_producto] = actual + fila_carrito.cantidad
    id_max1 = max(ventas_totales, key=ventas_totales.get)  # type: ignore
    cantidad_max1 = ventas_totales[id_max1]
    ventas_totales.pop(id_max1, None)
    id_max2 = max(ventas_totales, key=ventas_totales.get)  # type: ignore
    cantidad_max2 = ventas_totales[id_max2]
    ventas_totales.pop(id_max2, None)
    id_max3 = max(ventas_totales, key=ventas_totales.get)  # type: ignore
    cantidad_max3 = ventas_totales[id_max3]
    assert productos_respuesta[0]["id"] == id_max1
    assert productos_respuesta[0]["cantidad"] == cantidad_max1
    assert productos_respuesta[1]["id"] == id_max2
    assert productos_respuesta[1]["cantidad"] == cantidad_max2
    assert productos_respuesta[2]["id"] == id_max3
    assert productos_respuesta[2]["cantidad"] == cantidad_max3
