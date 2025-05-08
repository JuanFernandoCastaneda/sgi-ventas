import { FilaCarritoVentas } from "./FilaCarritoVentas";
import { useQuery } from "@tanstack/react-query";
import { productQueryOptions } from "../../utils/tanstackQueryOptions/productQueryOptions";
import { useStoreAplicacion } from "../../utils/context/CarritoZustand";

/**
 * Componente que representa el carrito de compras actual en forma de tabla.
 */
export const TablaCarritoVentas: React.FC<{}> = ({}) => {
  const carritoVentas = useStoreAplicacion((state) => state.carrito);

  const { data } = useQuery(productQueryOptions());
  const productosInventario = data || [];

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
        {Array.from(carritoVentas, ([id, cantidad]) => {
          const producto = productosInventario.find(
            (producto) => producto.id === id
          );
          if (!producto) return <p>Error</p>;
          return (
            <FilaCarritoVentas
              key={self.crypto.randomUUID()}
              producto={producto}
              cantidad={cantidad}
            />
          );
        })}
      </tbody>
    </table>
  );
};
