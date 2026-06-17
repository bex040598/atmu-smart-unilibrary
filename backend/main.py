from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os

from app.core.config import settings
from app.core.database import create_db_and_tables
from app.api.routes import auth, users, departments, resources, books, reservations, loans, reading_room, face, ai, reports, audit

app = FastAPI(
    title="ATMU Smart UniLibrary API",
    description="Axborot texnologiyalari va menejment universiteti elektron kutubxona platformasi",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Static files
os.makedirs("uploads", exist_ok=True)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# Include routers
app.include_router(auth.router)
app.include_router(users.router)
app.include_router(departments.router)
app.include_router(resources.router)
app.include_router(books.router)
app.include_router(reservations.router)
app.include_router(loans.router)
app.include_router(reading_room.router)
app.include_router(face.router)
app.include_router(ai.router)
app.include_router(reports.router)
app.include_router(audit.router)


@app.on_event("startup")
def on_startup():
    create_db_and_tables()
    # Auto seed if needed
    try:
        from app.utils.seed import seed
        seed()
    except Exception as e:
        print(f"Seed warning: {e}")


@app.get("/")
def root():
    return {
        "name": "ATMU Smart UniLibrary API",
        "version": "1.0.0",
        "docs": "/docs",
        "status": "running",
    }


@app.get("/health")
def health():
    return {"status": "healthy", "service": "atmu-library-api"}
