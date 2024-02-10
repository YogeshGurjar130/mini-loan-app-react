import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiPost } from "../utils/apis";
import { loginUrl } from "../utils/urls";
import Header from "./Header";
import Loader from "./Loader";

const Login = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const onChangeEmail = (e) => {
        setEmail(e.target.value)
        setErrorMessage("")
    }
    const onChangePassword = (e) => {
        setPassword(e.target.value)
        setErrorMessage("")
    }

    const onSubmit = async () => {
        if (email === "") {
            setErrorMessage("Please Enter Email")
        } else if (password === "") {
            setErrorMessage("Please Enter Password")
        } else {
            setLoading(true);
            try {
                const response = await apiPost(loginUrl, { email: email, password: password }, {});
                if (response?.email) {
                    console.log(response)
                    sessionStorage.setItem('user', JSON.stringify(response));
                    if (response?.role === "admin") {
                        setLoading(false);
                        navigate("/pendingLoans")
                    } else {
                        setLoading(false);
                        navigate("/loans", { state: { email: response?.email } });
                    }
                } else {
                    setLoading(false);
                    setErrorMessage(response)
                }
            } catch (error) {
                setLoading(false);
                setErrorMessage(error.message)
            }


        }
    }

    const onSignup = () => {
        navigate("/signup")
    }

    return (
        <>
            <Header logout={false}></Header>
            <div className="container">

                <h2>Sign-In</h2>
                <div className="form-container">
                    <label className="label">Email</label>
                    <input className="input-field" type="text" placeholder="Email" value={email} onChange={onChangeEmail}></input>
                    <label className="label" style={{ marginTop: "15px" }}>Password</label>
                    <input className="input-field" type="password" placeholder="Password" value={password} onChange={onChangePassword}></input>
                    <div className="button-container">
                        <button className="login-button" onClick={onSubmit}>Login</button>
                    </div>
                    <div className="message-container">
                        <span className="errorMessage">{errorMessage}</span>
                    </div>
                    <div>
                        <span className="info-text">Don't have account ?</span> <button className="signup-button" onClick={onSignup}>Signup</button>
                    </div>
                </div>
                <Loader loading={loading}></Loader>
            </div>
        </>
    );
}

export default Login;