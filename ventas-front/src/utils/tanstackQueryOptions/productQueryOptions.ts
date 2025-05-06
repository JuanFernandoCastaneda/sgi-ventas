import { queryOptions } from "@tanstack/react-query";
import { ProductoDO } from "../../models/producto";

export const createProductQueryOptions = () => {
  return queryOptions({
    queryKey: ["products"],
    queryFn: getProducts,
  });
};

const getProducts = async (): Promise<Array<ProductoDO>> => {
  const response = await fetch("http://localhost:8000/productos", {
    method: "GET",
  });
  return response.json();
};
