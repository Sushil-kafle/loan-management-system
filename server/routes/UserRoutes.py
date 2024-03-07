from fastapi import APIRouter, Response

from schema.User import UserIn
from schema.User import User_login


from controller.userController import create_user, login_user, logout_user

router = APIRouter(prefix="/api/users")


@router.post("/register")
async def register(user: UserIn):
    return await create_user(user)


@router.post("/login")
async def login(user: User_login):
    return await login_user(user)


@router.post("/logout")
def logout(
    response: Response,
):
    return logout_user(response)
