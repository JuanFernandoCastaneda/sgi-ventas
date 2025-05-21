# Proyecto Ventas

This project has two main parts: a backend built with Python and FastAPI, and a frontend built with React using Vite.

It was made originally for a Spanish speaking context, and thus has a lot of components written in it.

## Example video

https://github.com/user-attachments/assets/c13aa217-aa12-4aca-9a8d-de4e51fa107d

## Backend: Python + FastAPI

The backend is located in the `ventas-back/` folder. To run it:

1. **Install dependencies**:
   Make sure Python 3.9 or later is installed. Then run the following commands from the `ventas-back/` directory:

   ```bash
   python -m venv venv
   source venv/bin/activate  # En Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

2. **.env file**:
   The frontend needs to know the backend's address. This is also configured with a `.env` file.

   A `.env.example` file is provided. You can use it as a reference or simply rename it to `.env`.

3. **Run the server**:
   Once dependencies are installed and the `.env` file is set up, start the server with:

   ```bash
   fastapi run app/main.py
   ```

   The backend will be available locally at `http://localhost:8000`.

## Frontend: Vite + React

The frontend is in the `ventas-front/` folder. To run it:

1. **Install dependencies**:
   You need Node.js and PNPM. From inside `ventas-front/`:

   ```bash
   pnpm install
   ```

2. **.env file**:
   The frontend needs to know the backend's address. This is also configured with a `.env` file.

   A `.env.example` file is provided. You can use it as a reference or simply rename it to `.env`.

3. **Run the development server**:
   Una vez instaladas las dependencias y configurado el archivo `.env`, puedes iniciar el servidor de desarrollo con:

   ```bash
   pnpm dev
   ```

   The frontend will be available at `http://localhost:5173`.

## Quick alternative to run the project

If you're using GNOME terminal, you can run the included `run_dev.sh` bash script to start the project automatically once dependencies are installed. This script also resets the database every time it runs:

```bash
source run_dev.sh
```

## Notes

- The backend and frontend are both configured to run on `localhost`. Both must be running for the app to work.
- Database migrations are handled automatically by the backend file located at `app/model/migrations.py`. It imports models from `app/model/schemas/*_model.py` which SQLModel uses to generate tables. Table constraints are defined inside those `*_model.py` files.

## Design Decisions

### Frontend

- **Componentization**: The frontend is divided into reusable components for easier maintenance and scalability. The folder structure also distinguishes between pages and components.
- **Requests**: Tanstack Query is used for API requests, enabling automated caching.
- **Global State**: Zustand is used for global state management, reducing unnecessary re-renders by only updating components with changed state.
- **State on VerOrden and ListaOrdenes**: The "View Order" page doesn't reuse the state from the "Order List" page; it makes its own request. This could be optimized if performance issues arise in production.

### Backend

- **Modular structure**: The backend is organized into modules for clean, scalable code. Each module contains its own logic, models, and routes.
- **SQLite Database**: SQLite is used to simplify local development. It can be swapped for a more robust DB in production. <br>
  The database is normalized up to 3NF. Derived fields are computed automatically with Pydantic’s `computed_field`.
- **CORS Enabled**: CORS is configured to allow requests from the frontend address specified in the environment variables. You can also use FastAPI's interactive docs at `DIRECCIÓN_BACKEND/docs`.
- **PDF Report Generation**: Reports are generated as PDFs using the `reportlab` library and stored in the `reports/` folder.
- **Security**: SQLModel sanitizes input by default.
- **Testing**: The `/tests` directory contains backend endpoint tests. It's a work in progress, but existing tests can be run using `pytest`.
