import { useEffect, useState } from "react";
import { FormaPago } from "../models/formaPago";
import { useStoreAplicacion } from "../context/CarritoZustand";

/**
 * Hook para obtener las formas de pago
 * @returns las formas de pago disponibles, la forma de pago seleccionada y la función para cambiar la forma de pago
 */
export const useFormaPago = (idFormaPagoInicial?: number) => {
  const formasPagoDisponibles = useStoreAplicacion(
    (state) => state.formasPagoDisponibles
  );
  const [formaPago, setFormaPago] = useState<FormaPago | null>(null);

  const cambiarFormaPago = (idNuevaForma: number): FormaPago | null => {
    const formaPagoSeleccionada = formasPagoDisponibles?.find(
      (forma) => forma.id === idNuevaForma
    );
    if (formaPagoSeleccionada) {
      setFormaPago(formaPagoSeleccionada);
      return formaPagoSeleccionada;
    } else {
      return formaPago;
    }
  };

  useEffect(() => {
    // Initialize the payment type if given by param.
    cambiarFormaPago(idFormaPagoInicial || 1);
  }, []);

  return { formaPago, cambiarFormaPago, formasPagoDisponibles };
};
