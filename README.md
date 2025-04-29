# Proyecto Ventas

Este proyecto tiene dos partes principales: un backend en Python con FastAPI y un frontend en React usando Vite.

## Backend: Python + FastAPI

El backend está en la carpeta ventas-back/. Para correrlo:

1. **Instalar dependencias**:
   Asegúrate de tener Python 3.9 o superior instalado. Luego, ejecuta los siguientes comandos desde la carpeta `ventas-back/`:

   ```bash
   python -m venv venv
   source venv/bin/activate  # En Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

2. **Ejecutar el servidor**:
   Una vez instaladas las dependencias, puedes iniciar el servidor con:

   ```bash
   fastapi run app/main.py
   ```

   El backend estará disponible en `http://localhost:8000`.

## Frontend: Vite + React

El frontend está en ventas-front/. Para correrlo:

1. **Instalar dependencias**:
   Necesitas tener Node.js y PNPM. Luego, desde ventas-front/:

   ```bash
   pnpm install
   ```

2. **Ejecutar el servidor de desarrollo**:
   Una vez instaladas las dependencias, puedes iniciar el servidor de desarrollo con:

   ```bash
   pnpm dev
   ```

   El frontend estará disponible en `http://localhost:5173`.

## Notas

- El backend y el frontend están configurados para ejecutarse en `localhost`. Ambos servidores (frontend y backend) deben estar corriendo para que la app funcione.
- Las migraciones se hacen automáticamente por el archivo del back que se encuentra en `app/model/migrations.py`. Este archivo importa los modelos que se encuentran en `app/model/schemas/*_model.py` y con eso permite que SQLModel los genere. Los constraints de las tablas están dentro de estos archivos `*_model.py`. 

## Decisiones de Diseño

### Backend

- **Estructura modular**: El backend está organizado en módulos para mantener el código limpio y escalable. Cada módulo tiene su propia lógica, modelos, y rutas.
- **Base de datos SQLite**: Se utiliza SQLite como base de datos para simplificar el desarrollo local. Esto puede cambiarse a una base de datos más robusta en producción. <br>
  La base de datos está normalizada hasta 3NF y por tanto no tiene campos dependientes, pero el backend calcula los campos dependientes automáticamente con Pydantic y su funcionalidad `computed_field`.
- **CORS habilitado**: Se configuró CORS para permitir peticiones desde el frontend en `http://localhost:5173`. También es posible realizar peticiones directamente desde la interfaz interactiva de FastAPI disponible en `http://localhost:8000/docs`.
- **Generación de reportes**: Los reportes se generan en formato PDF con la librería `reportlab` y se almacenan en la carpeta `reports/`.
- **Seguridad**: Una funcionalidad básica de seguridad es el escape de cadenas de caracteres en las peticiones. Por restricciones de tiempo, no se implementaron, pero sería pertinente hacerlo en producción.

### Frontend

- **Estado del carrito en Crear Orden**: Actualmente, si el usuario sale de la página de "Crear Orden", el carrito de compras se pierde. Esto se puede solucionar implementando un estado global con Redux o una librería similar. Este comportamiento puede cambiarse en producción.
- **Estado en Ver Orden y Lista Ordenes**: Actualmente no se reutiliza el estado de Lista Ordenes para crear el de Ver Orden. A cambio, Ver Orden hace una petición independiente. Esto se podría cambiar en producción si se empieza a ver que el rendimiento cae.
- **Componentización**: El frontend está dividido en componentes reutilizables para facilitar el mantenimiento y la escalabilidad del proyecto. Asimismo, la estructura de carpetas hace diferencia entre las páginas y los componentes.
- **Interacción con OpenAPI en producción**: En un entorno de producción, se podría considerar implementar una solución como [HeyAPI](https://heyapi.dev/). Esta permite usar las especificación de OpenAPI generada por FastAPI para crear tipos y asegurar el correcto uso de peticiones.
- **Peticiones**: Idealmente, las peticiones deberían ser abstraidas en el directorio de módulos para desacoplar su comportamiento. Por restricciones de tiempo, no se implementó, pero sería algo a tener en cuenta en producción.
