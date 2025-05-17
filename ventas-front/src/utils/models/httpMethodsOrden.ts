import { stringifyOrderCompra } from "../functions/stringifyOrdenCompra";
import { FormaPago } from "./formaPago";

/**
 * Method that handles the post of the orderCompra.
 * @param productosCarrito
 * @param formaPago
 * @param observaciones
 * @param fechaFactura
 * @param descuento
 * @returns Promise with the response.
 */
export const postOrdenCompra = (
  productosCarrito: Map<number, number>,
  formaPago: FormaPago | null,
  observaciones: string,
  fechaFactura: string,
  descuento: number
) => {
  const body = stringifyOrderCompra(
    -1, // Given that we are posting (creating), id isn't necessary.
    productosCarrito,
    formaPago?.id || 1, // Default payment option if no one was specified.
    observaciones,
    fechaFactura,
    descuento
  );
  return fetch(`${import.meta.env.VITE_BACKEND_IP}/ordenes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: body,
  });
};

export const updateOrdenCompra = (
  id: number,
  productosCarrito: Map<number, number>,
  formaPago: FormaPago | null,
  observaciones: string,
  fechaFactura: string,
  descuento: number
) => {
  const body = stringifyOrderCompra(
    id, // Given that we are posting (creating), id isn't necessary.
    productosCarrito,
    formaPago?.id || 1, // Default payment option if no one was specified.
    observaciones,
    fechaFactura,
    descuento
  );
  return fetch(`${import.meta.env.VITE_BACKEND_IP}/ordenes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: body,
  });
};
