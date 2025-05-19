import { useNavigate, useParams } from "react-router";
import { formatearComoDinero } from "../utils/functions/formatearDinero";
import { InfoAtributo } from "../components/ui/InfoAtributo";
import { useQuery } from "@tanstack/react-query";
import { specificOrderQueryOptions } from "../utils/tanstack/specificOrderQueryOptions";
import { descuentoANumber } from "../utils/functions/stringADecimal";
import { cambiarFormaPago } from "../utils/functions/formaPagoPorId";
import { useStoreAplicacion } from "../utils/context/CarritoZustand";
import { PrettyBox } from "../components/ui/PrettyBox";

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
            <PrettyBox>
              <h3 className="text-xl font-medium text-gray-700 mb-4">
                Productos
              </h3>
              <table className="w-full">
                <thead className="text-left text-gray-600">
                  <tr>
                    <th className="py-2">Nombre</th>
                    <th className="py-2">Cantidad</th>
                    <th className="py-2">IVA</th>
                    <th className="py-2">Precio Unitario</th>
                    <th className="py-2">Total</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {orden.informacionCompletaProductos.map((producto) => (
                    <tr key={producto.id} className="border-t">
                      <td className="py-2">{producto.nombre}</td>
                      <td className="py-2">{producto.cantidad}</td>
                      <td className="py-2">{producto.iva * 100}%</td>
                      <td className="py-2">
                        {formatearComoDinero(producto.precio_con_iva)}
                      </td>
                      <td className="py-2">
                        {formatearComoDinero(
                          producto.precio_con_iva * producto.cantidad
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </PrettyBox>
            <div className="lg:grid lg:grid-cols-2 space-y-4 lg:space-y-0 lg:space-x-4">
              <PrettyBox className="space-y-6 lg:grid-rows-4">
                <h3 className="text-xl font-medium text-gray-700">Resumen</h3>
                <div className="grid sm:grid-cols-2 sm:grid-rows-4 gap-4">
                  <InfoAtributo
                    label="Subtotal sin IVA"
                    value={orden.subtotal_sin_iva}
                    formatAsMoney
                  />
                  <InfoAtributo
                    label="Total gravado IVA"
                    value={orden.total_gravado_iva}
                    formatAsMoney
                  />
                  <InfoAtributo
                    label="Total no gravado IVA"
                    value={orden.total_no_gravado_iva}
                    formatAsMoney
                  />
                  <InfoAtributo
                    label="Forma pago"
                    value={formaPago?.tipo || ""}
                  />
                  <InfoAtributo
                    label="Descuento"
                    value={`${descuentoANumber(orden.descuento)}%`}
                  />
                  <InfoAtributo
                    label="Valor Total"
                    value={orden.valor_total}
                    formatAsMoney
                  />
                  <InfoAtributo
                    label="Total IVA"
                    value={orden.total_iva}
                    formatAsMoney
                  />
                </div>
              </PrettyBox>
              <PrettyBox className="w-full space-y-6 flex-flex-col">
                <h3 className="w-full text-xl font-medium text-gray-700">
                  Observaciones
                </h3>
                <div className="w-inherit grow-1 text-[15px] rounded-md align-text-top align-top text-gray-700 prose">
                  {orden.observaciones.split("\n").map((paragraph) => (
                    <p className="text-gray-700 break-all">{paragraph}</p>
                  ))}
                </div>
              </PrettyBox>
            </div>
          </>
        )}
      </main>
    </>
  );
};
