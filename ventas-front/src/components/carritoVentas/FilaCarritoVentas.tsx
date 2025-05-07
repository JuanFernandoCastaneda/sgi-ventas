import { ProductoDO } from "../../models/producto";
import { formatearComoDinero } from "../../utils/functions/formatearDinero";
import { CampoEditable } from "../CampoEditable";

/**
 * Componente que representa una fila de la tabla del carrito de ventas.
 */
export const FilaCarritoVentas: React.FC<{
  producto: ProductoDO;
  cantidad: number;
  actualizarCantidadProductoCarrito: (cantidad: number) => void;
  eliminarProducto: () => void;
}> = ({
  producto,
  cantidad,
  actualizarCantidadProductoCarrito,
  eliminarProducto,
}) => {
  /**
   * Lógica que se encarga de manejar la cantidad de un producto en el carrito (y la espera a que el usuario termine).
   */

  return (
    <>
      <tr>
        <th
          scope="row"
          className="text-left bg-background-gray rounded-md text-font-gray py-1 px-2"
        >
          {producto.nombre}
        </th>
        <td className="text-center bg-background-gray rounded-md text-font-gray flex flex-col">
          <CampoEditable
            valorOriginal={cantidad.toString()}
            transformarAInputValido={(_, nuevoValor) => {
              if (nuevoValor == "") return ["0", ""];
              if (!/^\d+$/.test(nuevoValor))
                return [
                  nuevoValor.replace(/[^\d]/g, ""),
                  "Solo puedes ingresar números enteros",
                ];
              return [nuevoValor, ""];
            }}
            actualizarValor={(nuevoValor) =>
              actualizarCantidadProductoCarrito(parseInt(nuevoValor))
            }
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
            onClick={() => eliminarProducto()}
            className="size-6 font-medium bg-gray-400 ratio-1/1 rounded-[50%] hover:bg-font-hover-purple text-white"
          >
            <span className="text-center align-middle">-</span>
          </button>
        </td>
      </tr>
    </>
  );
};
