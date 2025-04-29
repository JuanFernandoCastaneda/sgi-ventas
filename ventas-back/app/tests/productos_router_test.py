from fastapi.testclient import TestClient
from app.model.initial_data import productos
from app.main import app
import json
from decimal import Decimal

client = TestClient(app)


def test_ver_productos():
    """
    Test para verificar que el endpoint /productos devuelve todos los productos.
    """
    response = client.get("/productos")
    assert response.status_code == 200
    productos_respuesta = json.loads(response.content)
    for producto in productos_respuesta:
        assert producto["nombre"] in [p.nombre for p in productos]
        assert Decimal(producto["precio_sin_iva"]) in [
            p.precio_sin_iva for p in productos
        ]
        assert Decimal(producto["iva"]) in [p.iva for p in productos]
