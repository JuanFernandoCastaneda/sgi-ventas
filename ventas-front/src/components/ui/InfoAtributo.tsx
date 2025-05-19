import { formatearComoDinero } from "../../utils/functions/formatearDinero";

interface InfoAttributeProps {
  label: string;
  value: string | number;
  formatAsMoney?: boolean;
}

export const InfoAtributo: React.FC<InfoAttributeProps> = ({
  label,
  value,
  formatAsMoney = false,
}) => (
  <div className="text-gray-700">
    <h4 className="font-medium">{label}:</h4>
    <p className="">
      {formatAsMoney ? formatearComoDinero(value as number) : value}
    </p>
  </div>
);
