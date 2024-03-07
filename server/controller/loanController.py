from fastapi import HTTPException, status

from models.Loan import Loan
from schema.Loan import LoanOut, LoanDetailOut
from models.User import User
import uuid
from utils.preprocess_data import preprocess_data
import pandas as pd
import pickle


async def predict_loan(request, userId):
    try:
        user = await User.find_one({"_id": userId})
        gender = user.gender.capitalize()

        df = pd.DataFrame(
            {
                "Married": request.Married,
                "Education": request.Education,
                "Self_Employed": request.Self_Employed,
                "Credit_History": request.Credit_History,
                "Property_Area": request.Property_Area,
                "Dependents": request.Dependents,
                "ApplicantIncome": request.ApplicantIncome,
                "CoapplicantIncome": request.CoapplicantIncome,
                "LoanAmount": request.LoanAmount,
                "Loan_Amount_Term": request.Loan_Amount_Term,
                "Gender": gender,
            },
            index=[0],
        )

        df = preprocess_data(df)

        model = pickle.load(open("utils/model.pkl", "rb"))

        result = model.predict(df)

        status = "APPROVED" if result[0] == "1" else "REJECTED"

        loan_id = str(uuid.uuid4())
        loan = Loan(
            loanId=loan_id,
            user_id=user.id,
            status=status,
            amount=request.LoanAmount,
            term=request.Loan_Amount_Term,
        )

        await loan.save()
        return {"message": "Loan created successfully"}
    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Failed to create loan"
        )


async def get_all_loans(userId):
    try:
        loans = await Loan.find(Loan.user_id == userId).to_list()

        response = []
        for loan in loans:
            loan_out = LoanOut(
                loanId=loan.loanId,
                amount=loan.amount,
                status=loan.status,
                amountLeft=loan.amount,
            )
            response.append(loan_out)
        response.reverse()
        return response

    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Failed to get user loans"
        )


async def loan_details(loanId):
    try:
        loan = await Loan.find_one(Loan.loanId == loanId)
        print(loan)

        if not loan:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Loan not found"
            )

        return LoanDetailOut(
            _id=loan.loanId,
            amount=loan.amount,
            status=loan.status,
            term=loan.term,
            user=loan.user_id,
        )

    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Failed to get loan details"
        )
