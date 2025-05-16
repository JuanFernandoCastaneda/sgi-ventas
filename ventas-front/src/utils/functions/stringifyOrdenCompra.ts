import { DetalleOrden } from "../models/producto";
import { aStringDecimal } from "./stringADecimal";

export const stringifyOrderCompra = (
  id: number,
  productosCarrito: Map<number, number>,
  idFormaPago: number,
  observaciones: string,
  fechaFactura: string,
  descuento: number
) => {
  return JSON.stringify({
    id: id,
    detalles: Array.from(productosCarrito, ([id, cantidad]) => {
      return { id_producto: id, cantidad: cantidad } as DetalleOrden;
    }),
    id_forma_pago: idFormaPago,
    observaciones: observaciones,
    fecha_facturacion: fechaFactura,
    descuento: aStringDecimal(descuento),
  });
};
