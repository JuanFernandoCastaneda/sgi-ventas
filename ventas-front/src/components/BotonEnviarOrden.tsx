import { useNavigate } from "react-router";
import { FormaPago } from "../models/formaPago";
import { DetalleOrden } from "../models/producto";
import { useStoreAplicacion } from "../utils/context/CarritoZustand";

export const BotonEnviarOrden: React.FC<{
  formaPago: FormaPago | null;
  observaciones: string;
  fechaFactura: string;
  descuento: number;
}> = ({ formaPago, observaciones, fechaFactura, descuento }) => {
  const navigate = useNavigate();

  const productosCarrito = useStoreAplicacion((state) => state.carrito);
  const editandoCampo = useStoreAplicacion((state) => state.editandoCampo);
  const vaciarCarrito = useStoreAplicacion((state) => state.vaciarCarrito);

  const aStringDecimal = (numero: number) => {
    let encoding = numero.toString();
    const cantidadCerosFaltante = 2 - encoding.length;
    if (cantidadCerosFaltante > 0) {
      encoding = "0".repeat(cantidadCerosFaltante) + encoding;
    }
    return encoding.slice(0, -2) + "." + encoding.slice(-2);
  };

  const crearOrdenCompra = () => {
    const body = JSON.stringify({
      id: -1,
      detalles: Array.from(productosCarrito, ([id, cantidad]) => {
        return { id_producto: id, cantidad: cantidad } as DetalleOrden;
      }),
      id_forma_pago: formaPago?.id || 1,
      observaciones: observaciones,
      fecha_facturacion: fechaFactura,
      descuento: aStringDecimal(descuento),
    });
    console.log(body);
    fetch("http://localhost:8000/ordenes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    }).then(async (response) => {
      if (response.ok) {
        console.log("Orden de compra creada");
      }
      const json = await response.json();
      vaciarCarrito();
      navigate(`/ordenes/${json.id}`);
    });
  };

  return (
    <div className="mt-6 mb-10 flex flex-row justify-center h-10">
      {editandoCampo ? (
        <span className="text-orange-500">
          Espera a que la orden de compra termine de editarse para crearla
        </span>
      ) : (
        <button
          onClick={() => {
            !editandoCampo && crearOrdenCompra();
          }}
          className="py-1 px-2 outline-2 text-font-gray rounded-md outline-font-hover-purple hover:bg-font-hover-purple hover:text-white font-medium"
        >
          Crear ODC
        </button>
      )}
    </div>
  );
};
