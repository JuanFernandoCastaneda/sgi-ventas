import { startTransition, useState } from "react";
import { ProductoDO } from "../../models/producto";
import {
  Combobox,
  ComboboxItem,
  ComboboxPopover,
  ComboboxProvider,
} from "@ariakit/react";
import { useCarrito } from "../../utils/context/CarritoContext";

/**
 * Componente que representa el menú y los botones para agregar productos al carrito.
 */
export const MenuAgregarProducto: React.FC<{
  productosInventario: Array<ProductoDO>;
}> = ({ productosInventario }) => {
  const [productoPorAgregar, setProductoPorAgregar] = useState<string>("");
  const [toggleBuscador, setToggleBuscador] = useState(false);
  const agregarProducto = useCarrito().agregarProducto;
  const [error, setError] = useState<string | null>(null);

  const agregar = (nombre: string) => {
    const producto = productosInventario.find(
      (producto) => producto.nombre === nombre
    );
    if (!producto) {
      setError("Tienes que ingresar un producto");
      return;
    }
    agregarProducto(producto.id, 1);
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
              placeholder="Busca el nombre"
              blurActiveItemOnClick={true}
              className="w-80 rounded-md p-1"
            />
            <ComboboxPopover className="w-80 bg-white rounded-md shadow-md border-1 border-gray-200 py-1">
              {productosInventario.map((producto) => (
                <ComboboxItem
                  key={producto.id}
                  value={producto.nombre}
                  className="w-full text-font-gray px-1"
                >
                  <p className="w-full rounded-md px-2 hover:bg-font-hover-purple hover:text-white">
                    {producto.nombre}
                  </p>
                </ComboboxItem>
              ))}
            </ComboboxPopover>
          </ComboboxProvider>
          <button
            onClick={() => agregar(productoPorAgregar)}
            className="text-font-gray hover:text-font-hover-purple md:ml-4"
          >
            Agregar
          </button>
        </>
      ) : (
        <button
          onClick={() => setToggleBuscador(true)}
          className="font-medium text-font-gray hover:text-font-hover-purple hover:font-medium flex flex-row align-center outline-1 outline-font-gray rounded-xl py-1 px-2 hover:outline-font-hover-purple"
        >
          + Agregar nuevo producto
        </button>
      )}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};
