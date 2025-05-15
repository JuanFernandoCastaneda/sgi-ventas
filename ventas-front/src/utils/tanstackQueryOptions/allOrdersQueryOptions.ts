import { queryOptions } from "@tanstack/react-query";
import { OrdenDOProductosCompleto } from "../../models/orden";
import { HttpError } from "../errors/HttpError";

/**
 * Options for the query that retreives all orders.
 * @returns Check tanstack-query documentation to see all possible values.
 */
export const allOrdersQueryOptions = () => {
  return queryOptions({
    queryKey: ["orders"],
    queryFn: () => getOrders(),
    // Low stale time because it would be opportune to update all times needed.
    staleTime: 1000 * 20,
    placeholderData: [],
    retry: 2,
  });
};

/**
 * Private method that handles the query option behaviour of asking for a specific order.
 * @returns Json with the order info or null if no order was found.
 */
const getOrders = async (): Promise<Array<OrdenDOProductosCompleto>> => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_IP}/ordenes/`, {
    method: "GET",
  });
  if (!response.ok) {
    // Relaunch an error for Tanstack to use.
    const statusCode = await response.status;
    const message = await response.text();
    throw new HttpError(message, statusCode);
  }
  return response.json();
};
