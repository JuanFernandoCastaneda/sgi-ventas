import { useStoreAplicacion } from "../../utils/context/CarritoZustand";
import { formatearComoDinero } from "../../utils/functions/formatearDinero";
import { ProductoDO } from "../../utils/models/producto";
import { CampoEditableEntero } from "../ui/CampoEditableEntero";

/**
 * Componente que representa una fila de la tabla del carrito de ventas.
 */
export const FilaCarritoVentas: React.FC<{
  producto: ProductoDO;
  cantidad: number;
}> = ({ producto, cantidad }) => {
  /**
   * Lógica que se encarga de manejar la cantidad de un producto en el carrito (y la espera a que el usuario termine).
   */

  const eliminarProducto = useStoreAplicacion(
    (state) => state.eliminarProducto
  );
  const actualizarCantidadProducto = useStoreAplicacion(
    (state) => state.modificarCantidadProducto
  );

  return (
    <>
      <tr>
        <th
          scope="row"
          className="flex align-center bg-background-gray rounded-md text-font-gray"
        >
          <p className="text-left min-h-8 max-h-15 px-2 py-1 overflow-scroll wrap-break-word">
            {producto.nombre}
          </p>
        </th>
        <td className="text-center bg-background-gray rounded-md text-font-gray">
          <CampoEditableEntero
            valorOriginal={cantidad.toString()}
            actualizarEstadoExterno={(nuevoEstado) =>
              actualizarCantidadProducto(producto.id, parseInt(nuevoEstado))
            }
            classContainer="h-full"
          />
        </td>
        <td className="text-center bg-background-gray rounded-md text-font-gray py-1 px-2">
          {producto.iva * 100}%
        </td>
        <td className="text-center bg-background-gray rounded-md text-font-gray py-1 px-2">
          {formatearComoDinero(producto.precio_sin_iva)}
        </td>
        <td className="text-center bg-background-gray rounded-md text-font-gray py-1 px-2">
          {formatearComoDinero(producto.precio_con_iva)}
        </td>
        <td className="text-center bg-background-gray rounded-md text-font-gray py-1 px-2">
          {formatearComoDinero(producto.precio_con_iva * cantidad)}
        </td>
        <td className="text-center w-full h-full aspect-square py-1 px-2">
          <button
            onClick={() => eliminarProducto(producto.id)}
            className="size-6 font-medium bg-gray-400 ratio-1/1 rounded-[50%] hover:bg-font-hover-purple text-white"
          >
            <span className="text-center align-middle">-</span>
          </button>
        </td>
      </tr>
    </>
  );
};
