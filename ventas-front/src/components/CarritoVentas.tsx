import { useEffect, useState } from "react";
import { ProductoDO, ProductoUI } from "../models/producto";
import { TablaCarritoVentas } from "./TablaCarritoVentas";
import { MenuAgregarProducto } from "./MenuAgregarProducto";

export const CarritoVentas: React.FC<{
  productosCarro: Array<ProductoUI>;
  agregarProductoCarrito: (id: string, producto: ProductoDO) => void;
  eliminarProductoCarrito: (id: string) => void;
  actualizarCantidadProductoCarrito: (id: string, cantidad: number) => void;
}> = ({ productosCarro, agregarProductoCarrito, eliminarProductoCarrito }) => {
  const [productosInventario, setProductosInventario] = useState<
    Array<ProductoDO>
  >([]);

  useEffect(() => {
    const response: Array<ProductoDO> = [
      {
        id: "1",
        nombre: "Pepito",
        iva: 0.16,
        valorUnitSinIva: 1000,
        valorUnitConIva: 1160,
      },
    ];
    setProductosInventario(response);
  }, []);

  const agregarProductoCarritoPorNombre = (nombre: string) => {
    const producto = productosInventario.find(
      (producto) => producto.nombre === nombre
    );
    if(producto) agregarProductoCarrito(producto.id, producto);
  };

  return (
    <section className="p-4 bg-white rounded-lg shadow-md">
      <TablaCarritoVentas {...{ productosCarro, eliminarProductoCarrito }} />
      <MenuAgregarProducto
        {...{ productosInventario, agregarProductoCarritoPorNombre }}
      />
    </section>
  );
};
