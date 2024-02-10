import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { apiGet } from "../utils/apis";
import { getCustomersLoanUrl } from "../utils/urls";
import Header from "./Header";
import Loader from "./Loader";

const CustomersLoan = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const [loanList, setLoanList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await apiGet(`${getCustomersLoanUrl}?email=${location.state?.email}`, {}, {});
                if (response?.[0]?.amount || typeof (response) === "object") {
                    console.log(response)
                    setLoading(false);
                    setLoanList(response);
                } else {
                    setLoading(false);
                    toast.error(response)
                }
            } catch (error) {
                setLoading(false);
                toast.error(error.message)
            }
        }

        const user = sessionStorage.getItem("user");
        console.log(user);
        if (user === null) {
            navigate("/")
        } else {
            fetchData();
        }

    }, []);

    const applyLoan = () => {
        const user = sessionStorage.getItem("user");
        const parsed = JSON.parse(user);
        navigate("/apply", { state: { email: parsed?.email } })
    }

    const getWeeklyTerm = (referenceId) => {
        navigate("/transactions", { state: { referenceId: referenceId } })
    }

    return (
        <>
            <Header logout={true}></Header>
            <div className="container">
                <div className="heading-container">
                    <h1 className="table-title">Customer Loan</h1>
                    <button className="apply-button" onClick={applyLoan}>Apply Loan</button>
                </div>
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Loan Amount</th>
                                <th>Applied Date</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        {loanList.length !== 0 ? <tbody>
                            {loanList.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.amount}</td>
                                    <td>{item.createdDate}</td>
                                    <td>{item.status}</td>
                                    <td> {item.status === "approved" ? <button className="browse-button" onClick={() => getWeeklyTerm(item.referenceId)}>Weekly Term</button> : "No Action"}</td>
                                </tr>
                            ))}
                        </tbody> : <p className="no-data-message">No data available</p>}
                    </table>
                </div>
                <Loader loading={loading}></Loader>
                <Toaster position="top-center"></Toaster>
            </div>
        </>
    );
}

export default CustomersLoan;