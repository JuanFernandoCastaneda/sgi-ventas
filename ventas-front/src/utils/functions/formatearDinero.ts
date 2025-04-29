export function formatearComoDinero(
  cantidad: number,
  currencyCode: string = "CLP",
  locale: string = "es-CL"
) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currencyCode,
  }).format(cantidad);
}
