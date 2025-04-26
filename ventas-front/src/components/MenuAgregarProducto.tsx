import { useState } from "react";
import { ProductoDO } from "../models/producto";

export const MenuAgregarProducto: React.FC<{
  productosInventario: Array<ProductoDO>;
}> = ({ productosInventario }) => {
  const [modalOn, setModalOn] = useState(false);

  const toggleModal = () => {
    setModalOn(!modalOn);
  };

  return (
    <div className="m-2">
      {modalOn ? (
        <p>Pepito</p>
      ) : (
        <button onClick={toggleModal} className="text-font-gray">
          <span className="rounded-[50%] bg-gray-400">+</span> Agregar un nuevo
          producto
        </button>
      )}
    </div>
  );
};
