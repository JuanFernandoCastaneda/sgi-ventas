import { MenuAgregarProducto } from "./MenuAgregarProducto";
import { TablaCarritoVentas } from "./TablaCarritoVentas";

/**
 * Componente que representa el carrito de ventas.
 *
 * Dentro tiene la tabla de productos y el menu para agregar productos.
 */
export const CarritoVentas: React.FC<{}> = ({}) => {
  return (
    <section className="p-4 bg-white rounded-lg shadow-md">
      <TablaCarritoVentas />
      <MenuAgregarProducto />
    </section>
  );
};
