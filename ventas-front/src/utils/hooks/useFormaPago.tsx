import { useState } from "react";
import { FormaPago } from "../models/formaPago";
import { useQuery } from "@tanstack/react-query";
import { paymentInfoQueryOptions } from "../tanstackQueryOptions/paymentInfoOptions";

/**
 * Hook para obtener las formas de pago
 * @returns las formas de pago disponibles, la forma de pago seleccionada y la función para cambiar la forma de pago
 */
export const useFormaPago = (idFormaPagoInicial?: number) => {
  const { data: formasPagoDisponibles } = useQuery(paymentInfoQueryOptions());
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

  // Initialize the payment type if given by param.
  idFormaPagoInicial && cambiarFormaPago(idFormaPagoInicial);

  return { formaPago, cambiarFormaPago, formasPagoDisponibles };
};
