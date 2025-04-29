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
    <section className="w-full py-2">
      <table className="border-separate border-spacing-2 table-fixed">
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
            <td className="text-center rounded-md bg-white text-font-gray py-1">
              {subtotalSinIVA}
            </td>
            <td className="text-center rounded-md bg-white text-font-gray py-1">
              {totalGravadoConIVA}
            </td>
            <td className="text-center rounded-md bg-white text-font-gray py-1">
              {totalNoGravadoConIVA}
            </td>
            <td className="text-center rounded-md bg-white text-font-gray py-1">
              {valorTotalOCD - subtotalSinIVA}
            </td>
            <td className="text-center rounded-md bg-white text-font-gray py-1">
              0
            </td>
            <td className="text-center rounded-md bg-white text-font-gray py-1">
              {valorTotalOCD}
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};
