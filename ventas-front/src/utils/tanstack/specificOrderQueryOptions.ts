import { queryOptions } from "@tanstack/react-query";
import { HttpError } from "../errors/HttpError";
import { OrdenDOProductosCompleto } from "../models/orden";

/**
 * Options for the query that retreives a specific order.
 * @param id The id of the order to retrieve.
 * @returns Check tanstack-query documentation to see all possible values.
 */
export const specificOrderQueryOptions = (id: number) => {
  return queryOptions({
    queryKey: ["order", { id }],
    queryFn: () => getOrderById(id),
    // Low stale time because it would be opportune to update all times needed.
    staleTime: 1000 * 20,
    retry: (failureCount, error) => {
      // If the resource was not found on backend, don't relaunch.
      if (error instanceof HttpError && error.type == 4) return false;
      // If network or smth like that, relaunch up to 3
      else if (failureCount >= 3) return false;
      else return true;
    },
  });
};

/**
 * Private method that handles the query option behaviour of asking for a specific order.
 * @returns Json with the order info or null if no order was found.
 */
const getOrderById = async (
  id: number
): Promise<OrdenDOProductosCompleto | null> => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_IP}/ordenes/${id}`,
    {
      method: "GET",
    }
  );
  if (!response.ok) {
    // Relaunch an error for Tanstack to use.
    const statusCode = await response.status;
    const message = await response.text();
    throw new HttpError(message, statusCode);
  }
  return response.json();
};
