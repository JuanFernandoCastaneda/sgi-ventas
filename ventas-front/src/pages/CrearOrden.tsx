import { useNavigate } from "react-router";
import { ListaProductos } from "../components/ListaProductos";

export const CrearOrden: React.FC = () => {
  const navigate = useNavigate();
  const ordenProperties = {
    id: 0,
    cliente: "",
    vendedor: "",
    fecha: new Date(),
    productos: [],
  }

  return (
    <>
      <header className="w-full px-4 bg-inherit h-18 flex items-center justify-start">
        <button onClick={() => navigate(-1)} className="bg-inherit p-2 text-gray-500 text-4xl font-stretch-50%">
            {"<"}
        </button>
        <h2 className="font-medium text-xl text-gray-700">{`OCD ${ordenProperties.id}`}</h2>
      </header>
      <main className="w-full px-4">
        <ListaProductos />
      </main>
    </>
  );
};
