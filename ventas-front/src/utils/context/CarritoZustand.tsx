import { useQuery } from "@tanstack/react-query";
import { create } from "zustand";
import { paymentInfoQueryOptions } from "../tanstack/paymentInfoOptions";
import { FormaPago } from "../models/formaPago";

type StoreType = {
  carrito: Map<number, number>;
  modificarCantidadProducto: (id: number, nuevaCantidad: number) => void;
  eliminarProducto: (id: number) => void;
  agregarProducto: (id: number) => void;
  vaciarCarrito: () => void;
  // -----
  editandoCampo: boolean;
  dejarDeEditar: () => void;
  empezarAEditar: () => void;
  // ----
  formasPagoDisponibles: Array<FormaPago>;
  cambiarFormasPagoDisponibles: (
    nuevasFormasPagoDisponibles: Array<FormaPago>
  ) => void;
  formaPagoElegida: FormaPago | null;
  cambiarFormaPagoElegida: (idNuevaFormaPago: number) => void;
};

export const useStoreAplicacion = create<StoreType>((set) => ({
  // Carrito
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
      const carritoActualizado = new Map(state.carrito);
      const cantidadAntigua = state.carrito.get(id);
      carritoActualizado.set(id, cantidadAntigua ? cantidadAntigua + 1 : 1);
      return { carrito: carritoActualizado };
    }),
  vaciarCarrito: () =>
    set((_) => {
      return { carrito: new Map() };
    }),
  // Edición
  editandoCampo: false,
  dejarDeEditar: () =>
    set((_) => ({
      editandoCampo: false,
    })),
  empezarAEditar: () =>
    set((_) => ({
      editandoCampo: true,
    })),
  // Formas pago
  formasPagoDisponibles: [],
  cambiarFormasPagoDisponibles: (
    nuevasFormasPagoDisponibles: Array<FormaPago>
  ) =>
    set((_) => ({
      formasPagoDisponibles: nuevasFormasPagoDisponibles,
    })),
  formaPagoElegida: null,
  cambiarFormaPagoElegida: (idNuevaFormaPago: number) =>
    set((state) => {
      const formaPagoSeleccionada = state.formasPagoDisponibles?.find(
        (forma) => forma.id === idNuevaFormaPago
      );
      if (formaPagoSeleccionada) {
        return { formaPagoElegida: formaPagoSeleccionada };
      } else {
        return { formaPagoElegida: null };
      }
    }),
}));
