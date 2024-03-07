from dotenv import load_dotenv
import motor
import os
from beanie import init_beanie

from models.User import User
from models.Loan import Loan

load_dotenv()


mongoURI = os.getenv(
    "MONGODB_SERVER_PORT",
)


async def init_db():
    client = motor.motor_asyncio.AsyncIOMotorClient(mongoURI)

    # INIT BEANIE
    await init_beanie(client.test1, document_models=[User, Loan])
