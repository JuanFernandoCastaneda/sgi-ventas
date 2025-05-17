import { useEffect } from "react";
import { EdicionCamposOrden } from "../components/EdicionCamposOrden";
import { useStoreAplicacion } from "../utils/context/CarritoZustand";

/**
 * Componente que representa la página entera de crear una orden.
 */
export const CrearOrden: React.FC = () => {
  const vaciarCarrito = useStoreAplicacion((state) => state.vaciarCarrito);

  useEffect(() => {
    vaciarCarrito();
  }, []);

  // It is like editing an order without any initial values.
  return <EdicionCamposOrden />;
};
