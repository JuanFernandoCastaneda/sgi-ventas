import { startTransition, useEffect, useState } from "react";
import { ProductoDO } from "../models/producto";
import {
  Combobox,
  ComboboxItem,
  ComboboxLabel,
  ComboboxPopover,
  ComboboxProvider,
} from "@ariakit/react";

export const MenuAgregarProducto: React.FC<{
  productosInventario: Array<ProductoDO>;
  agregarProductoCarritoPorNombre: (nombre: string) => void;
}> = ({ productosInventario, agregarProductoCarritoPorNombre }) => {
  const [productoPorAgregar, setProductoPorAgregar] = useState<string>("");
  const [toggleBuscador, setToggleBuscador] = useState(false);
  
  const agregar = (nombre: string) => {
    agregarProductoCarritoPorNombre(nombre);
    setProductoPorAgregar("");
    setToggleBuscador(false);
  }

  return (
    <div className="m-2">
      {toggleBuscador ? (
        <>
          <ComboboxProvider
            setValue={(nombre) =>
              startTransition(() => setProductoPorAgregar(nombre))
            }
          >
            <Combobox placeholder="Busca el nombre" blurActiveItemOnClick={true}/>
            <ComboboxPopover className="w-full">
              {productosInventario.map((producto) => (
                <ComboboxItem key={producto.id} value={producto.nombre} className="w-full hover:border-purple-500 hover:border">
                  {producto.nombre}
                </ComboboxItem>
              ))}
            </ComboboxPopover>
          </ComboboxProvider>
          <button onClick={() => agregar(productoPorAgregar)} className="hover:border hover:border-purple-500">Agregar</button>
        </>
      ) : (
        <button onClick={() => setToggleBuscador(true)}>Agregar nuevo producto</button>
      )}
    </div>
  );
};
