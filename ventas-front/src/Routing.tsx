import { Navigate, Route, Routes } from "react-router";
import { CrearOrden } from "./pages/CrearOrden";
import { ListaOrdenes } from "./pages/ListaOrdenes";
import { VerOrden } from "./pages/VerOrden";
import { Layout } from "./layouts/Layout";
import { EditarOrden } from "./pages/EditarOrden";
import { useQuery } from "@tanstack/react-query";
import { paymentInfoQueryOptions } from "./utils/tanstack/paymentInfoOptions";
import { useStoreAplicacion } from "./utils/context/CarritoZustand";
import { useEffect } from "react";

export function Routing() {
  const formasPagoDisponibles = useQuery(paymentInfoQueryOptions()).data || [];

  const cambiarFormasPagoDisponibles = useStoreAplicacion(
    (state) => state.cambiarFormasPagoDisponibles
  );

  useEffect(() => {
    cambiarFormasPagoDisponibles(formasPagoDisponibles);
  }, [formasPagoDisponibles]);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Navigate to="/ordenes" />} />
        <Route path="ordenes">
          <Route index element={<ListaOrdenes />} />
          <Route path=":id">
            <Route index element={<VerOrden />} />
            <Route path="editar" element={<EditarOrden />} />
          </Route>
          <Route path="crearOrden" element={<CrearOrden />} />
        </Route>
      </Route>
    </Routes>
  );
}
