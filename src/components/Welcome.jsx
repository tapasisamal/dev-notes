import React from "react";
import { Link } from "react-router-dom";

function Welcome() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">

            <div className="text-center max-w-xl">

                {/* Title */}
                <h1 className="text-4xl font-bold mb-4 text-gray-900">
                    Welcome to DevNotes 📝
                </h1>

                {/* Subtitle */}
                <p className="text-gray-600 mb-8 text-base leading-relaxed">
                    A simple and secure place to create, manage, and organize your personal notes anytime, anywhere.
                </p>

                {/* Buttons */}
                <div className="flex justify-center gap-4">

                    <Link
                        to="/login"
                        className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
                    >
                        Login
                    </Link>

                    <Link
                        to="/signup"
                        className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 transition"
                    >
                        Sign Up
                    </Link>

                </div>

            </div>

        </div>
    );
}

export default Welcome;