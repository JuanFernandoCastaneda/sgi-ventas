import { useCarrito } from "../../utils/context/CarritoContext";
import { ProductoDO } from "../../models/producto";
import { FilaCarritoVentas } from "./FilaCarritoVentas";

/**
 * Componente que representa el carrito de compras actual en forma de tabla.
 */
export const TablaCarritoVentas: React.FC<{
  productosInventario: Array<ProductoDO>;
}> = ({ productosInventario }) => {
  const carritoHandler = useCarrito();

  const carritoVentas = carritoHandler.carroCompras;
  const eliminarProducto = carritoHandler.eliminarProducto;
  const actualizarCantidadProducto = carritoHandler.actualizarCantidadProducto;

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
        {carritoVentas.map((detalleOrden) => {
          const producto = productosInventario.find(
            (producto) => producto.id === detalleOrden.id_producto
          );
          if (!producto) return <p>Error</p>;
          return (
            <FilaCarritoVentas
              key={self.crypto.randomUUID()}
              producto={producto}
              cantidad={detalleOrden.cantidad}
              eliminarProducto={() =>
                eliminarProducto(detalleOrden.id_producto)
              }
              actualizarCantidadProductoCarrito={(cantidad) =>
                actualizarCantidadProducto(detalleOrden.id_producto, cantidad)
              }
            />
          );
        })}
      </tbody>
    </table>
  );
};
