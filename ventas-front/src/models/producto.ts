export type ProductoDO = {
  id: string;
  nombre: string;
  iva: number;
  precio_sin_iva: number;
  precio_con_iva: number;
};

export type ProductoUI = ProductoDO & {
  cantidad: number;
  valorTotalConIva: number;
};
