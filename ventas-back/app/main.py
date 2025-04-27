from fastapi import FastAPI
from routers import ordenes_router, productos_router

app = FastAPI()

app.include_router(ordenes_router.router)
app.include_router(productos_router.router)