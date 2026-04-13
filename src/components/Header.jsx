import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoutBtn from "./LogoutBtn";

function Header() {
    const authStatus = useSelector((state) => state.auth.status);

    return (
        <header className="w-full bg-gray-800 text-white p-4">
            <div className="flex justify-between items-center max-w-5xl mx-auto">

                <h1 className="text-xl font-bold">
                    <Link to="/home">DevNotes</Link>
                </h1>

                <div className="flex gap-4 items-center">

                    {authStatus && (
                        <>
                            <Link to="/home">Home</Link>
                            <Link to="/add-note">Add Note</Link>
                            <LogoutBtn />
                        </>
                    )}

                    {!authStatus && (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/signup">Signup</Link>
                        </>
                    )}

                </div>
            </div>
        </header>
    );
}

export default Header;