/**
 * Función que formatea un número como moneda (COP)
 */
export const formatearComoDinero = (valor: number): string => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(valor);
};
