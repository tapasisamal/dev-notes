import React from "react";
import {login as authLogin} from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import Input from "./Input";
import Button from "./Button";

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [error, setError] = useState("")
    const {register, handleSubmit, formState: { isSubmitting }} = useForm()

    const login = async(data) => {
        setError("")
        try{
            const session = await authService.login(data)
            if(session) {
                const userData = await authService.getUser()
                if(userData) dispatch(authLogin({userData}))
                navigate("/")
            }
        } catch(error) {
            setError(error.message)
        }
    }
    return(
        <div className="flex items-center justify-center w-full"> 

            <form onSubmit={handleSubmit(login)}
            className="w-full max-w-md space-y-4"
            >
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>} 
                
                <Input
                label="Email :"
                placeholder="Enter your email"
                type="email"
                {...register("email", {required: true})}
                />

                <Input
                label="Password :"
                placeholder="Enter your password"
                type="password"
                {...register("password", {required: true})}
                />

                <Button 
                type="submit"
                className="w-full"
                disabled={isSubmitting}
                >
                    Sign in
                </Button>
            </form>
        </div>
    )
}

export default Login