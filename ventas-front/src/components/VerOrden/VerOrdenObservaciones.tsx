import React from "react";
import { PrettyBox } from "../ui/PrettyBox";
import { OrdenConProductosPublic } from "../../utils/models/orden";

export const VerOrdenObservaciones: React.FC<{
  orden: OrdenConProductosPublic;
}> = ({ orden }) => {
  return (
    <PrettyBox className="w-full space-y-6 flex-flex-col">
      <h3 className="w-full text-xl font-medium text-gray-700">
        Observaciones
      </h3>
      <div className="w-inherit grow-1 text-[15px] rounded-md align-text-top align-top text-gray-700 prose">
        {orden.observaciones.split("\n").map((paragraph) => (
          <p className="text-gray-700 break-all">{paragraph}</p>
        ))}
      </div>
    </PrettyBox>
  );
};
