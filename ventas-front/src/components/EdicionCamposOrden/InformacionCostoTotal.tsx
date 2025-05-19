import { formatearComoDinero } from "../../utils/functions/formatearDinero";
import { useQuery } from "@tanstack/react-query";
import { productQueryOptions } from "../../utils/tanstack/productQueryOptions";
import { useStoreAplicacion } from "../../utils/context/CarritoZustand";
import { CampoEditableEntero } from "../ui/CampoEditableEntero";
import { PrettyBox } from "../ui/PrettyBox";
import { twMerge } from "tailwind-merge";

/**
 * Componente que representa la información del costo asociado al carrito.
 */
export const InformacionCostoTotal: React.FC<{
  descuento: number;
  setDescuento: Function;
}> = ({ descuento, setDescuento }) => {
  const { data } = useQuery(productQueryOptions());
  const productosInventario = data || [];

  const carrito = useStoreAplicacion((state) => state.carrito);

  let subtotalSinIVA = 0;
  let totalGravadoConIVA = 0;
  let totalNoGravadoConIVA = 0;
  let valorTotalOCD = 0;

  carrito.forEach((cantidad, id) => {
    const producto = productosInventario.find((producto) => producto.id === id);
    if (!producto) {
      return <p>Error encontrando producto en el inventario</p>;
    }
    subtotalSinIVA += cantidad * producto.precio_sin_iva;
    totalGravadoConIVA +=
      producto.iva > 0 ? cantidad * producto.precio_con_iva : 0;
    totalNoGravadoConIVA +=
      producto.iva == 0 ? cantidad * producto.precio_con_iva : 0;
    valorTotalOCD += cantidad * producto.precio_con_iva;
  });

  const estiloDivCajita = "h-20 flex flex-col justify-around";
  const estiloH3Cajita = "h-12 text-left text-font-gray font-bold";
  const estiloPrettyBoxCajita =
    "h-8 text-center rounded-md bg-white text-font-gray py-1";
  const EstiloCajita = (titulo: string, contenido: string) => {
    return (
      <div className={estiloDivCajita}>
        <h3 className={estiloH3Cajita}>{titulo}</h3>
        <PrettyBox className={estiloPrettyBoxCajita}>
          <p className="">{contenido}</p>
        </PrettyBox>
      </div>
    );
  };

  return (
    <section className="w-full my-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
      {EstiloCajita("Subtotal sin IVA", formatearComoDinero(subtotalSinIVA))}
      {EstiloCajita(
        "Total gravado con IVA",
        formatearComoDinero(totalGravadoConIVA)
      )}
      {EstiloCajita(
        "Total no gravado con IVA",
        formatearComoDinero(totalNoGravadoConIVA)
      )}
      {EstiloCajita(
        "Total IVA",
        formatearComoDinero(valorTotalOCD - subtotalSinIVA)
      )}
      {
        <div className={estiloDivCajita}>
          <h3 className={estiloH3Cajita}>Descuento</h3>
          <PrettyBox
            className={twMerge(
              estiloPrettyBoxCajita,
              "flex flex-row items-center p-0"
            )}
          >
            <CampoEditableEntero
              valorOriginal={descuento.toString()}
              actualizarEstadoExterno={(nuevoEstado) =>
                setDescuento(parseInt(nuevoEstado))
              }
              classContainer="h-full flex-1 text-center text-font-gray"
              classInput="h-8 w-full rounded-sm"
              transformarAInputValido={(_, nuevoValorEntero) => {
                const valorEntero = parseInt(nuevoValorEntero);
                if (valorEntero > 100) {
                  return ["100", ""];
                }
                return [valorEntero.toString(), ""];
              }}
            />
            <span className="text-font-gray px-2">%</span>
          </PrettyBox>
        </div>
      }
      {EstiloCajita(
        "Valor total OCD",
        formatearComoDinero(valorTotalOCD - (valorTotalOCD * descuento) / 100)
      )}
    </section>
  );
};
