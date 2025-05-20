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
