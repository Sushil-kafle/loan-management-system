from pydantic import BaseModel, Field
from datetime import datetime


class UserIn(BaseModel):
    username: str
    password: str
    email: str
    fullName: str
    gender: str
    dateOfBirth: datetime
    phoneNumber: str
    street: str
    city: str
    state: str
    postalCode: str
    country: str


class User_login(BaseModel):
    email: str
    password: str


class UserOut(BaseModel):
    id: str
    username: str

    email: str
    fullName: str
    dateOfBirth: str
    phoneNumber: str
    street: str
    city: str
    state: str
    postalCode: str
    country: str
