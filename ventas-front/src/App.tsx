import "./App.css";
import { Route, Routes } from "react-router";
import { Home } from "./pages/Home";
import { CrearOrden } from "./pages/CrearOrden";
import { ListaOrdenes } from "./pages/ListaOrdenes";
import { DetalleOrden } from "./pages/DetalleOrden";

function App() {
  return (
    <Routes>
      <Route index element={<Home/>} />
      <Route path="ordenes">
        <Route index element={<ListaOrdenes/>}/>
        <Route path=":id" element={<DetalleOrden/>} />
        <Route path="crearOrden" element={<CrearOrden/>} />
      </Route>
    </Routes>
  );
}

export default App;
