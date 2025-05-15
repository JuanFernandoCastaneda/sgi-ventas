#!/bin/bash
source ventas-back/.venv/bin/activate
FRONTEND_IP="http://localhost:5173" gnome-terminal --tab -- bash -c "fastapi run ventas-back/app/main.py" # Cierra la terminal después de terminar porque no se le puso exec bash.
VITE_BACKEND_IP="http://localhost:8000" gnome-terminal --tab -- bash -c "cd ventas-front/ && pnpm dev; exec bash" # En teoría no debería cerrar la terminal pero imagino que como utilizó cd lo hace.
