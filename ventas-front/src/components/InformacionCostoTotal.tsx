import { useCarrito } from "../utils/context/CarritoContext";
import { formatearComoDinero } from "../utils/functions/formatearDinero";
import { useQuery } from "@tanstack/react-query";
import { productQueryOptions } from "../utils/tanstackQueryOptions/productQueryOptions";

/**
 * Componente que representa la información del costo asociado al carrito.
 */
export const InformacionCostoTotal: React.FC<{
  descuento: number;
  setDescuento: Function;
}> = ({ descuento, setDescuento }) => {
  const { data } = useQuery(productQueryOptions());
  const productosInventario = data || [];

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

  const manejarDescuento = (descuento: number) => {
    if (typeof descuento !== "number") return;
    if (isNaN(descuento)) {
      setDescuento(0);
    } else if (descuento <= 0) {
      setDescuento(0);
    } else if (descuento > 100) {
      setDescuento(100);
    } else {
      setDescuento(descuento);
    }
  };

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
              {formatearComoDinero(subtotalSinIVA)}
            </td>
            <td className="text-center rounded-md bg-white text-font-gray py-1">
              {formatearComoDinero(totalGravadoConIVA)}
            </td>
            <td className="text-center rounded-md bg-white text-font-gray py-1">
              {formatearComoDinero(totalNoGravadoConIVA)}
            </td>
            <td className="text-center rounded-md bg-white text-font-gray py-1">
              {formatearComoDinero(valorTotalOCD - subtotalSinIVA)}
            </td>
            <td className="text-center rounded-md bg-white text-font-gray py-1">
              <input
                type="number"
                minLength={0}
                min={0}
                max={100}
                value={descuento}
                onChange={(e) => manejarDescuento(parseInt(e.target.value))}
                className="w-full h-full text-center rounded-md"
              />
            </td>
            <td className="text-center rounded-md bg-white text-font-gray py-1">
              {formatearComoDinero(
                valorTotalOCD - (valorTotalOCD * descuento) / 100
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};
