from fastapi.testclient import TestClient
from app.model.initial_data import ordenes
from app.main import app
import json
from decimal import Decimal


def test_ver_ordenes(client: TestClient):
    response = client.get("/ordenes")
    assert response.status_code == 200
    ordenes_respuesta = json.loads(response.content)
    assert len(ordenes_respuesta) == len(
        ordenes
    ), "Didn't return the same number of orders"
    for orden in ordenes:
        search = [
            orden_resp
            for orden_resp in ordenes_respuesta
            if orden.observaciones == orden_resp["observaciones"]
            and round(orden.descuento, 2) == round(Decimal(orden_resp["descuento"]), 2)
            and orden.id_forma_pago == orden_resp["id_forma_pago"]
        ]
        assert search != [], f"Order {orden} was not created"
