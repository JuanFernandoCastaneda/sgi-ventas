import { useQuery } from "@tanstack/react-query";
import { createProductQueryOptions } from "../tanstackQueryOptions/productQueryOptions";

/**
 * Hook para obtener los productos del inventario.
 * @returns los productos del inventario
 */
export const useProductosInventario = () => {
  const { data } = useQuery(createProductQueryOptions());
  return data;
};
