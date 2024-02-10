import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiPost } from "../utils/apis";
import { signupUrl } from "../utils/urls";
import Header from "./Header";
import Loader from "./Loader";

const Signup = () => {

    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false)

    const onChangeName = (e) => {
        setName(e.target.value)
        setErrorMessage("")
    }
    const onChangeEmail = (e) => {
        setEmail(e.target.value)
        setErrorMessage("")
    }
    const onChangePassword = (e) => {
        setPassword(e.target.value)
        setErrorMessage("")
    }

    const onSubmit = async () => {
        if (name === "") {
            setErrorMessage("Please Enter Name")
        }
        else if (email === "") {
            setErrorMessage("Please Enter Email")
        }
        else if (password == "") {
            setErrorMessage("Please Enter Password")
        }
        else {
            setLoading(true)
            try {
                const response = await apiPost(signupUrl, { name: name, email: email, password: password }, {});
                if (response === "Customer Registered Successfully") {
                    console.log(response)
                    setLoading(false)
                    navigate("/")
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
            <Header logout={false}></Header>
            <div className="container">
                <h2>Sign-Up</h2>
                <div className="form-container">
                    <label className="label">Name</label>
                    <input className="input-field" type="text" placeholder="Name" value={name} onChange={onChangeName}></input>
                    <label className="label" style={{ marginTop: "15px" }}>Email</label>
                    <input className="input-field" type="text" placeholder="Email" value={email} onChange={onChangeEmail}></input>
                    <label className="label" style={{ marginTop: "15px" }}>Password</label>
                    <input className="input-field" type="text" placeholder="Password" value={password} onChange={onChangePassword}></input>
                    <div className="button-container">
                        <button className="signup-button" onClick={onSubmit}>Signup</button>
                    </div>
                    <div className="message-container">
                        <span className="errorMessage">{errorMessage}</span>
                    </div>
                </div>
                <Loader loading={loading}></Loader>
            </div>
        </>
    );
}

export default Signup;