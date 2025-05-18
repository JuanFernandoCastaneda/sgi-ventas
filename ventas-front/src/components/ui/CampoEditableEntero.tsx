import { CampoEditable } from "./CampoEditable";

/**
 * Class that represents an integer editable field.
 *
 * Its job is wrapping the regular editable field CampoEditable. Thus, the only thing it does is apply a transformation to the new value of the input so that it only returns an integer.
 *
 * If you look for anything different to the transformation into an integer of the received value in the input, look for CampoEditable.
 */
export const CampoEditableEntero: React.FC<{
  valorOriginal: string;
  classContainer?: string;
  classInput?: string;
  transformarAInputValido?: (
    antiguoValor: string,
    nuevoValorEntero: string
  ) => [string, string]; // El primero es el input transformado. El segundo es un es un mensaje de información de lo que pudo estar mal del input.
  actualizarEstadoExterno: (nuevoEstado: string) => void;
}> = ({
  valorOriginal,
  classContainer,
  classInput,
  transformarAInputValido,
  actualizarEstadoExterno,
}) => {
  /**
   * Método que transforma el input de nuevo Valor a un entero.
   * @param antiguoValor
   * @param nuevoValorEntero El valor que recibe el input con una transformación, solo puede haber números enteros.
   * @returns [valorVálidoEnFormaDeEntero, mensajeDeError]
   */
  const transformacionAEntero = (antiguoValor: string, nuevoValor: string) => {
    if (nuevoValor == "") return ["0", ""]; // User tried to errase number.
    const nuevoValorCorregido = nuevoValor.replace(/[^\d]/g, "");
    if (nuevoValorCorregido == "")
      // User inputed only letters.
      return [antiguoValor !== "" ? antiguoValor : "0", ""];
    return [nuevoValorCorregido, ""];
  };

  return (
    <CampoEditable
      valorOriginal={valorOriginal}
      transformarAInputValido={(antiguoValor, nuevoValor) => {
        const [nuevoValorEntero, mensajeError] = transformacionAEntero(
          antiguoValor,
          nuevoValor
        );
        if (transformarAInputValido) {
          return transformarAInputValido(antiguoValor, nuevoValorEntero);
        }
        console.log("Lo que envía CampoEditableEntero es", nuevoValorEntero);
        return [nuevoValorEntero, mensajeError];
      }}
      actualizarEstadoExterno={actualizarEstadoExterno}
      classContainer={classContainer}
      classInput={classInput}
    />
  );
};
