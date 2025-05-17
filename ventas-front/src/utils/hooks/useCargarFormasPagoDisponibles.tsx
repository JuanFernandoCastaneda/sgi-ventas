import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { paymentInfoQueryOptions } from "../tanstack/paymentInfoOptions";
import { useStoreAplicacion } from "../context/CarritoZustand";

export const useCargarFormasPagoDisponibles = () => {
  const formasPagoDisponibles = useQuery(paymentInfoQueryOptions()).data || [];

  const cambiarFormasPagoDisponibles = useStoreAplicacion(
    (state) => state.cambiarFormasPagoDisponibles
  );

  useEffect(() => {
    cambiarFormasPagoDisponibles(formasPagoDisponibles);
  }, [formasPagoDisponibles]);
};
