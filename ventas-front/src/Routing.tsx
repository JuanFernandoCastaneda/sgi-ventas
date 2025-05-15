import { Navigate, Route, Routes } from "react-router";
import { CrearOrden } from "./pages/CrearOrden";
import { ListaOrdenes } from "./pages/ListaOrdenes";
import { VerOrden } from "./pages/VerOrden";
import { Layout } from "./layouts/Layout";

export function Routing() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Navigate to="/ordenes" />} />
        <Route path="ordenes">
          <Route index element={<ListaOrdenes />} />
          <Route path=":id" element={<VerOrden />} />
          <Route path="crearOrden" element={<CrearOrden />} />
        </Route>
      </Route>
    </Routes>
  );
}
