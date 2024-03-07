from beanie import Document
from pydantic import Field


class Loan(Document):
    loanId: str = Field(required=True, primary_key=True)
    user_id: str = Field(required=True)

    status: str = Field(required=True, enum=["APPROVED", "REJECTED"])

    amount: int = Field(required=True)
    term: int = Field(required=True)

    class Config:
        schema_extra = {
            "collection": "loans",
        }
