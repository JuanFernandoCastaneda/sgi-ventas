from fastapi import FastAPI
from app.routers import ordenes_router, productos_ordenes_router, forma_pago_router

app = FastAPI()

app.include_router(ordenes_router.router)
app.include_router(productos_ordenes_router.router)

app.include_router(forma_pago_router.router)
