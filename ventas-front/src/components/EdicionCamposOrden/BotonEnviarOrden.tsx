import { useNavigate } from "react-router";
import { useStoreAplicacion } from "../../utils/context/CarritoZustand";
import { FormaPago } from "../../utils/models/formaPago";
import {
  postOrdenCompra,
  updateOrdenCompra,
} from "../../utils/models/httpMethodsOrden";
import { refetchAllOrders } from "../../utils/tanstack/allOrdersQueryOptions";
import { OrdenConProductosPublic } from "../../utils/models/orden";
import { refetchSpecificOrder } from "../../utils/tanstack/specificOrderQueryOptions";

export const BotonEnviarOrden: React.FC<{
  idOrden?: number;
  formaPago: FormaPago | null;
  observaciones: string;
  fechaFactura: string;
  descuento: number;
}> = ({ idOrden, formaPago, observaciones, fechaFactura, descuento }) => {
  const navigate = useNavigate();

  const productosCarrito = useStoreAplicacion((state) => state.carrito);
  const editandoCampo = useStoreAplicacion((state) => state.editandoCampo);
  const vaciarCarrito = useStoreAplicacion((state) => state.vaciarCarrito);

  const crearOrdenCompra = () => {
    postOrdenCompra(
      productosCarrito,
      formaPago,
      observaciones,
      fechaFactura,
      descuento
    ).then(async (response) => {
      if (response.ok) {
        console.log("Orden de compra creada");
        const json = await response.json();
        vaciarCarrito();
        navigate(`/ordenes/${json.id}`);
        refetchAllOrders();
      }
    });
  };

  const actualizarOrdenCompra = () => {
    if (idOrden) {
      updateOrdenCompra(
        idOrden,
        productosCarrito,
        formaPago,
        observaciones,
        fechaFactura,
        descuento
      ).then(async (response) => {
        if (response.ok) {
          console.log("Orden de compra creada");
          const orden: OrdenConProductosPublic = await response.json();
          vaciarCarrito();
          refetchSpecificOrder(orden.id);
          navigate(`/ordenes/${orden.id}`);
          refetchAllOrders();
        }
      });
    }
  };

  return (
    <div className="mt-6 mb-10 flex flex-row justify-center h-10">
      {editandoCampo ? (
        <span className="text-orange-500">
          Espera a que la orden de compra termine de editarse para guardarla
        </span>
      ) : !idOrden ? (
        <button
          onClick={() => {
            !editandoCampo && crearOrdenCompra();
          }}
          className="py-1 px-2 outline-2 text-font-gray rounded-md outline-font-hover-purple hover:bg-font-hover-purple hover:text-white font-medium"
        >
          Crear ODC
        </button>
      ) : (
        <button
          onClick={() => {
            !editandoCampo && actualizarOrdenCompra();
          }}
          className="py-1 px-2 outline-2 text-font-gray rounded-md outline-font-hover-purple hover:bg-font-hover-purple hover:text-white font-medium"
        >
          Actualizar ODC
        </button>
      )}
    </div>
  );
};
