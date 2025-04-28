import { useNavigate } from "react-router";
import { CarritoVentas } from "../components/carritoVentas/CarritoVentas";
import { InformacionCostoTotal } from "../components/InformacionCostoTotal";
import { ProductoDO } from "../models/producto";
import { useEffect, useState } from "react";

export const CrearOrden: React.FC = () => {
  const navigate = useNavigate();

  const [productosInventario, setProductosInventario] = useState<
    Array<ProductoDO>
  >([]);

  useEffect(() => {
    fetch("http://localhost:8000/productos", { method: "GET" }).then(
      async (response) => {
        const json = await response.json();
        if (!response.ok) {
          throw new Error("Error al obtener los productos");
        }
        setProductosInventario(json);
      }
    );
  }, []);

  return (
    <>
      <header className="w-full px-4 bg-inherit h-18 flex items-center justify-start">
        <button
          onClick={() => navigate(-1)}
          className="bg-inherit p-2 text-gray-500 text-4xl font-stretch-50%"
        >
          {"<"}
        </button>
        <h2 className="font-medium text-xl text-gray-700">{`OCD ${0.01}`}</h2>
      </header>
      <main className="w-full px-4">
        <CarritoVentas productosInventario={productosInventario} />
        <InformacionCostoTotal productosInventario={productosInventario} />
      </main>
    </>
  );
};
