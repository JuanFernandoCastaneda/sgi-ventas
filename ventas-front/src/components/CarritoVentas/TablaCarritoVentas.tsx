import { FilaCarritoVentas } from "./FilaCarritoVentas";
import { useQuery } from "@tanstack/react-query";
import { productQueryOptions } from "../../utils/tanstack/productQueryOptions";
import { useStoreAplicacion } from "../../utils/context/CarritoZustand";
import { useEffect, useRef } from "react";

/**
 * Componente que representa el carrito de compras actual en forma de tabla.
 */
export const TablaCarritoVentas: React.FC<{}> = ({}) => {
  const carritoVentas = useStoreAplicacion((state) => state.carrito);

  const { data } = useQuery(productQueryOptions());
  const productosInventario = data || [];

  const tableRef = useRef<HTMLTableElement>(null);

  const hideElementsLowSize = () => {
    if (tableRef.current) {
      const relacionadoCostoSinIva = Array.from(
        tableRef.current?.getElementsByClassName("celda-sin-iva")
      );
      relacionadoCostoSinIva.forEach((element) =>
        window.innerWidth < 768
          ? element.classList.add("hidden")
          : element.classList.remove("hidden")
      );
      const relacionadoIva = Array.from(
        tableRef.current?.getElementsByClassName("celda-iva")
      );
      relacionadoIva.forEach((element) =>
        window.innerWidth < 640
          ? element.classList.add("hidden")
          : element.classList.remove("hidden")
      );
      const relacionadoConIva = Array.from(
        tableRef.current?.getElementsByClassName("celda-con-iva")
      );
      relacionadoConIva.forEach((element) =>
        window.innerWidth < 540
          ? element.classList.add("hidden")
          : element.classList.remove("hidden")
      );
      const relacionadoTotal = Array.from(
        tableRef.current?.getElementsByClassName("celda-total")
      );
      relacionadoTotal.forEach((element) =>
        window.innerWidth < 440
          ? element.classList.add("hidden")
          : element.classList.remove("hidden")
      );
    }
  };

  window.addEventListener("resize", hideElementsLowSize);

  useEffect(() => {
    hideElementsLowSize();
  });

  return (
    <table
      ref={tableRef}
      className="table-fixed w-full border-separate border-spacing-2"
    >
      <thead>
        <tr>
          <th
            scope="col"
            className="w-8/30 text-left font-normal text-font-gray celda-nombre"
          >
            Producto
          </th>
          <th
            scope="col"
            className="w-4/30 text-center font-normal text-font-gray celda-cantidad"
          >
            Cantidad
          </th>
          <th
            scope="col"
            className="w-2/30 text-center font-normal text-font-gray celda-iva"
          >
            % IVA
          </th>
          <th
            scope="col"
            className="w-5/30 text-left font-normal text-font-gray celda-sin-iva"
          >
            Valor unitario sin IVA
          </th>
          <th
            scope="col"
            className="w-5/30 text-left font-normal text-font-gray celda-con-iva"
          >
            Valor unitario con IVA
          </th>
          <th
            scope="col"
            className="w-6/30 text-left font-normal text-font-gray celda-total"
          >
            Valor total con IVA
          </th>
          <th scope="col" className="w-1/30 celda-eliminar"></th>
        </tr>
      </thead>
      <tbody>
        {Array.from(carritoVentas, ([id, cantidad]) => {
          const producto = productosInventario.find(
            (producto) => producto.id === id
          );
          if (!producto) return;
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
