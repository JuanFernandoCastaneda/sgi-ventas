import { useEffect, useState } from "react";
import { ProductoDO } from "../../models/producto";

/**
 * Hook para obtener los productos del inventario.
 * @returns los productos del inventario
 */
export const useProductosInventario = () => {
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

  return productosInventario;
};
