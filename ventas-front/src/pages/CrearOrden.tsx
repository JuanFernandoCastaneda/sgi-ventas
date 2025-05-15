import { useNavigate } from "react-router";
import { CarritoVentas } from "../components/carritoVentas/CarritoVentas";
import { InformacionCostoTotal } from "../components/InformacionCostoTotal";
import { useState } from "react";
import { useFormaPago } from "../utils/hooks/useFormaPago";
import { InformacionExtraOrden } from "../components/InformacionExtraOrden";
import { BotonEnviarOrden } from "../components/BotonEnviarOrden";

/**
 * Componente que representa la página entera de crear una orden.
 */
export const CrearOrden: React.FC = () => {
  const navigate = useNavigate();
  const { formaPago, cambiarFormaPago, formasPagoDisponibles } = useFormaPago();
  const [observaciones, setObservaciones] = useState<string>("");
  const [fechaFactura, setFechaFactura] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [descuento, setDescuento] = useState<number>(0);

  return (
    <>
      <header className="w-full px-4 bg-inherit h-18 flex items-center justify-start">
        <button
          onClick={() => navigate("/")}
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
          formasPagoDisponibles={formasPagoDisponibles || []}
          {...{
            formaPago,
            cambiarFormaPago,
            observaciones,
            setObservaciones,
            fechaFactura,
            setFechaFactura,
          }}
        />
        <BotonEnviarOrden
          {...{ formaPago, observaciones, fechaFactura, descuento }}
        />
      </main>
    </>
  );
};
