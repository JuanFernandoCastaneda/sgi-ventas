import { ProductoDO } from "../../models/producto";
import { MenuAgregarProducto } from "./MenuAgregarProducto";
import { TablaCarritoVentas } from "./TablaCarritoVentas";

export const CarritoVentas: React.FC<{
  productosInventario: Array<ProductoDO>;
}> = ({ productosInventario }) => {
  return (
    <section className="p-4 bg-white rounded-lg shadow-md">
      <TablaCarritoVentas
        {...{
          productosInventario,
        }}
      />
      <MenuAgregarProducto {...{ productosInventario }} />
    </section>
  );
};
