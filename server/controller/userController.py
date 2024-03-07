from fastapi import HTTPException, status

from models.User import User

from utils.hashing import Hash
from utils.jwt_token import create_jwt_token
import uuid
from models.User import Address


async def create_user(user):
    user_in_db = await User.find_one({"email": user.email})

    if user_in_db:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User already exists",
        )

    try:
        new_user = User(
            id=str(uuid.uuid4()),
            username=user.username,
            password=Hash.bcrypt(user.password),
            email=user.email,
            fullName=user.fullName,
            dateOfBirth=user.dateOfBirth,
            phoneNumber=user.phoneNumber,
            gender=user.gender,
            address=Address(
                street=user.street,
                city=user.city,
                state=user.state,
                postalCode=user.postalCode,
                country=user.country,
            ),
        )

        await new_user.save()

        return {
            "message": "User registered successfully",
            "status_code": status.HTTP_201_CREATED,
        }
    except Exception as e:
        print(f"Error during registration: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error while registering user",
        )


async def login_user(user):
    user_in_db = await User.find_one({"email": user.email})
    if not user_in_db:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password",
        )
    if not Hash.verify(user_in_db.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password",
        )

    token = create_jwt_token(user_in_db.id)

    return {
        "message": "User logged in successfully",
        "token": token,
        "status_code": status.HTTP_200_OK,
        "userId": user_in_db.id,
    }


def logout_user(response):
    response.delete_cookie("token")
    return {"message": "Logged out successfully"}
