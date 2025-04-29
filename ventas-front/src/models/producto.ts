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

/**
 * Modelo de detalle de orden usado internamente
 */
export type DetalleOrden = {
  id_producto: number;
  cantidad: number;
};

/**
 * Modelo de detalle de orden que se recibe del backend
 */
export type DetalleOrdenDO = DetalleOrden & {
  id_orden: number;
};
