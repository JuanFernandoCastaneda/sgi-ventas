from contextlib import asynccontextmanager
from fastapi import Depends, FastAPI
from app.dependencies.database import create_db_and_tables, get_session, populate_db
from app.model import migrations
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

load_dotenv()  # take environment variables

frontend_ip = os.environ.get("FRONTEND_IP")

origins = [frontend_ip] if frontend_ip != None else []


@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()
    populate_db()
    yield


app = FastAPI(dependencies=[Depends(get_session)], lifespan=lifespan)


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
