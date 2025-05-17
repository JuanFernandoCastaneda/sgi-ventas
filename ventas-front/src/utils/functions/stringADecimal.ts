export const aStringDecimal = (numero: number) => {
  let encoding = numero.toString();
  const cantidadCerosFaltante = 2 - encoding.length;
  if (cantidadCerosFaltante > 0) {
    encoding = "0".repeat(cantidadCerosFaltante) + encoding;
  }
  return encoding.slice(0, -2) + "." + encoding.slice(-2);
};

export const descuentoANumber = (descuento: number) => {
  return parseInt((descuento * 100).toString());
};
