/**
 * Formatea un número como dinero
 * @param cantidad
 * @param currencyCode
 * @param locale
 * @returns string con el número formateado
 */
export function formatearComoDinero(
  cantidad: number,
  currencyCode: string = "COP",
  locale: string = "es-CO"
) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currencyCode,
  }).format(cantidad);
}
