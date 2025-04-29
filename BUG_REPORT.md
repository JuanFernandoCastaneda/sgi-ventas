# Bug Report

Buenas. Este archivo es un intento de reportar problemas que podrían encontrarse durante la ejecución del programa, encontrados después de la entrega.

- **Descuento CrearOrden**: Por una mala comparación que se hace en la actualización del descuento de CrearOrden, es posible que queden 0s adelante del número (por ejemplo, 003). Si se intenta crear una orden con 0s delante de descuento, esta acción va a fallar y va a redirigir a una página undefined.

- **Cantidad producto en CrearOrden**: Ingresar letras en el campo de cantidad de un producto no tiene ningún efecto gráfico. Además, si se ingresan al final o al inicio del número, tampoco interfieren con el comportamiento normal de la aplicación. Sin embargo, si estas se ingresan en la mitad del número (por ejemplo, que esté el número 134 e intentar escribir una letra entre el 3 y el 4), y luego se da la orden de crear, ese producto se enviará con cantidad = 1.
