"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
const token = Cookies.get("user_token");

export const metadata: Metadata = {
  title: "Loan Request form",
  description: "Request a loan from the Admins",
  // other metadata
};

const RequestLoan = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    Married: "Yes",
    Dependents: "",
    Education: "Graduate",
    Self_Employed: "Yes",
    ApplicantIncome: "",
    CoapplicantIncome: "",
    LoanAmount: "",
    Loan_Amount_Term: "",
    Credit_History: "Yes",
    Property_Area: "Rural",
  });

  const [err, setErr] = useState("");
  const [errors, setErrors] = useState({
    Married: "",
    Dependents: "",
    Education: "",
    Self_Employed: "",
    ApplicantIncome: "",
    CoapplicantIncome: "",
    LoanAmount: "",
    Loan_Amount_Term: "",
    Credit_History: "",
    Property_Area: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const selectedValue = e.target.type === "select-one" ? e.target.value : value;

    setFormData({
      ...formData,
      [name]: selectedValue,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log(formData);
    // Reset previous errors
    setErrors({
      Married: "",
      Education: "",
      Self_Employed: "",
      Property_Area: "",
      Dependents: "",
      ApplicantIncome: "",
      CoapplicantIncome: "",
      LoanAmount: "",
      Loan_Amount_Term: "",
      Credit_History: "",
    });

    let isValid = true;

    if (!formData.Dependents) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        Dependents: "Dependents name is required",
      }));
      isValid = false;
    }
    if (!formData.ApplicantIncome) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        ApplicantIncome: "ApplicantIncome name is required",
      }));
      isValid = false;
    }

    if (!formData.CoapplicantIncome) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        CoapplicantIncome: "CoapplicantIncome name is required",
      }));
      isValid = false;
    }

    if (!formData.LoanAmount) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        LoanAmount: "LoanAmount name is required",
      }));
      isValid = false;
    }

    if (!formData.LoanAmount) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        LoanAmount: "LoanAmount name is required",
      }));
      isValid = false;
    }

    if (isValid) {
      console.log(formData);
      try {
        const response = await fetch("/api/loans/createLoan/" + Cookies.get("userId"), {
          method: "POST",
          headers: {
            auth: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const data = await response.json();
          // Handle successful response (e.g., show a success message)
          alert(`Loan application successful.`);
          // Reset form fields after submission
          router.push("/manage-loans/my-loans");

          // Clear the form fields
          setFormData({
            Married: "",
            Dependents: "",
            Education: "",
            Self_Employed: "",
            ApplicantIncome: "",
            CoapplicantIncome: "",
            LoanAmount: "",
            Loan_Amount_Term: "",
            Credit_History: "",
            Property_Area: "",
          });
        } else {
          const data = await response.json();
          console.error("Registration failed:", data.error);
          setErr(data.error);
        }
      } catch (error) {
        console.error("Registration error:", error);
      }
    }
  };

  return (
    <>
      <Breadcrumb pageName="Loan Request Form" />

      <div className="grid  grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex  flex-col gap-9">
          {/* <!-- Loan Request Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark flex-1 w-full ">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">Request a Loan</h3>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-4  ">
                <label
                  htmlFor="Married"
                  className="mb-2.5 block font-medium text-black dark:text-white"
                >
                  Married
                </label>
                <div className="relative">
                  <select
                    id="Married"
                    name="Married"
                    required
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    value={formData.Married}
                    onChange={handleChange}
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
                {errors.Married && <p className="mt-2 text-sm text-red-500">{errors.Married}</p>}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="Credit_History"
                  className="mb-2.5 block font-medium text-black dark:text-white"
                >
                  Credit_History
                </label>
                <div className="relative">
                  <select
                    id="Credit_History"
                    name="Credit_History"
                    required
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    value={formData.Credit_History}
                    onChange={handleChange}
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
                {errors.Credit_History && (
                  <p className="mt-2 text-sm text-red-500">{errors.Credit_History}</p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="Education"
                  className="mb-2.5 block font-medium text-black dark:text-white"
                >
                  Education
                </label>
                <div className="relative">
                  <select
                    id="Education"
                    name="Education"
                    required
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    value={formData.Education}
                    onChange={handleChange}
                  >
                    <option value="Graduate">Graduate</option>
                    <option value="Not Graduate">Not Graduate</option>
                  </select>
                </div>
                {errors.Education && (
                  <p className="mt-2 text-sm text-red-500">{errors.Education}</p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="Self_Employed"
                  className="mb-2.5 block font-medium text-black dark:text-white"
                >
                  Self_Employed
                </label>
                <div className="relative">
                  <select
                    id="Self_Employed"
                    name="Self_Employed"
                    required
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    value={formData.Self_Employed}
                    onChange={handleChange}
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
                {errors.Self_Employed && (
                  <p className="mt-2 text-sm text-red-500">{errors.Self_Employed}</p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="Property_Area"
                  className="mb-2.5 block font-medium text-black dark:text-white"
                >
                  Property_Area
                </label>
                <div className="relative">
                  <select
                    id="Property_Area"
                    name="Property_Area"
                    required
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    value={formData.Property_Area}
                    onChange={handleChange}
                  >
                    <option value="Rural">Rural</option>
                    <option value="Semiurban">Semiurban</option>
                    <option value="Urban">Urban</option>
                  </select>
                </div>
                {errors.Property_Area && (
                  <p className="mt-2 text-sm text-red-500">{errors.Property_Area}</p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="Dependents"
                  className="mb-2.5 block font-medium text-black dark:text-white"
                >
                  Dependents
                </label>
                <div className="relative">
                  <input
                    id="Dependents"
                    name="Dependents"
                    type="number"
                    autoComplete="Dependents"
                    required
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    placeholder="Dependents"
                    value={formData.Dependents}
                    onChange={handleChange}
                  />
                </div>
                {errors.Dependents && (
                  <p className="mt-2 text-sm text-red-500">{errors.Dependents}</p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="ApplicantIncome"
                  className="mb-2.5 block font-medium text-black dark:text-white"
                >
                  ApplicantIncome
                </label>
                <div className="relative">
                  <input
                    id="ApplicantIncome"
                    name="ApplicantIncome"
                    type="number"
                    autoComplete="ApplicantIncome"
                    required
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    placeholder="ApplicantIncome "
                    value={formData.ApplicantIncome}
                    onChange={handleChange}
                  />
                </div>
                {errors.ApplicantIncome && (
                  <p className="mt-2 text-sm text-red-500">{errors.ApplicantIncome}</p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="CoapplicantIncome"
                  className="mb-2.5 block font-medium text-black dark:text-white"
                >
                  CoapplicantIncome
                </label>
                <div className="relative">
                  <input
                    id="CoapplicantIncome"
                    name="CoapplicantIncome"
                    type="number"
                    autoComplete="CoapplicantIncome"
                    required
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    placeholder="CoapplicantIncome"
                    value={formData.CoapplicantIncome}
                    onChange={handleChange}
                  />
                </div>
                {errors.CoapplicantIncome && (
                  <p className="mt-2 text-sm text-red-500">{errors.CoapplicantIncome}</p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="LoanAmount"
                  className="mb-2.5 block font-medium text-black dark:text-white"
                >
                  LoanAmount
                </label>
                <div className="relative">
                  <input
                    id="LoanAmount"
                    name="LoanAmount"
                    type="number"
                    autoComplete="LoanAmount"
                    required
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    placeholder="LoanAmount"
                    value={formData.LoanAmount}
                    onChange={handleChange}
                  />
                </div>
                {errors.LoanAmount && (
                  <p className="mt-2 text-sm text-red-500">{errors.LoanAmount}</p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="Loan_Amount_Term"
                  className="mb-2.5 block font-medium text-black dark:text-white"
                >
                  Loan_Amount_Term
                </label>
                <div className="relative">
                  <input
                    id="Loan_Amount_Term"
                    name="Loan_Amount_Term"
                    type="number"
                    autoComplete="Loan_Amount_Term"
                    required
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    placeholder="Loan_Amount_Term"
                    value={formData.Loan_Amount_Term}
                    onChange={handleChange}
                  />
                </div>
                {errors.Loan_Amount_Term && (
                  <p className="mt-2 text-sm text-red-500">{errors.Loan_Amount_Term}</p>
                )}
              </div>

              <p className="text-red">{err}</p>
              <div className="mb-5">
                <input
                  type="submit"
                  value=" Ask for Approval"
                  className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RequestLoan;

// <form onSubmit={handleSubmit}>
//   <div className="p-6.5">
//     <div className="mb-4.5">
//       <label className="mb-2.5 block text-black dark:text-white">
//         Loan Amount (in Rupees)
//         <span className="text-meta-1">*</span>
//       </label>
//       <input
//         type="number"
//         id="loanAmount"
//         name="loanAmount"
//         placeholder="Enter the loan amount"
//         value={loanAmount}
//         onChange={(e) => setLoanAmount(Number(e.target.value))}
//         required
//         className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
//       />
//     </div>

//     <div className="mb-4.5">
//       <label className="mb-2.5 block text-black dark:text-white">
//         Loan Term (in Weeks)
//         <span className="text-meta-1">*</span>
//       </label>
//       <input
//         type="number"
//         id="term"
//         name="term"
//         placeholder="Enter loan term"
//         value={term}
//         min={1}
//         onChange={(e) => setTerm(Number(e.target.value))}
//         required
//         className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
//       />
//     </div>
//     <p className="text-meta-1">{err}</p>
//     <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
//       Ask for Approval
//     </button>
//   </div>
// </form>;
