import { create } from "zustand";

type StoreType = {
  carrito: Map<number, number>;
  modificarCantidadProducto: (id: number, nuevaCantidad: number) => void;
  eliminarProducto: (id: number) => void;
  agregarProducto: (id: number) => void;
};

export const useStore = create<StoreType>((set) => ({
  carrito: new Map(),
  modificarCantidadProducto: (id, nuevaCantidad) =>
    set((state) => {
      const carritoActualizado = new Map(state.carrito);
      if (nuevaCantidad <= 0) {
        carritoActualizado.delete(id);
      } else {
        carritoActualizado.set(id, nuevaCantidad);
      }
      return { carrito: carritoActualizado };
    }),
  eliminarProducto: (id) =>
    set((state) => {
      const carritoActualizado = new Map(state.carrito);
      carritoActualizado.delete(id);
      return { carrito: carritoActualizado };
    }),
  agregarProducto: (id) =>
    set((state) => {
      const cantidadAntigua = state.carrito.get(id);
      const carritoActualizado = new Map(state.carrito);
      carritoActualizado.set(id, cantidadAntigua ? cantidadAntigua + 1 : 0);
      return { carrito: carritoActualizado };
    }),
  vaciarCarrito: () =>
    set((_) => {
      return { carrito: new Map() };
    }),
}));
