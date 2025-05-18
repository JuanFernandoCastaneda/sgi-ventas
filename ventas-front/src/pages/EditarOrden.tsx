import { useParams } from "react-router";
import { EdicionCamposOrden } from "../components/EdicionCamposOrden/EdicionCamposOrden";
import { useQuery } from "@tanstack/react-query";
import { specificOrderQueryOptions } from "../utils/tanstack/specificOrderQueryOptions";
import { useStoreAplicacion } from "../utils/context/CarritoZustand";
import { useEffect } from "react";

/**
 * Componente que representa la página entera de crear una orden.
 */
export const EditarOrden: React.FC = ({}) => {
  const { id } = useParams();

  if (!id) {
    return <div>Error</div>;
  }

  const {
    data: orden,
    isPending,
    isError,
    isSuccess,
  } = useQuery(specificOrderQueryOptions(parseInt(id)));

  const modificarCantidadProducto = useStoreAplicacion(
    (state) => state.modificarCantidadProducto
  );
  const vaciarCarrito = useStoreAplicacion((state) => state.vaciarCarrito);

  useEffect(() => {
    vaciarCarrito();
    orden?.informacionCompletaProductos.forEach((producto) => {
      modificarCantidadProducto(producto.id, producto.cantidad);
    });
  }, [isSuccess]);

  if (isPending) {
    return <div>Cargando...</div>;
  }

  // It is like editing an order without any initial values.
  return !orden || isError ? (
    <p>Orden no válida</p>
  ) : (
    <EdicionCamposOrden
      orderId={orden.id}
      descuentoInicial={orden.descuento}
      observacionesIniciales={orden.observaciones}
      fechaFacturaInicial={orden.fecha_facturacion.split("T")[0]}
      idFormaPagoInicial={orden.id_forma_pago}
    />
  );
};
