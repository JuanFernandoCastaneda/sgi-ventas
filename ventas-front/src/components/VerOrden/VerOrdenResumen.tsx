import React from "react";
import { InfoAtributo } from "../ui/InfoAtributo";
import { PrettyBox } from "../ui/PrettyBox";
import { OrdenConProductosPublic } from "../../utils/models/orden";
import { descuentoANumber } from "../../utils/functions/stringADecimal";
import { FormaPago } from "../../utils/models/formaPago";

export const VerOrdenResumen: React.FC<{
  orden: OrdenConProductosPublic;
  formaPago: FormaPago | null;
}> = ({ orden, formaPago }) => {
  return (
    <PrettyBox className="space-y-6">
      <h3 className="text-xl font-medium text-gray-700">Resumen</h3>
      <div className="grid xs:grid-cols-2 sm:grid-rows-4 gap-4">
        <InfoAtributo label="Forma pago" value={formaPago?.tipo || ""} />
        <InfoAtributo
          label="Subtotal sin IVA"
          value={orden.subtotal_sin_iva}
          formatAsMoney
        />
        <InfoAtributo
          label="Total gravado IVA"
          value={orden.total_gravado_iva}
          formatAsMoney
        />
        <InfoAtributo
          label="Total no gravado IVA"
          value={orden.total_no_gravado_iva}
          formatAsMoney
        />
        <InfoAtributo label="Total IVA" value={orden.total_iva} formatAsMoney />
        <InfoAtributo
          label="Descuento"
          value={`${descuentoANumber(orden.descuento)}%`}
        />
        <InfoAtributo
          label="Valor Total"
          value={orden.valor_total}
          formatAsMoney
        />
      </div>
    </PrettyBox>
  );
};
