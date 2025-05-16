import { DetalleOrdenDO, ProductoDOCompleto } from "./producto";

/**
 * Modelo de orden que se recibe del backend
 */
export type OrdenDO = {
  id: number;
  fecha_facturacion: string;
  id_forma_pago: number;
  productos: DetalleOrdenDO[];
  descuento: number;
  observaciones: string;
  subtotal_sin_iva: number;
  total_gravado_iva: number;
  total_no_gravado_iva: number;
  total_iva: number;
  valor_total: number;
};

export type OrdenDOProductosCompleto = {
  id: number;
  fecha_facturacion: string;
  id_forma_pago: number;
  productos: ProductoDOCompleto[];
  descuento: number;
  observaciones: string;
  subtotal_sin_iva: number;
  total_gravado_iva: number;
  total_no_gravado_iva: number;
  total_iva: number;
  valor_total: number;
};
