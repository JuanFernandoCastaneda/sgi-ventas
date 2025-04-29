import { useRef, useState } from "react";
import { ProductoDO } from "../../models/producto";

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
  const [nuevaCantidad, setNuevaCantidad] = useState(cantidad);
  const [editando, setEditando] = useState(false);

  const typewatch = useRef(
    (function () {
      var timer = 0;
      return function (callback: Function, ms: number) {
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
      };
    })()
  );

  return (
    <tr>
      <th
        scope="row"
        className="text-left bg-background-gray rounded-md text-font-gray py-1 px-2"
      >
        {producto.nombre}
      </th>
      <td className="text-center bg-background-gray rounded-md text-font-gray flex flex-col">
        <input
          value={nuevaCantidad}
          type="number"
          min={0}
          step={1}
          onChange={(e) => {
            if (!isNaN(parseInt(e.target.value))) {
              setNuevaCantidad(parseInt(e.target.value));
              setEditando(true);
              typewatch.current(() => {
                actualizarCantidadProductoCarrito(parseInt(e.target.value));
                setEditando(false);
              }, 1000);
            }
          }}
          className="w-full text-center rounded-md py-1 px-2"
        />
        <p>{editando && "EDITANDOOO"}</p>
      </td>
      <td className="text-center bg-background-gray rounded-md text-font-gray py-1 px-2">
        {producto.iva * 100}%
      </td>
      <td className="text-center bg-background-gray rounded-md text-font-gray py-1 px-2">
        {producto.precio_sin_iva}
      </td>
      <td className="text-center bg-background-gray rounded-md text-font-gray py-1 px-2">
        {producto.precio_con_iva}
      </td>
      <td className="text-center bg-background-gray rounded-md text-font-gray py-1 px-2">
        {producto.precio_con_iva * cantidad}
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
  );
};
