import { createContext, useContext, useState, ReactNode } from "react";
import { DetalleOrden } from "../models/producto";

// Define the shape of the context
interface CarritoContextType {
  carroCompras: DetalleOrden[];
  agregarProducto: (id: number, cantidad: number) => void;
  eliminarProducto: (id: number) => void;
  actualizarCantidadProducto: (id: number, cantidad: number) => void;
  vaciarCarrito: () => void;
}

// Create the context
export const CarritoContext = createContext<CarritoContextType | undefined>(
  undefined
);

// Provider component
export const CarritoProvider = ({ children }: { children: ReactNode }) => {
  const [carroCompras, setCarroCompras] = useState<DetalleOrden[]>([]);

  const agregarProducto = (id: number) => {
    const productoExistente = carroCompras.find(
      (producto) => producto.id_producto === id
    );
    if (productoExistente) {
      actualizarCantidadProducto(id, productoExistente.cantidad + 1);
    } else {
      setCarroCompras((prev) => [...prev, { id_producto: id, cantidad: 1 }]);
    }
  };

  const eliminarProducto = (id: number) => {
    setCarroCompras((prev) =>
      prev.filter((producto) => producto.id_producto !== id)
    );
  };

  const actualizarCantidadProducto = (id: number, cantidad: number) => {
    setCarroCompras((prev) =>
      prev.map((producto) =>
        producto.id_producto === id ? { ...producto, cantidad } : producto
      )
    );
  };

  const vaciarCarrito = () => {
    setCarroCompras([]);
  };

  return (
    <CarritoContext.Provider
      value={{
        carroCompras,
        agregarProducto,
        eliminarProducto,
        actualizarCantidadProducto,
        vaciarCarrito,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};

// Custom hook to use the context
export const useCarrito = () => {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error("useCarrito debe ser usado dentro de un CarritoProvider");
  }
  return context;
};
