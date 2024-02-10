import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { apiPost } from "../utils/apis";
import { getAllTransactionsUrl, weeklyPaymentUrl } from "../utils/urls";
import Header from "./Header";
import Loader from "./Loader";


const LoanRepayment = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const [transactions, setTransactions] = useState([]);
    const [reaload, setReload] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await apiPost(`${getAllTransactionsUrl}?referenceId=${location?.state?.referenceId}`, {}, {});
                if (response?.[0]?.repayAmount) {
                    console.log(response)
                    setLoading(false);
                    setTransactions(response);
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

    }, [reaload]);

    const onPay = async (transaction) => {
        setLoading(true);
        try {
            const response = await apiPost(weeklyPaymentUrl, transaction, {});
            if (response === "Transaction successfully") {
                console.log(response);
                setLoading(false);
                toast.success(response);
                setReload(!reaload);
            }
            else if (response === "Last Transaction successfully") {
                console.log(response)
                setLoading(false);
                toast.success(response);
                setReload(!reaload);
            }
            else {
                setLoading(false);
                toast.error(response);
            }
        } catch (error) {
            setLoading(false);
            toast.error(error.message)
        }
    }

    return (
        <>
            <Header logout={true}></Header>
            <div className="container">
                <div className="heading-container">
                    <h1 className="table-title">Transactions</h1>
                </div>
                <div className="table-container">
                    {<table>
                        <thead>
                            <tr>
                                <th>Transaction Amount</th>
                                <th>Due Date</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.repayAmount}</td>
                                    <td>{item.scheduledDate}</td>
                                    <td>{item.status}</td>
                                    <td> {item.status === "pending" ? <button className="pay-button" onClick={() => onPay(item)}>Pay</button> : "No Action"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>}
                </div>
                <Loader loading={loading}></Loader>
                <Toaster position="top-center"></Toaster>
            </div>
        </>
    );
}

export default LoanRepayment;