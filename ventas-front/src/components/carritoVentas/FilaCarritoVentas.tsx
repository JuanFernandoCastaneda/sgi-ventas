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
        className="text-left bg-background-gray rounded-md text-font-gray"
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
          className="w-full text-center"
        />
        <p>{editando && "EDITANDOOO"}</p>
      </td>
      <td className="text-center bg-background-gray rounded-md text-font-gray">
        {producto.iva * 100}%
      </td>
      <td className="text-center bg-background-gray rounded-md text-font-gray">
        {producto.precio_sin_iva}
      </td>
      <td className="text-center bg-background-gray rounded-md text-font-gray">
        {producto.precio_con_iva}
      </td>
      <td className="text-center bg-background-gray rounded-md text-font-gray">
        {producto.precio_con_iva * cantidad}
      </td>
      <td className="text-center rounded-[50%] bg-gray-400 text-white w-full h-full aspect-square">
        <button
          onClick={() => eliminarProducto()}
          className="w-full h-full hover:border hover:border-purple-500"
        >
          -
        </button>
      </td>
    </tr>
  );
};
