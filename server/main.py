from fastapi import FastAPI
import uvicorn
from routes import UserRoutes
from routes import LoanRoutes

from config.db import init_db


PORT = 5000


app = FastAPI()


app.include_router(LoanRoutes.router)
app.include_router(UserRoutes.router)


@app.on_event("startup")
async def on_startup():
    await init_db()


if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=PORT, reload=True)
