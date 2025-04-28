import { ProductoUI } from "../models/producto";

export const TablaCarritoVentas: React.FC<{
  productosCarro: Array<ProductoUI>;
  eliminarProductoCarrito: (id: string) => void;
}> = ({ productosCarro, eliminarProductoCarrito }) => {
  return (
    <table className="table-fixed w-full border-separate border-spacing-2">
      <thead>
        <tr>
          <th
            scope="col"
            className="w-1/3 text-left font-normal text-font-gray"
          >
            Producto
          </th>
          <th
            scope="col"
            className="w-2/30 text-center font-normal text-font-gray"
          >
            Cantidad
          </th>
          <th
            scope="col"
            className="w-2/30 text-center font-normal text-font-gray"
          >
            % IVA
          </th>
          <th
            scope="col"
            className="w-1/6 text-left font-normal text-font-gray"
          >
            Valor unitario sin IVA
          </th>
          <th
            scope="col"
            className="w-1/6 text-left font-normal text-font-gray"
          >
            Valor unitario con IVA
          </th>
          <th
            scope="col"
            className="w-1/6 text-left font-normal text-font-gray"
          >
            Valor total con IVA
          </th>
          <th scope="col" className="w-1/30"></th>
        </tr>
      </thead>
      <tbody>
        {productosCarro.map((producto) => (
          <tr key={self.crypto.randomUUID()}>
            <th className="text-left bg-background-gray rounded-md text-font-gray">
              {producto.nombre}
            </th>
            <td className="text-center bg-background-gray rounded-md text-font-gray">
              {producto.cantidad}
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
              {producto.valorTotalConIva}
            </td>
            <td className="text-center rounded-[50%] bg-gray-400 text-white w-full h-full aspect-square">
              <button
                onClick={() => eliminarProductoCarrito(producto.id)}
                className="w-full h-full hover:border hover:border-purple-500"
              >
                -
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
