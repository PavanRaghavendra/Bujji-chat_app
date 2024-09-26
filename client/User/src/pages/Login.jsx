import { useInputValidation } from "6pp";
import React, { useState } from "react"
import { Link } from "react-router-dom";
import { usernamevalidator} from "../utils/validators";
import { useStrongPassword } from "6pp";
 function Login() {
    const [islogin,setlogin]=useState(true);
    const username=useInputValidation("",usernamevalidator);
    const password=useStrongPassword("",);
    const name=useInputValidation("");
    const bio=useInputValidation("");
    const tooglelogin=()=>
    {
        setlogin((islogin)=>!islogin)
    }
  return(
    <>
    <div class="outline" className=" flex justify-center items-center h-screen bg-gradient-to-b from-indigo-500 to-purple-500">
        <div class="outine-2" className="shadow-xl bg-white p-20 rounded-lg">
            {
                islogin?(
                    <form className="flex flex-col justify-center items-center">
                <h1 className="font-serif text-3xl ">Login</h1>
                <input type="text" placeholder="username *" required className="border border-black text-xl m-3 p-2" value={username.value} onChange={username.changeHandler}></input>
                {
                    username.error && (
                        <p className="text-red-500 font-semibold">{username.error}</p>
                    )
                }
                <input type="password" placeholder="password *" required className="border border-black text-xl p-2" value={password.value} onChange={password.changeHandler}></input>
                {
                    password.error && (
                        <p className="text-red-500 font-semibold">{password.error}</p>
                    )
                }
                <button className="rounded-sm bg-blue-500 m-4 text-xl  p-2 font-semibold text-white hover:bg-blue-400">Login</button>
                <p>or</p>
                <button className="text-blue-500 text-xl hover:text-blue-300" onClick={tooglelogin}>sign up required</button>
            </form>
                ):(
                    <form className="flex flex-col justify-center items-center">
                <h1 className="font-serif text-3xl ">Signup</h1>
                <input type="password" placeholder="Name *" required className="border border-black text-xl mt-3 p-2" value={name.value} onChange={name.changeHandler}></input>
                <input type="text" placeholder="username *" required className="border border-black text-xl m-3 p-2" value={username.value} onChange={username.changeHandler}></input>
                {
                    username.error && (
                        <p className="text-red-500 font-semibold">{username.error}</p>
                    )
                }
                <input type="password" placeholder="password *" required className="border border-black text-xl m-3 p-2" value={password.value} onChange={password.changeHandler}></input>
                {
                    password.error && (
                        <p className="text-red-500 font-semibold">{password.error}</p>
                    )
                }
                <input type="password" placeholder="Bio *" required className="border border-black text-xl p-2" value={bio.value} onChange={bio.changeHandler}></input>
                <button className="rounded-sm bg-blue-500 m-4 text-xl  p-2 font-semibold text-white hover:bg-blue-400">SIGN UP</button>
                <p>or</p>
                <button className="text-blue-500 text-xl hover:text-blue-300" onClick={tooglelogin}>Login Instead</button>
            </form>
                )
            }
        </div>
    </div>
    </>
  )
}
export default Login;