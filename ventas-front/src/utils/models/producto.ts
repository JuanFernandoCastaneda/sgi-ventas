/**
 * Modelo de producto que se recibe del backend
 */
export type ProductoDO = {
  id: number;
  nombre: string;
  iva: number;
  precio_sin_iva: number;
  precio_con_iva: number;
};

export type ProductoDOCompleto = ProductoDO & {
  cantidad: number;
};

/**
 * Modelo de detalle de orden que se recibe del backend
 */
export type DetalleOrdenDO = {
  id_orden: number;
  id_producto: number;
  cantidad: number;
};
