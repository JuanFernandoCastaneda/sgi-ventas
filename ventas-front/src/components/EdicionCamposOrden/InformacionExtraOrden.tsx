import { FormaPago } from "../../utils/models/formaPago";

/**
 * Componente que representa la información no relacionada con el carrita de una ODP.
 */
export const InformacionExtraOrden: React.FC<{
  formaPago: FormaPago | null;
  cambiarFormaPago: Function;
  formasPagoDisponibles: Array<FormaPago>;
  observaciones: string;
  setObservaciones: Function;
  fechaFactura: string;
  setFechaFactura: Function;
}> = ({
  formaPago,
  cambiarFormaPago,
  formasPagoDisponibles,
  observaciones,
  setObservaciones,
  fechaFactura,
  setFechaFactura,
}) => {
  return (
    <section className="w-full md:flex md:flex-row gap-4 mt-8 md:mt-8 lg:mt-6">
      <div className="w-1/2 text-font-gray">
        <label>Observaciones</label>
        <div className="w-full h-20 mt-2 mb-6 md:mb-2">
          <textarea
            value={observaciones}
            onChange={(e) => setObservaciones(e.target.value)}
            placeholder="Agregar observaciones..."
            className="w-full text-[15px] h-full p-2 bg-white rounded-sm bg-inherit align-text-top align-top"
          />
        </div>
      </div>
      <label className="w-1/2 text-font-gray">
        Información de facturación
        <div className="sm:flex sm:flex-row my-2 w-full rounded-md p-1 min-h-20 bg-white align-text-top">
          <label className="flex flex-col sm:w-1/2 p-2">
            Fecha facturación
            <input
              type="date"
              value={fechaFactura}
              onChange={(e) => setFechaFactura(e.target.value)}
              className="w-full px-1 bg-background-gray rounded-md h-full min-h-8"
            />
          </label>
          <label className="flex flex-col sm:w-1/2 p-2">
            Forma de pago
            <select
              value={formaPago?.id || ""}
              onChange={(e) => cambiarFormaPago(e.target.value)}
              className="w-full px-1 bg-background-gray rounded-md min-h-8"
            >
              {formasPagoDisponibles.map((formaPago) => (
                <option
                  key={formaPago.id}
                  value={formaPago.id}
                  onClick={() => cambiarFormaPago(formaPago.id)}
                >
                  {formaPago.tipo}
                </option>
              ))}
            </select>
          </label>
        </div>
      </label>
    </section>
  );
};
