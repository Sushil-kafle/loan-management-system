from pydantic import BaseModel


class LoanIn(BaseModel):
    Married: str
    Education: str
    Self_Employed: str
    Credit_History: str
    Property_Area: str
    Dependents: int
    ApplicantIncome: int
    CoapplicantIncome: int
    LoanAmount: int
    Loan_Amount_Term: int


class LoanOut(BaseModel):
    loanId: str
    amount: int
    status: str
    amountLeft: int


class LoanDetailOut(BaseModel):
    _id: str
    amount: int
    status: str
    term: int
    user: str
