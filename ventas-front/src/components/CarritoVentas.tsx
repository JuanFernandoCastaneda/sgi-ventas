import { useEffect, useState } from "react";
import { ProductoDO, ProductoUI } from "../models/producto";
import { TablaCarritoVentas } from "./TablaCarritoVentas";
import { MenuAgregarProducto } from "./MenuAgregarProducto";

export const CarritoVentas: React.FC<{
  productosCarro: Array<ProductoUI>;
  setProductosCarro: React.Dispatch<React.SetStateAction<Array<ProductoUI>>>;
}> = ({ productosCarro, setProductosCarro }) => {
  const [productosInventario, setProductosInventario] =
    useState<Array<ProductoDO>>([]);

  useEffect(() => {
    const response: Array<ProductoDO> = [
      {
        nombre: "Pepito",
        cantidad: 1,
        iva: 0.16,
        valorUnitSinIva: 1000,
        valorUnitConIva: 1160,
      },
    ];
    setProductosInventario(response);
  }, []);

  const agregarProductoCarrito = (id: string) => {

  } 


  return (
    <section className="p-4 bg-white rounded-lg shadow-md">
      <TablaCarritoVentas {...{ productosCarro }} />
      <MenuAgregarProducto {...{productosInventario}}/>
    </section>
  );
};
