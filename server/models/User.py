from beanie import Document
from pydantic import BaseModel, Field
from datetime import datetime


class Address(BaseModel):
    street: str
    city: str
    state: str
    postalCode: str
    country: str


class User(Document):
    id: str = Field(required=True, primary_key=True)
    username: str = Field(required=True, unique=True)
    password: str = Field(required=True)
    email: str = Field(required=True, unique=True)
    fullName: str = Field(required=True)
    dateOfBirth: datetime = Field(required=True)
    phoneNumber: str = Field(required=False)
    gender: str = Field(required=True, enum=["male", "female"])
    address: Address = Field(required=True)

    role: str = Field(required=True, default="borrower", enum=["admin", "borrower"])

    class Config:
        schema_extra = {
            "collection": "users",
        }
