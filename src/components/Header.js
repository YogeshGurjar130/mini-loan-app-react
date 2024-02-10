import React from 'react';
import { useNavigate } from "react-router-dom";


const Header = ({ logout }) => {
    const navigate = useNavigate();
    const onLogout = () => {
        sessionStorage.clear();
        navigate("/")
    }
    return (
        <div className="header">
            <h1 className='header-text'>Mini Loan Application</h1>
            {logout && <button className='logout-button' onClick={onLogout}>Logout</button>}
        </div>
    );
};

export default Header;