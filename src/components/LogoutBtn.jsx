import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import authService from "../appwrite/auth";
import { useNavigate } from "react-router-dom";

function LogoutBtn() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await authService.delete(); 
        dispatch(logout());
        navigate("/login");
    };

    return (
        <button
            onClick={handleLogout}
            className="bg-red-500 px-3 py-1 rounded"
        >
            Logout
        </button>
    );
}

export default LogoutBtn;