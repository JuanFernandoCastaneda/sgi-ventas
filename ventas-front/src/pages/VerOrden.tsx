import { useNavigate, useParams } from "react-router";
import { formatearComoDinero } from "../utils/functions/formatearDinero";
import { InfoAtributo } from "../components/InfoAtributo";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { specificOrderQueryOptions } from "../utils/tanstackQueryOptions/specificOrderQueryOptions";
import { HttpError } from "../utils/errors/HttpError";

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

  if (isPending) {
    return <div>Cargando...</div>;
  }

  console.log("Orden", orden);

  return (
    <>
      <header className="w-full px-4 bg-inherit h-18 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="bg-inherit p-2 text-gray-500 text-4xl font-stretch-50%"
          >
            {"<"}
          </button>
          <h2 className="font-medium text-xl text-gray-700">{`OCD #${orden?.id}`}</h2>
        </div>
        {orden && !isError && (
          <span className="text-sm text-gray-500">
            <span>Orden: {orden.toString()}</span>
            Fecha: {orden.fecha_facturacion.split("T")[0]}
          </span>
        )}
      </header>
      <main className="w-full p-4 space-y-4">
        {!orden || isError ? (
          <p>Orden no válida</p>
        ) : (
          <>
            <div className="bg-white rounded-md p-6 shadow-sm space-y-6">
              <h3 className="text-xl font-medium text-gray-700">Resumen</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
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
                </div>
                <div className="space-y-2">
                  <InfoAtributo
                    label="Descuento"
                    value={`${orden.descuento}%`}
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
              </div>
              <div className="border-t pt-4">
                <InfoAtributo
                  label="Observaciones"
                  value={orden.observaciones || "Sin observaciones"}
                />
              </div>
            </div>
            <div className="bg-white rounded-md p-6 shadow-sm">
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
                  {orden.productos.map((producto) => (
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
            </div>
          </>
        )}
      </main>
    </>
  );
};
