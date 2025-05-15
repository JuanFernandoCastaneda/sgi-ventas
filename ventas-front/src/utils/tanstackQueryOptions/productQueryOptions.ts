import { queryOptions } from "@tanstack/react-query";
import { ProductoDO } from "../../models/producto";

/**
 * Options for the query that retreives the products.
 * @returns Check tanstack-query documentation to see all possible values.
 */
export const productQueryOptions = () => {
  return queryOptions({
    queryKey: ["products"],
    queryFn: getProducts,
    staleTime: 60000, // No hace una petición nueva si hubo una activa los últimos 60 segundos (útil para no fetchear simultáneamente más de una cosa).
  });
};

/**
 * Private method that handles the query option behaviour of asking for the products.
 * @returns Json with all the products available. For now returns them as a whole, not paginated.
 */
const getProducts = async (): Promise<Array<ProductoDO>> => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_IP}/productos`, {
    method: "GET",
  });
  return response.json();
};
