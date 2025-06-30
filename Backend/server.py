import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.asl_routes import router as asl_router
from api.userRoutes import router as user_router
from utils.dbConnection import init_db

app = FastAPI()
init_db()

# enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)

app.include_router(user_router, prefix="/user", tags=["Users"])
app.include_router(asl_router, prefix="/asl", tags=["ASL"])

@app.get("/")
def read_root():
    return {"message": "Welcome to the App API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "server:app",
        host="0.0.0.0",    # <— listen on all interfaces
        port=8000,
        reload=True,
        log_level="info"
    )
