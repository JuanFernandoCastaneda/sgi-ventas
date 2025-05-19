import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { specificOrderQueryOptions } from "../utils/tanstack/specificOrderQueryOptions";
import { cambiarFormaPago } from "../utils/functions/formaPagoPorId";
import { useStoreAplicacion } from "../utils/context/CarritoZustand";
import { VerOrdenResumen } from "../components/VerOrden/VerOrdenResumen";
import { VerOrdenObservaciones } from "../components/VerOrden/VerOrdenObservaciones";
import { VerOrdenProductos } from "../components/VerOrden/VerOrdenProductos";

/**
 * Componente que representa la vista detallada de una orden.
 */
export const VerOrden: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  if (!id) {
    return <div>Error</div>;
  }

  /**
   * I mean... in practice this works. But I don't have any suspense element covering this one so...
   */
  const {
    data: orden,
    isPending,
    isError,
  } = useQuery(specificOrderQueryOptions(parseInt(id)));

  const formasPagoDisponibles = useStoreAplicacion(
    (state) => state.formasPagoDisponibles
  );
  const formaPago = cambiarFormaPago(
    orden?.id_forma_pago || 1,
    formasPagoDisponibles
  );

  if (isPending) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <header className="w-full px-4 bg-inherit h-18 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/ordenes", { replace: true })}
            className="bg-inherit p-2 text-gray-500 text-4xl font-stretch-50%"
          >
            {"<"}
          </button>
          <h2 className="font-medium text-xl text-gray-700">{`OCD #${orden?.id}`}</h2>
        </div>
        {orden && !isError && (
          <>
            <span className="text-lg text-gray-600">
              Fecha: {orden.fecha_facturacion.split("T")[0]}
            </span>
            <button
              onClick={() => navigate(`editar`)}
              className="py-1 px-2 outline-2 text-font-gray rounded-md outline-font-hover-purple hover:bg-font-hover-purple hover:text-white font-medium focus:outline-blue-400"
            >
              Editar orden
            </button>
          </>
        )}
      </header>
      <main className="w-full p-4 space-y-4 text-font-gray">
        {!orden || isError ? (
          <p>Orden no válida</p>
        ) : (
          <>
            <VerOrdenProductos orden={orden} />
            <div className="lg:grid lg:grid-cols-2 space-y-4 lg:space-y-0 lg:space-x-4">
              <VerOrdenResumen orden={orden} formaPago={formaPago} />
              <VerOrdenObservaciones orden={orden} />
            </div>
          </>
        )}
      </main>
    </>
  );
};
