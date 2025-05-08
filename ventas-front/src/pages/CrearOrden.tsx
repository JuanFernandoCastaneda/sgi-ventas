import { useNavigate } from "react-router";
import { CarritoVentas } from "../components/carritoVentas/CarritoVentas";
import { InformacionCostoTotal } from "../components/InformacionCostoTotal";
import { useState } from "react";
import { useFormaPago } from "../utils/hooks/useFormaPago";
import { InformacionExtraOrden } from "../components/InformacionExtraOrden";
import { useStoreAplicacion } from "../utils/context/CarritoZustand";

/**
 * Componente que representa la página entera de crear una orden.
 */
export const CrearOrden: React.FC = () => {
  const navigate = useNavigate();
  const productosCarrito = useStoreAplicacion((state) => state.carrito);
  const { formaPago, cambiarFormaPago, formasPagoDisponibles } = useFormaPago();
  const [observaciones, setObservaciones] = useState<string>("");
  const [fechaFactura, setFechaFactura] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [descuento, setDescuento] = useState<number>(0);

  const aStringDecimal = (numero: number) => {
    let encoding = numero.toString();
    const cantidadCerosFaltante = 2 - encoding.length;
    if (cantidadCerosFaltante > 0) {
      encoding = "0".repeat(cantidadCerosFaltante) + encoding;
    }
    return encoding.slice(0, -2) + "." + encoding.slice(-2);
  };

  const crearOrdenCompra = () => {
    const body = JSON.stringify({
      id: -1,
      detalles: productosCarrito,
      id_forma_pago: formaPago?.id || 1,
      observaciones: observaciones,
      fecha_facturacion: fechaFactura,
      descuento: aStringDecimal(descuento),
    });
    console.log(body);
    fetch("http://localhost:8000/ordenes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    }).then(async (response) => {
      if (response.ok) {
        console.log("Orden de compra creada");
      }
      const json = await response.json();
      navigate(`/ordenes/${json.id}`);
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
        <h2 className="font-medium text-xl text-gray-700">{`Crear OCD`}</h2>
      </header>
      <main className="w-full px-4">
        <CarritoVentas />
        <InformacionCostoTotal
          descuento={descuento}
          setDescuento={setDescuento}
        />
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
        <div className="mt-6 mb-10 flex flex-row justify-center h-10">
          <button
            onClick={() => crearOrdenCompra()}
            className="py-1 px-2 outline-2 text-font-gray rounded-md outline-font-hover-purple hover:bg-font-hover-purple hover:text-white font-medium"
          >
            Crear ODC
          </button>
        </div>
      </main>
    </>
  );
};
