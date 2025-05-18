import { formatearComoDinero } from "../../utils/functions/formatearDinero";
import { useQuery } from "@tanstack/react-query";
import { productQueryOptions } from "../../utils/tanstack/productQueryOptions";
import { useStoreAplicacion } from "../../utils/context/CarritoZustand";
import { CampoEditableEntero } from "../ui/CampoEditableEntero";

/**
 * Componente que representa la información del costo asociado al carrito.
 */
export const InformacionCostoTotal: React.FC<{
  descuento: number;
  setDescuento: Function;
}> = ({ descuento, setDescuento }) => {
  const { data } = useQuery(productQueryOptions());
  const productosInventario = data || [];

  const carrito = useStoreAplicacion((state) => state.carrito);

  let subtotalSinIVA = 0;
  let totalGravadoConIVA = 0;
  let totalNoGravadoConIVA = 0;
  let valorTotalOCD = 0;

  carrito.forEach((cantidad, id) => {
    const producto = productosInventario.find((producto) => producto.id === id);
    if (!producto) {
      return <p>Error encontrando producto en el inventario</p>;
    }
    subtotalSinIVA += cantidad * producto.precio_sin_iva;
    totalGravadoConIVA +=
      producto.iva > 0 ? cantidad * producto.precio_con_iva : 0;
    totalNoGravadoConIVA +=
      producto.iva == 0 ? cantidad * producto.precio_con_iva : 0;
    valorTotalOCD += cantidad * producto.precio_con_iva;
  });

  return (
    <section className="w-full py-2">
      <table className="border-separate border-spacing-2 table-fixed">
        <thead>
          <tr>
            <th scope="column" className="w-1/7 text-left text-font-gray">
              Subtotal sin IVA
            </th>
            <th scope="column" className="w-1/7 text-left text-font-gray">
              Total gravado con IVA
            </th>
            <th scope="column" className="w-1/7 text-left text-font-gray">
              Total no gravado con IVA
            </th>
            <th scope="column" className="w-1/7 text-left text-font-gray">
              Total IVA
            </th>
            <th scope="column" className="w-1/7 text-left text-font-gray">
              Descuento
            </th>
            <th scope="column" className="w-2/7 text-left text-font-gray">
              Valor total OCD
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="h-8">
            <td className="text-center rounded-md bg-white text-font-gray py-1">
              <p>{formatearComoDinero(subtotalSinIVA)}</p>
            </td>
            <td className="text-center rounded-md bg-white text-font-gray py-1">
              {formatearComoDinero(totalGravadoConIVA)}
            </td>
            <td className="text-center rounded-md bg-white text-font-gray py-1">
              {formatearComoDinero(totalNoGravadoConIVA)}
            </td>
            <td className="text-center rounded-md bg-white text-font-gray py-1">
              {formatearComoDinero(valorTotalOCD - subtotalSinIVA)}
            </td>
            <td className="text-center rounded-md bg-white h-full">
              <CampoEditableEntero
                valorOriginal={descuento.toString()}
                actualizarEstadoExterno={(nuevoEstado) =>
                  setDescuento(parseInt(nuevoEstado))
                }
                classContainer="h-full w-full text-center rounded-md text-font-gray"
                classInput="h-full rounded-md"
                transformarAInputValido={(_, nuevoValorEntero) => {
                  const valorEntero = parseInt(nuevoValorEntero);
                  if (valorEntero > 100) {
                    return ["100", ""];
                  }
                  return [valorEntero.toString(), ""];
                }}
              />
            </td>
            <td className="text-center rounded-md bg-white text-font-gray py-1">
              {formatearComoDinero(
                valorTotalOCD - (valorTotalOCD * descuento) / 100
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};
