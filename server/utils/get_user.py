from fastapi import HTTPException, status, Header
from utils import jwt_token
from typing import Optional


def get_current_user(auth: Optional[str] = Header(None)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
    )
    print(auth)

    user_id = jwt_token.verify_token(auth, credentials_exception)
    return user_id
