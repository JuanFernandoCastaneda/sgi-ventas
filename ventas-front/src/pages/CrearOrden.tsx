import { useNavigate } from "react-router";
import { CarritoVentas } from "../components/carritoVentas/CarritoVentas";
import { InformacionCostoTotal } from "../components/InformacionCostoTotal";
import { useState } from "react";
import { useProductosInventario } from "../utils/hooks/useProductosInventario";
import { useFormaPago } from "../utils/hooks/useFormaPago";
import { InformacionExtraOrden } from "../components/InformacionExtraOrden";
import { useCarrito } from "../utils/context/CarritoContext";

export const CrearOrden: React.FC = () => {
  const navigate = useNavigate();

  const productosInventario = useProductosInventario();
  const productosCarrito = useCarrito().carroCompras;
  const { formaPago, cambiarFormaPago, formasPagoDisponibles } = useFormaPago();
  const [observaciones, setObservaciones] = useState<string>("");
  const [fechaFactura, setFechaFactura] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

  const crearOrdenCompra = () => {
    const body = JSON.stringify({
      id: -1,
      productos: JSON.stringify(productosCarrito),
      id_forma_pago: formaPago?.id || 1,
      observaciones: observaciones,
      fecha_facturacion: fechaFactura,
    });
    console.log(body);
    fetch("http://localhost:8000/ordenes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    }).then((response) => {
      if (response.ok) {
        console.log("Orden de compra creada");
      }
    });
  };

  return (
    <>
      <header className="w-full px-4 bg-inherit h-18 flex items-center justify-start">
        <button
          onClick={() => navigate(-1)}
          className="bg-inherit p-2 text-gray-500 text-4xl font-stretch-50%"
        >
          {"<"}
        </button>
        <h2 className="font-medium text-xl text-gray-700">{`OCD ${0.01}`}</h2>
      </header>
      <main className="w-full px-4">
        <CarritoVentas productosInventario={productosInventario} />
        <InformacionCostoTotal productosInventario={productosInventario} />
        <InformacionExtraOrden
          {...{
            formaPago,
            cambiarFormaPago,
            formasPagoDisponibles,
            observaciones,
            setObservaciones,
            fechaFactura,
            setFechaFactura,
          }}
        />
        <button onClick={() => crearOrdenCompra()}>Crear ODC</button>
      </main>
    </>
  );
};
