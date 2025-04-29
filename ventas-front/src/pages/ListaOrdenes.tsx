import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { OrdenDO } from "../models/orden";
import { formatearComoDinero } from "../utils/functions/formatearDinero";

/**
 * Componente que representa la página de lista de ordenes.
 */
export const ListaOrdenes: React.FC = () => {
  const navigate = useNavigate();
  const [listaOrdenes, setListaOrdenes] = useState<OrdenDO[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/ordenes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setListaOrdenes(data);
      });
  }, []);

  return (
    <>
      <header className="w-full px-4 bg-inherit h-18 flex items-center justify-between">
        <h2 className="font-medium text-xl text-gray-700">Lista de OCD</h2>
        <button
          onClick={() => navigate("/ordenes/crearOrden")}
          className="py-1 px-2 outline-2 text-font-gray rounded-md outline-font-hover-purple hover:bg-font-hover-purple hover:text-white font-medium"
        >
          Nueva ODC
        </button>
      </header>
      <main className="w-full px-4">
        <div className="flex flex-col gap-4">
          {listaOrdenes.map((orden) => (
            <div
              key={orden.id}
              className="bg-white rounded-md p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => navigate(`/ordenes/${orden.id}`)}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-medium text-font-gray">
                    ODC #{orden.id}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Fecha: {orden.fecha_facturacion.split("T")[0]}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-medium text-font-gray">
                    {formatearComoDinero(orden.valor_total)}
                  </p>
                  <p className="text-sm text-gray-500">
                    {orden.productos.length} productos
                  </p>
                </div>
              </div>
              <div className="mt-2 flex gap-2">
                <span className="text-xs px-2 py-1 bg-background-gray rounded-md text-font-gray">
                  {orden.descuento > 0
                    ? `Descuento: ${orden.descuento}%`
                    : "Sin descuento"}
                </span>
                <span className="text-xs px-2 py-1 bg-background-gray rounded-md text-font-gray">
                  IVA: {formatearComoDinero(orden.total_iva)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};
