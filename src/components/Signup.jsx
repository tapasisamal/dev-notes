import React from "react";
import { useNavigate } from "react-router-dom";
import {login as authLogin} from "../store/authSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import Input from "./Input";
import Button from "./Button";

function Signup() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [error, setError] = useState("")
    const {register, handleSubmit, formState: { isSubmitting }} = useForm()

    const signup = async(data) => {
        setError("")
        try{
            const account = await authService.createAccount(data)
            if (account) {
            // LOGIN AFTER SIGNUP
            const session = await authService.login({
                email: data.email,
                password: data.password
            })

            if (session) {
                const userData = await authService.getUser()
                if (userData) dispatch(authLogin({ userData }))
                navigate("/home")
            }
        }
        } catch(error) {
            setError(error.message)
        }
    }
    return(
        <div className="flex items-center justify-center w-full mt-10"> 

            <form onSubmit={handleSubmit(signup)}
            className="w-full max-w-md space-y-4"
            >
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                
                <Input
                label="Name :"
                placeholder="Enter your name"
                {...register("name", {required: true})}
                />

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
                    Create Account
                </Button>
            </form>
        </div>
    )
}

export default Signup