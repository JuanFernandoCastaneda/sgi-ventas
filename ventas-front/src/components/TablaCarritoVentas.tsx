import { ProductoUI } from "../models/producto";

export const TablaCarritoVentas: React.FC<{
  productosCarro: Array<ProductoUI>;
}> = ({ productosCarro }) => {
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
          <tr>
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
              {producto.valorUnitSinIva}
            </td>
            <td className="text-center bg-background-gray rounded-md text-font-gray">
              {producto.valorUnitConIva}
            </td>
            <td className="text-center bg-background-gray rounded-md text-font-gray">
              {producto.valorTotalConIva}
            </td>
            <td className="text-center rounded-[50%] bg-gray-400 text-white aspect-square">
              <button>-</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
