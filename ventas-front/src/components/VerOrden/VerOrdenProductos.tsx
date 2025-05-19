import { useState } from "react";
import { formatearComoDinero } from "../../utils/functions/formatearDinero";
import { OrdenConProductosPublic } from "../../utils/models/orden";
import { PrettyBox } from "../ui/PrettyBox";

export const VerOrdenProductos: React.FC<{
  orden: OrdenConProductosPublic;
}> = ({ orden }) => {
  const [lessThanSmallScreen, setLessThanSmallScreen] = useState(
    window.innerWidth < 540
  );
  const toggleResponsiveness = () => {
    if (innerWidth >= 540 && lessThanSmallScreen) setLessThanSmallScreen(false);
    else if (innerWidth < 540 && !lessThanSmallScreen)
      setLessThanSmallScreen(true);
  };
  window.addEventListener("resize", toggleResponsiveness);

  return (
    <PrettyBox>
      <h3 className="text-xl font-medium text-gray-700 mb-4">Productos</h3>
      {!lessThanSmallScreen ? (
        <table className="w-full">
          <thead className="text-left text-gray-600">
            <tr>
              <th className="py-2">Nombre</th>
              <th className="py-2">Cantidad</th>
              <th className="py-2">IVA</th>
              <th className="py-2">Precio Unitario</th>
              <th className="py-2">Total</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {orden.informacionCompletaProductos.map((producto) => (
              <tr key={self.crypto.randomUUID()} className="border-t">
                <td className="py-2">{producto.nombre}</td>
                <td className="py-2">{producto.cantidad}</td>
                <td className="py-2">{producto.iva * 100}%</td>
                <td className="py-2">
                  {formatearComoDinero(producto.precio_con_iva)}
                </td>
                <td className="py-2">
                  {formatearComoDinero(
                    producto.precio_con_iva * producto.cantidad
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        orden.informacionCompletaProductos.map((producto) => (
          <PrettyBox
            key={self.crypto.randomUUID()}
            className="p-2 mb-2 border-t-1 border-gray-200"
          >
            <details>
              <summary>{producto.nombre}</summary>
              <p>
                <b>Cantidad:</b> {producto.cantidad}
              </p>
              <p>
                <b>IVA:</b> {producto.iva * 100} %
              </p>
              <p>
                <b>Precio unitario:</b>{" "}
                {formatearComoDinero(producto.precio_con_iva)}
              </p>
              <p>
                <b>Total:</b>{" "}
                {formatearComoDinero(
                  producto.precio_con_iva * producto.cantidad
                )}
              </p>
            </details>
          </PrettyBox>
        ))
      )}
    </PrettyBox>
  );
};
