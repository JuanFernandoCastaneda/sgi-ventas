import { queryOptions } from "@tanstack/react-query";
import { ProductoDO } from "../../models/producto";

export const productQueryOptions = () => {
  return queryOptions({
    queryKey: ["products"],
    queryFn: getProducts,
    staleTime: 3000, // No hace una petición nueva si hubo una activa los últimos 5 segundos (útil para no fetchear simultáneamente más de una cosa).
  });
};

const getProducts = async (): Promise<Array<ProductoDO>> => {
  const response = await fetch("http://localhost:8000/productos", {
    method: "GET",
  });
  return response.json();
};
