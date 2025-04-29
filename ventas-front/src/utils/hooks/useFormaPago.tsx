import { useEffect, useState } from "react";
import { FormaPago } from "../../models/formaPago";

/**
 * Hook para obtener las formas de pago
 * @returns las formas de pago disponibles, la forma de pago seleccionada y la función para cambiar la forma de pago
 */
export const useFormaPago = () => {
  const [formaPago, setFormaPago] = useState<FormaPago | null>(null);
  const [formasPagoDisponibles, setFormasPagoDisponibles] = useState<
    FormaPago[]
  >([]);

  useEffect(() => {
    fetch("http://localhost:8000/formas_pago", {
      method: "GET",
    }).then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        setFormasPagoDisponibles(data);
      } else {
        console.error("Error pidiendo formas de pago");
      }
    });
  }, []);

  const cambiarFormaPago = (idNuevaForma: number): FormaPago | null => {
    const formaPagoSeleccionada = formasPagoDisponibles.find(
      (forma) => forma.id === idNuevaForma
    );
    if (formaPagoSeleccionada) {
      setFormaPago(formaPagoSeleccionada);
      return formaPagoSeleccionada;
    } else {
      return formaPago;
    }
  };

  return { formaPago, cambiarFormaPago, formasPagoDisponibles };
};
