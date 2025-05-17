import { DetalleOrdenDO } from "../models/producto";
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
    carrito: Array.from(productosCarrito, ([id_producto, cantidad]) => {
      return {
        id_orden: id,
        id_producto: id_producto,
        cantidad: cantidad,
      } as DetalleOrdenDO;
    }),
    id_forma_pago: idFormaPago,
    observaciones: observaciones,
    fecha_facturacion: fechaFactura,
    descuento: aStringDecimal(descuento),
  });
};
