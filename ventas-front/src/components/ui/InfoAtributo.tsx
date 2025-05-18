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
  <p className="text-gray-700">
    <span className="font-medium">{label}:</span>{" "}
    {formatAsMoney ? formatearComoDinero(value as number) : value}
  </p>
);
