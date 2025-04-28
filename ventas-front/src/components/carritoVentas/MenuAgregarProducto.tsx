import { startTransition, useState } from "react";
import { ProductoDO } from "../../models/producto";
import {
  Combobox,
  ComboboxItem,
  ComboboxPopover,
  ComboboxProvider,
} from "@ariakit/react";
import { useCarrito } from "../../context/useCarrito";

export const MenuAgregarProducto: React.FC<{
  productosInventario: Array<ProductoDO>;
}> = ({ productosInventario }) => {
  const [productoPorAgregar, setProductoPorAgregar] = useState<string>("");
  const [toggleBuscador, setToggleBuscador] = useState(false);
  const agregarProducto = useCarrito().agregarProducto;

  const agregar = (nombre: string) => {
    const producto = productosInventario.find(
      (producto) => producto.nombre === nombre
    );
    if (!producto) {
      alert("No debería pasar");
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
              startTransition(() => setProductoPorAgregar(nombre))
            }
          >
            <Combobox
              placeholder="Busca el nombre"
              blurActiveItemOnClick={true}
            />
            <ComboboxPopover className="w-full">
              {productosInventario.map((producto) => (
                <ComboboxItem
                  key={producto.id}
                  value={producto.nombre}
                  className="w-full hover:border-purple-500 hover:border"
                >
                  {producto.nombre}
                </ComboboxItem>
              ))}
            </ComboboxPopover>
          </ComboboxProvider>
          <button
            onClick={() => agregar(productoPorAgregar)}
            className="hover:border hover:border-purple-500"
          >
            Agregar
          </button>
        </>
      ) : (
        <button onClick={() => setToggleBuscador(true)}>
          Agregar nuevo producto
        </button>
      )}
    </div>
  );
};
