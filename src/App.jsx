import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Protected from "./components/AuthLayout";
import Home from "./pages/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AddNote from "./pages/AddNotes";
import EditNote from "./pages/EditNote";
import Note from "./pages/Note";
import Welcome from "./components/Welcome.jsx";
import { login, logout } from "./store/authSlice.js";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import authService from "./appwrite/auth";

function App() {

    const dispatch = useDispatch();
    const location = useLocation();
    
    useEffect(() => {
        authService.getUser()
        .then((userData) => {
            if(userData) {
                dispatch(login({ userData }))
            } else {
                dispatch(logout())
            }
        })
    }, []);

    return (
        <>
            {/* Header hidden only on Welcome page */}
            {location.pathname !== "/" && <Header />}

            <Routes>

                <Route path="/" element={<Welcome />} />

                {/* Protected Routes (only logged in users) */}
                <Route
                    path="/home"
                    element={
                        <Protected>
                            <Home />
                        </Protected>
                    }
                />

                <Route
                    path="/add-note"
                    element={
                        <Protected>
                            <AddNote />
                        </Protected>
                    }
                />

                <Route
                    path="/edit-note/:id"
                    element={
                        <Protected>
                            <EditNote />
                        </Protected>
                    }
                />

                <Route
                    path="/note/:id"
                    element={
                        <Protected>
                            <Note />
                        </Protected>
                    }
                />

                {/* Public Routes (only logged out users) */}
                <Route
                    path="/login"
                    element={
                        <Protected authentication={false}>
                            <Login />
                        </Protected>
                    }
                />

                <Route
                    path="/signup"
                    element={
                        <Protected authentication={false}>
                            <Signup />
                        </Protected>
                    }
                />

            </Routes>
        </>
    );
}

export default App;