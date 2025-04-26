import { useNavigate } from "react-router";
import { ProductoUI } from "../models/producto";
import { useState } from "react";
import { CarritoVentas } from "../components/CarritoVentas";

export const CrearOrden: React.FC = () => {
  const navigate = useNavigate();
  const [productosCarro, setProductosCarro] = useState<Array<ProductoUI>>([]);

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
        <CarritoVentas {...{productosCarro, setProductosCarro}} />
      </main>
    </>
  );
};
