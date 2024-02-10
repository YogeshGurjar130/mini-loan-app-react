import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { apiPost } from "../utils/apis";
import { loanApplyUrl } from "../utils/urls";
import Header from "./Header";
import Loader from "./Loader";

const LoanApplication = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const [amount, setAmount] = useState(0);
    const [term, setTerm] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        const user = sessionStorage.getItem("user");
        console.log(user);
        if (user === null) {
            navigate("/")
        }

    })

    const onChangeAmount = (e) => {
        setAmount(e.target.value)
        setErrorMessage("")
    }
    const onChangeTerm = (e) => {
        setTerm(e.target.value)
        setErrorMessage("")
    }

    const onSubmit = async () => {
        if (amount === 0 || amount === "") {
            setErrorMessage("Please Enter Amount")
        }
        else if (term === 0) {
            setErrorMessage("Please Select Term")
        }
        else {
            setLoading(true)
            try {
                const response = await apiPost(loanApplyUrl, { amount: amount, term: term, userEmail: location.state?.email, createdDate: new Date() }, {});
                if (response === "Loan Applied") {
                    setLoading(false)
                    toast.success(response);
                    navigate("/loans", { state: { email: location.state?.email } })
                    console.log(response)
                } else {
                    setLoading(false)
                    setErrorMessage(response)
                }
            } catch (error) {
                setLoading(false)
                setErrorMessage(error.message)
            }
        }
    }

    return (
        <>
            <Header logout={true}></Header>
            <div className="container">
                <h2>Loan Application</h2>
                <div className="form-container">
                    <label className="label">User Email</label>
                    <input className="input-field" type="text" placeholder="User Email" defaultValue={location.state?.email} disabled></input>
                    <label className="label" style={{ marginTop: "15px" }}>Amount</label>
                    <input className="input-field" type="number" placeholder="Amount" value={amount} onChange={onChangeAmount}></input>
                    <label className="label" style={{ marginTop: "15px" }}>Term</label>
                    <select value={term} onChange={onChangeTerm} className="select-field">
                        <option>0</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                        <option>7</option>
                        <option>8</option>
                    </select>
                    <div className="button-container">
                        <button className="signup-button" onClick={onSubmit}>Apply</button>
                    </div>
                    <div className="message-container">
                        <span className="errorMessage">{errorMessage}</span>
                    </div>
                </div>
                <Loader loading={loading}></Loader>
                <Toaster position="top-center"></Toaster>
            </div>
        </>
    );
}

export default LoanApplication;