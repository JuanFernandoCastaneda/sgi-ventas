import { useRef, useState } from "react";

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
  const [editando, setEditando] = useState(false);
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
    setEditando(true);

    // Únicamente actualizar el valor cuando el usuario termine de editar (1 segundo después de dejar de tipar) y dejar de mostrar mensaje de error o de edición.
    typewatch.current(() => {
      setEditando(false);
      actualizarValor(targetValueValido);
      setMensajeError("");
    }, 1000);
  };

  return (
    <div className={classContainer}>
      <input
        value={nuevaCantidad}
        className={classInput + " w-full"}
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
