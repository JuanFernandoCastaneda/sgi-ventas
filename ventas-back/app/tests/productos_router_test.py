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
    for producto_respuesta in productos_respuesta:
        assert producto_respuesta["nombre"] in [p.nombre for p in productos]
        assert Decimal(producto_respuesta["precio_sin_iva"]) in [
            p.precio_sin_iva for p in productos
        ]
        # Máximo tienen 2 decimales en la db
        assert [
            producto_respuesta["iva"]
            for p in productos
            if round(p.iva, 2) == round(Decimal(producto_respuesta["iva"]), 2)
        ] != []
