from fastapi import FastAPI
from app.routers import (
    ordenes_router,
    productos_ordenes_router,
    productos_router,
    forma_pago_router,
    reporte_router,
)
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:5173",
]

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
