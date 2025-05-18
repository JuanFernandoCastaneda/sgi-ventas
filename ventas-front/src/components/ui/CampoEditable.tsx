import { useRef, useState } from "react";
import { useStoreAplicacion } from "../../utils/context/CarritoZustand";
import { twMerge } from "tailwind-merge";

export const CampoEditable: React.FC<{
  valorOriginal: string;
  transformarAInputValido: (
    antiguoValor: string,
    nuevoValor: string
  ) => [string, string]; // El primero es el input transformado. El segundo es un es un mensaje de información de lo que pudo estar mal del input.
  actualizarEstadoExterno: (nuevoEstado: string) => void;
  classContainer?: string;
  classInput?: string;
  type?: string;
}> = ({
  valorOriginal,
  transformarAInputValido,
  actualizarEstadoExterno,
  classContainer,
  classInput,
  type,
}) => {
  const [nuevaCantidad, setNuevaCantidad] = useState(valorOriginal);
  const empezarAEditar = useStoreAplicacion((state) => state.empezarAEditar);
  const dejarDeEditar = useStoreAplicacion((state) => state.dejarDeEditar);
  const [soyYoElEditado, setSoyYoElEditado] = useState(false);

  const typewatch = useRef(
    (function () {
      let timer = 0;
      return function (callback: Function, ms: number) {
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
      };
    })()
  );

  const onChange = (targetValue: string) => {
    // Transformar el input para que sea válido y mostrar mensaje de error o de edición.
    const [targetValueValido, _] = transformarAInputValido(
      valorOriginal,
      targetValue
    );
    setNuevaCantidad(targetValueValido);
    setSoyYoElEditado(true);
    empezarAEditar();

    // Únicamente actualizar el valor cuando el usuario termine de editar (1 segundo después de dejar de tipar) y dejar de mostrar mensaje de error o de edición.
    typewatch.current(() => {
      dejarDeEditar();
      actualizarEstadoExterno(targetValueValido);
      setSoyYoElEditado(false);
    }, 700);
  };

  return (
    <>
      <div className={twMerge("relative flex flex-row", classContainer)}>
        <span className={"sr-only"}>
          El input demora poco más de medio segundo en dejar de focalizarse y
          actualizar el valor del recibo. Además, este solo recibe números
          enteros.
        </span>
        <input
          value={nuevaCantidad}
          className={twMerge("w-full px-2 ", classInput)}
          type={type}
          onChange={(e) => onChange(e.target.value)}
        />
        {soyYoElEditado && (
          <span className="absolute right-0 loading loading-spinner loading-md"></span>
        )}
      </div>
    </>
  );
};
