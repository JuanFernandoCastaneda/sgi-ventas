from fastapi import FastAPI
from app.routers import (
    ordenes_router,
    productos_ordenes_router,
    productos_router,
    forma_pago_router,
    reporte_router,
)
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv

app = FastAPI()

load_dotenv()  # take environment variables

frontend_ip = os.environ.get("FRONTEND_IP")

origins = [frontend_ip] if frontend_ip != None else []

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(ordenes_router.router)
app.include_router(productos_ordenes_router.router)
app.include_router(forma_pago_router.router)
app.include_router(productos_router.router)
app.include_router(reporte_router.router)
