import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { apiGet, apiPost } from "../utils/apis";
import { getAllPendingLoanUrl, updateLoanStatusUrl } from "../utils/urls";
import Header from "./Header";
import Loader from "./Loader";


const PendingLoans = () => {

    const navigate = useNavigate();
    const [pendingLoan, setPendingLoan] = useState([]);
    const [loading, setLoading] = useState(false);
    const [reload, setReload] = useState(false);

    useEffect(() => {

        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await apiGet(getAllPendingLoanUrl, {}, {});
                console.log(typeof (response))
                if (response?.[0]?.amount || typeof (response) === "object") {
                    setLoading(false);
                    setPendingLoan(response);
                } else {
                    setLoading(false);
                    toast.error(response)
                }
            } catch (error) {
                setLoading(false);
                toast.error(error.message);
            }
        }

        const user = sessionStorage.getItem("user");
        const parsedUser = JSON.parse(user);
        console.log(parsedUser);

        if (user === null || parsedUser?.role === "customer") {
            navigate("/")
        } else {
            fetchData();
        }

    }, [reload]);

    const onApprove = async (referenceId) => {
        setLoading(true);
        try {
            const response = await apiPost(`${updateLoanStatusUrl}?referenceId=${referenceId}`, {}, {});
            if (response === "Loan Approved") {
                console.log(response)
                setLoading(false);
                toast.success(response);
                setReload(!reload);
            } else {
                setLoading(false);
                toast.error(response)
            }
        } catch (error) {
            setLoading(false);
            toast.error(error.message);
        }
    }

    return (
        <>
            <Header logout={true}></Header>
            <div className="container">
                <div className="heading-container">
                    <h1 className="table-title">Pending Loans</h1>
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
                        {pendingLoan.length !== 0 ? <tbody>
                            {pendingLoan.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.amount}</td>
                                    <td>{item.createdDate}</td>
                                    <td>{item.status}</td>
                                    <td> <button className="approve-button" onClick={() => onApprove(item.referenceId)}>Approve</button></td>
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

export default PendingLoans;