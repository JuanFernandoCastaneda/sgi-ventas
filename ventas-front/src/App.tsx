import "./App.css";
import { Navigate, Route, Routes } from "react-router";
import { CrearOrden } from "./pages/CrearOrden";
import { ListaOrdenes } from "./pages/ListaOrdenes";
import { VerOrden } from "./pages/VerOrden";

function App() {
  return (
    <Routes>
      <Route index element={<Navigate to="/ordenes" />} />
      <Route path="ordenes">
        <Route index element={<ListaOrdenes />} />
        <Route path=":id" element={<VerOrden />} />
        <Route path="crearOrden" element={<CrearOrden />} />
      </Route>
    </Routes>
  );
}

export default App;
