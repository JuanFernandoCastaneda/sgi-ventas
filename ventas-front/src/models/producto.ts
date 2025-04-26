export type ProductoDO = {
    nombre: string;
    cantidad: number; 
    iva: number;
    valorUnitSinIva: number;
  valorUnitConIva: number;
};

export type ProductoUI = ProductoDO & {
    valorTotalConIva: number;
}
