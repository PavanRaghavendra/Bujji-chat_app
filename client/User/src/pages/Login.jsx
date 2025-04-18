import { useInputValidation } from "6pp";
import React, { useState } from "react"
import axios from "axios";
import SERVER_API from "../lib/consfig"
import {toast} from 'react-hot-toast';
import { useStrongPassword } from "6pp";
//import { useAppDispatch } from "../redux/hooks";
import { userExisits } from "../redux/reducers/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
 function Login() {
    const [islogin,setlogin]=useState(true);
    const [isLoading,setLoading]=useState(false)
    const username=useInputValidation("");
    const password=useStrongPassword("");
    const name=useInputValidation("");
    const bio=useInputValidation("");
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const handlelogin=async (e)=>
    {
        e.preventDefault();
        try{
            const {data}=await axios.post(`${SERVER_API}/api/v1/user/login`,{
            
                    username:username.value,
                    password:password.value
        },{withCredentials:true,Headers:{
            "Contetn-type":"application/json"
        }})
        dispatch(userExisits(data.message));
        toast.success(`successfully login ${data.message.name}`);
        }
        catch(err)
        {;
            toast.error(err?.response?.data?.msg||"something went wrong");
        }
    };
    const handleSignup=async (e)=>
    {
        e.preventDefault();
        setLoading(true)
        try{
            console.log("into sign up")
            const {data}=   await axios.post(`${SERVER_API}/api/v1/user/new`,{
                name:name.value,
                username:username.value,
                password:password.value,
                bio:bio.value
        },{withCredentials:true,Headers:{
            "Contetn-type":"application/json"
        }}
        )
        toast.success('Operation successful!');
        navigate("/");
        }
        catch(err)
        {
            console.log(err);
            try {
                toast.error('Operation failed');
              } catch (error) {
                console.log('Toast error:', error);
              }
        }
        finally
        {
            setLoading(false)
        }
    };
    const tooglelogin=()=>
    {
        setlogin((islogin)=>!islogin)
    }
  return(
    <>
    <div class="outline" className=" flex justify-center items-center h-screen bg-black">
        <div class="outine-2" className="shadow-xl bg-slate-600 p-20 rounded-lg">
            {
                islogin?(
                    <form className="flex flex-col justify-center items-center rounded-sm">
                <h1 className="font-serif text-3xl text-white">Login</h1>
                <input type="text" placeholder="username *" required className="border  border- rounded-md text-xl m-3 p-2" value={username.value} onChange={username.changeHandler}></input>
                {
                    username.error && (
                        <p className="text-red-500 font-semibold">{username.error}</p>
                    )
                }
                <input type="password" placeholder="password *" required className="border  rounded-md text-xl p-2" value={password.value} onChange={password.changeHandler}></input>
                {
                    password.error && (
                        <p className="text-red-500 font-semibold">{password.error}</p>
                    )
                }
               <button disabled={isLoading} className="rounded-md bg-blue-500 m-4 text-xl  p-2 font-semibold text-white hover:bg-blue-400"
            onClick={handlelogin}
            >Login</button>
                <p className="text-xl text-white">or</p>
                <button disabled={isLoading} className="text-blue-500 ml-4 mt-4 text-xl hover:text-blue-300" onClick={tooglelogin}>sign up required</button>
            </form>
                ):(
                    <form className="flex flex-col justify-center items-center">
                <h1 className="font-serif text-3xl text-white">Signup</h1>
                <input type="text" placeholder="Name *" required className="border rounded-sm text-xl mt-3 p-2" value={name.value} onChange={name.changeHandler}></input>
                <input type="text" placeholder="username *" required className="border rounded-sm text-xl mt-3 p-2" value={username.value} onChange={username.changeHandler}></input>
                {
                    username.error && (
                        <p className="text-red-500 font-semibold">{username.error}</p>
                    )
                }
                <input type="password" placeholder="password *" required className="border rounded-sm text-xl m-3 p-2" value={password.value} onChange={password.changeHandler}></input>
                {
                    password.error && (
                        <p className="text-red-500 font-semibold">{password.error}</p>
                    )
                }
                <button disabled={isLoading} className="rounded-sm bg-blue-500 m-4 text-xl  p-2 font-semibold text-white hover:bg-blue-400"
                onClick={handleSignup}
                >SIGN UP</button>
                <p className="text-xl text-white">or</p>
                <button disabled={isLoading} className="text-blue-500 text-xl hover:text-blue-300 mt-3 ml-3" onClick={tooglelogin}>Login Instead</button>
            </form>
                )
            }
        </div>
    </div>
    </>
  )
}
export default Login;