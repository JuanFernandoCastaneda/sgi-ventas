import { FormaPago } from "../models/formaPago";

export const cambiarFormaPago = (
  idNuevaForma: number,
  formasPagoDisponibles: Array<FormaPago>
): FormaPago | null => {
  const formaPagoSeleccionada = formasPagoDisponibles?.find(
    (forma) => forma.id === idNuevaForma
  );
  return formaPagoSeleccionada || null;
};
