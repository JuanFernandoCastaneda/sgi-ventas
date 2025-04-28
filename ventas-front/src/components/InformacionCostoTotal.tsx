import { useCarrito } from "../utils/context/CarritoContext";
import { ProductoDO } from "../models/producto";

export const InformacionCostoTotal: React.FC<{
  productosInventario: Array<ProductoDO>;
}> = ({ productosInventario }) => {
  const carritoHandler = useCarrito();
  const carrito = carritoHandler.carroCompras;

  let subtotalSinIVA = 0;
  let totalGravadoConIVA = 0;
  let totalNoGravadoConIVA = 0;
  let valorTotalOCD = 0;

  carrito.forEach((detalleOrden) => {
    const producto = productosInventario.find(
      (producto) => producto.id === detalleOrden.id_producto
    );
    if (!producto) {
      alert("No debería pasar");
      return;
    }
    subtotalSinIVA += detalleOrden.cantidad * producto.precio_sin_iva;
    totalGravadoConIVA +=
      producto.iva > 0 ? detalleOrden.cantidad * producto.precio_con_iva : 0;
    totalNoGravadoConIVA +=
      producto.iva == 0 ? detalleOrden.cantidad * producto.precio_con_iva : 0;
    valorTotalOCD += detalleOrden.cantidad * producto.precio_con_iva;
  });

  return (
    <section className="w-full border-separate border-spacing-2 table-fixed">
      <table>
        <thead>
          <tr>
            <th scope="column" className="w-1/7 text-left">
              Subtotal sin IVA
            </th>
            <th scope="column" className="w-1/7 text-left">
              Total gravado con IVA
            </th>
            <th scope="column" className="w-1/7 text-left">
              Total no gravado con IVA
            </th>
            <th scope="column" className="w-1/7 text-left">
              Total IVA
            </th>
            <th scope="column" className="w-1/7 text-left">
              Descuento
            </th>
            <th scope="column" className="w-2/7 text-left">
              Valor total OCD
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-center">{subtotalSinIVA}</td>
            <td className="text-center">{totalGravadoConIVA}</td>
            <td className="text-center">{totalNoGravadoConIVA}</td>
            <td className="text-center">{valorTotalOCD - subtotalSinIVA}</td>
            <td className="text-center">0</td>
            <td className="text-center">{valorTotalOCD}</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};
