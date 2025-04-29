export type ProductoDO = {
  id: number;
  nombre: string;
  iva: number;
  precio_sin_iva: number;
  precio_con_iva: number;
};

export type DetalleOrden = {
  id_producto: number;
  cantidad: number;
};

export type DetalleOrdenDO = DetalleOrden & {
  id_orden: number;
};
