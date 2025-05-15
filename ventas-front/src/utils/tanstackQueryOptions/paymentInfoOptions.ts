import { queryOptions } from "@tanstack/react-query";
import { FormaPago } from "../../models/formaPago";

/**
 * Options for the query that retreives the payment options.
 * @returns Check tanstack-query documentation to see all possible values.
 */

export const paymentInfoQueryOptions = () => {
  return queryOptions({
    queryKey: ["payment_options"],
    queryFn: getPaymentOptions,
    placeholderData: [], // Empty payment info while it is loading.
    staleTime: 360000, // Payment options probably won't change that much.
  });
};

/**
 * Private method that handles the query option behaviour of asking for the payment options.
 * @returns Json with all the payment options available.
 */

const getPaymentOptions = async (): Promise<Array<FormaPago>> => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_IP}/formas_pago`,
    {
      method: "GET",
    }
  );
  return response.json();
};
