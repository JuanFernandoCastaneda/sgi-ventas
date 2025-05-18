import { useRef, useState } from "react";
import { useStoreAplicacion } from "../utils/context/CarritoZustand";
import { twMerge } from "tailwind-merge";

export const CampoEditable: React.FC<{
  valorOriginal: string;
  transformarAInputValido: (
    antiguoValor: string,
    nuevoValor: string
  ) => [string, string]; // El primero es el input transformado. El segundo es un es un mensaje de información de lo que pudo estar mal del input.
  actualizarValor: (nuevoValor: string) => void;
  classContainer?: string;
  classInput?: string;
  classMensajes?: string;
  type?: string;
}> = ({
  valorOriginal,
  transformarAInputValido,
  actualizarValor,
  classContainer,
  classInput,
  classMensajes,
  type,
}) => {
  const [nuevaCantidad, setNuevaCantidad] = useState(valorOriginal);
  const editando = useStoreAplicacion((state) => state.editandoCampo);
  const empezarAEditar = useStoreAplicacion((state) => state.empezarAEditar);
  const dejarDeEditar = useStoreAplicacion((state) => state.dejarDeEditar);
  const [mensajeError, setMensajeError] = useState("");

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
    const [targetValueValido, mensajeDeError] = transformarAInputValido(
      valorOriginal,
      targetValue
    );
    setNuevaCantidad(targetValueValido);
    setMensajeError(mensajeDeError);
    empezarAEditar();

    // Únicamente actualizar el valor cuando el usuario termine de editar (1 segundo después de dejar de tipar) y dejar de mostrar mensaje de error o de edición.
    typewatch.current(() => {
      dejarDeEditar();
      actualizarValor(targetValueValido);
      setMensajeError("");
    }, 500);
  };

  return (
    <div className={classContainer}>
      <input
        value={nuevaCantidad}
        className={twMerge("w-full", classInput)}
        type={type}
        onChange={(e) => onChange(e.target.value)}
      />
      {editando && (
        <span className={classMensajes + " text-green-500"}>Editando...</span>
      )}
      <br />
      {mensajeError !== "" && (
        <span className={classMensajes + " text-red-500"}>{mensajeError}</span>
      )}
    </div>
  );
};
