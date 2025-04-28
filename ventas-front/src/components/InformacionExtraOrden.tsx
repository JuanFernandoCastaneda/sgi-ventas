import { FormaPago } from "../models/formaPago";

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
    <section className="w-full flex flex-col gap-4 mt-4">
      <label>
        Observaciones
        <div>
          <input
            type="text"
            value={observaciones}
            onChange={(e) => setObservaciones(e.target.value)}
          />
        </div>
      </label>
      <label>
        Información de facturación
        <div>
          <label>
            Fecha facturación
            <input
              type="date"
              value={fechaFactura}
              onChange={(e) => setFechaFactura(e.target.value)}
            />
          </label>
          <label>
            Forma de pago
            <select
              value={formaPago?.id || ""}
              onChange={(e) => cambiarFormaPago(e.target.value)}
            >
              {formasPagoDisponibles.map((formaPago) => (
                <option key={formaPago.id} value={formaPago.id}>
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
