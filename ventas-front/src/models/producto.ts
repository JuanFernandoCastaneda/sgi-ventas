export type ProductoDO = {
  id: string;
  nombre: string;
  iva: number;
  valorUnitSinIva: number;
  valorUnitConIva: number;
};

export type ProductoUI = ProductoDO & {
  cantidad: number;
  valorTotalConIva: number;
};
