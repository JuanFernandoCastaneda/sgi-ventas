import { DetalleOrdenDO } from "./producto";

export type OrdenDO = {
  id: number;
  fecha_facturacion: string;
  id_forma_pago: number;
  total: number;
  productos: DetalleOrdenDO[];
  descuento: number;
  observaciones: string;
  subtotal_sin_iva: number;
  total_gravado_iva: number;
  total_no_gravado_iva: number;
  total_iva: number;
  valor_total: number;
};
