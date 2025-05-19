import { startTransition, useMemo, useState } from "react";
import {
  Combobox,
  ComboboxItem,
  ComboboxPopover,
  ComboboxProvider,
} from "@ariakit/react";
import { useQuery } from "@tanstack/react-query";
import { productQueryOptions } from "../../utils/tanstack/productQueryOptions";
import { useStoreAplicacion } from "../../utils/context/CarritoZustand";
import { search } from "fast-fuzzy";

/**
 * Componente que representa el menú y los botones para agregar productos al carrito.
 */
export const MenuAgregarProducto: React.FC<{}> = ({}) => {
  const [productoPorAgregar, setProductoPorAgregar] = useState<string>("");
  const [toggleBuscador, setToggleBuscador] = useState(false);
  const agregarProducto = useStoreAplicacion((state) => state.agregarProducto);
  const [error, setError] = useState<string | null>(null);

  const { data } = useQuery(productQueryOptions());
  const productosInventario = data || [];

  const matches = useMemo(() => {
    return search(productoPorAgregar, productosInventario, {
      keySelector: (producto) => producto.nombre,
    });
  }, [productoPorAgregar]);

  const agregar = (nombre: string) => {
    const producto = productosInventario.find(
      (producto) => producto.nombre === nombre
    );
    if (!producto) {
      setError("Tienes que ingresar un producto");
      return;
    }
    agregarProducto(producto.id);
    setProductoPorAgregar("");
    setToggleBuscador(false);
  };

  return (
    <div className="m-2">
      {toggleBuscador ? (
        <>
          <ComboboxProvider
            setValue={(nombre) =>
              startTransition(() => {
                setProductoPorAgregar(nombre);
                setError(null);
              })
            }
          >
            <Combobox
              placeholder="Busca un producto"
              blurActiveItemOnClick={true}
              className="w-80 rounded-md p-1 text-font-gray border-1 focus:border-0 shadow-sm border-gray-200"
            />
            <ComboboxPopover className="w-80 max-h-50 overflow-scroll bg-white rounded-md shadow-md border-1 border-gray-200 py-1">
              {(productoPorAgregar !== "" ? matches : productosInventario).map(
                (producto) => (
                  <ComboboxItem
                    key={producto.id}
                    value={producto.nombre}
                    className="w-full text-font-gray px-1"
                  >
                    <p className="w-full rounded-md px-2 hover:bg-font-hover-purple hover:text-white wrap-break-word">
                      {producto.nombre}
                    </p>
                  </ComboboxItem>
                )
              )}
            </ComboboxPopover>
          </ComboboxProvider>
          <button
            onClick={() => agregar(productoPorAgregar)}
            className="py-1 px-2 outline-2 text-font-gray rounded-md outline-font-hover-purple ml-2 hover:bg-font-hover-purple hover:text-white font-medium focus:outline-blue-400"
          >
            Agregar
          </button>
        </>
      ) : (
        <button
          onClick={() => setToggleBuscador(true)}
          className="font-medium text-font-gray hover:text-font-hover-purple hover:font-medium flex flex-row align-center outline-1 outline-font-gray rounded-xl py-1 px-2 hover:outline-font-hover-purple focus:outline-blue-400 focus:outline-2"
        >
          + Agregar nuevo producto
        </button>
      )}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};
