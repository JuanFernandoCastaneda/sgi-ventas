import { useEffect, useState } from "react";
import { ProductoDO } from "../../models/producto";
import { MenuAgregarProducto } from "./MenuAgregarProducto";
import { TablaCarritoVentas } from "./TablaCarritoVentas";

export const CarritoVentas: React.FC<{}> = ({}) => {
  const [productosInventario, setProductosInventario] = useState<
    Array<ProductoDO>
  >([]);

  useEffect(() => {
    fetch("http://localhost:8000/productos", { method: "GET" }).then(
      async (response) => {
        const json = await response.json();
        if (!response.ok) {
          throw new Error("Error al obtener los productos");
        }
        setProductosInventario(json);
      }
    );
  }, []);

  return (
    <section className="p-4 bg-white rounded-lg shadow-md">
      <TablaCarritoVentas
        {...{
          productosInventario,
        }}
      />
      <MenuAgregarProducto {...{ productosInventario }} />
    </section>
  );
};
