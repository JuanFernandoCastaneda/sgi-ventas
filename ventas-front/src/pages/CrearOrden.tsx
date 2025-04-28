import { useNavigate } from "react-router";
import { ProductoDO, ProductoUI } from "../models/producto";
import { useState } from "react";
import { CarritoVentas } from "../components/CarritoVentas";

export const CrearOrden: React.FC = () => {
  const navigate = useNavigate();
  const [productosCarro, setProductosCarro] = useState<Array<ProductoUI>>([]);

  const agregarProductoCarrito = (id: string, producto: ProductoDO) => {
    const productoEnCarro = productosCarro.find(
      (productoCarro) => productoCarro.id === id
    );
    if (productoEnCarro) {
      // Posible performance issue. Va a buscar dos veces la lista.
      actualizarCantidadProductoCarrito(
        producto.id,
        productoEnCarro.cantidad + 1
      );
    } else {
      setProductosCarro((prev) => [
        ...prev,
        { ...producto, cantidad: 1, valorTotalConIva: producto.precio_con_iva },
      ]);
    }
  };

  const eliminarProductoCarrito = (id: string) => {
    console.log("eliminarProductoCarrito", id);
    setProductosCarro((prev) => prev.filter((producto) => producto.id !== id));
  };

  const actualizarCantidadProductoCarrito = (id: string, cantidad: number) => {
    setProductosCarro((prev) =>
      prev.map((producto) =>
        producto.id === id
          ? {
              ...producto,
              cantidad: cantidad,
              valorTotalConIva: producto.precio_sin_iva * cantidad,
            }
          : producto
      )
    );
  };

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
        <CarritoVentas
          {...{
            productosCarro,
            agregarProductoCarrito,
            eliminarProductoCarrito,
            actualizarCantidadProductoCarrito,
          }}
        />
      </main>
    </>
  );
};
