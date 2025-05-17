import { DetalleOrdenDO, ProductoDOCompleto } from "./producto";

/**
 * Modelo de orden que se recibe del backend
 */
export type OrdenDO = {
  id: number;
  fecha_facturacion: string;
  id_forma_pago: number;
  carrito: DetalleOrdenDO[];
  descuento: number;
  observaciones: string;
  subtotal_sin_iva: number;
  total_gravado_iva: number;
  total_no_gravado_iva: number;
  total_iva: number;
  valor_total: number;
};

export type OrdenConProductosPublic = {
  id: number;
  fecha_facturacion: string;
  id_forma_pago: number;
  informacionCompletaProductos: ProductoDOCompleto[];
  descuento: number;
  observaciones: string;
  subtotal_sin_iva: number;
  total_gravado_iva: number;
  total_no_gravado_iva: number;
  total_iva: number;
  valor_total: number;
};
