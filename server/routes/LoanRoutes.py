from fastapi import APIRouter, Depends

from schema.Loan import LoanIn, LoanOut, LoanDetailOut
from utils.get_user import get_current_user


from controller.loanController import predict_loan, get_all_loans, loan_details

router = APIRouter(prefix="/api/loans")


@router.post(
    "/createLoan/{userId}",
)
async def create_loan(request: LoanIn, userId: str = Depends(get_current_user)):
    return await predict_loan(request, userId)


@router.get(
    "/getUserLoans/{userId}",
    response_model=list[LoanOut],
)
async def get_user_loans(userId: str):
    return await get_all_loans(userId)


@router.get("/getLoanDetails/{loanId}", response_model=LoanDetailOut)
async def get_loan_details(loanId: str):
    return await loan_details(loanId)
