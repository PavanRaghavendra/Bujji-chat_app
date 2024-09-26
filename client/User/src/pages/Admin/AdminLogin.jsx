import { useInputValidation } from "6pp";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
const isAdmin=false;
const AdminLogin = () => {
    const secretkey=useInputValidation("")
    const submitHanlder=(e)=>
        {
            e.preventDefault();
            console.log("submit");
        };
        if (isAdmin) return <Navigate to="/admin/dashboard"/>
    return(
        <>
        <div class="outline" className=" flex justify-center items-center h-screen bg-gradient-to-b from-indigo-500 to-purple-500">
            <div class="outine-2" className="shadow-xl bg-white p-20 rounded-lg">
                {
                    (
                        <form className="flex flex-col justify-center items-center" onSubmit={submitHanlder}>
                    <h1 className="font-serif text-3xl ">Admin Login</h1>
                    <input type="password" placeholder="password *" required className="border border-black text-xl p-2" value={secretkey.value} onChange={secretkey.changeHandler}></input>
                    {
                        secretkey.error && (
                            <p className="text-red-500 font-semibold">{secretkey.error}</p>
                        )
                    }
                    <button className="w-full rounded-sm bg-blue-500 m-4 text-xl  p-2 font-semibold text-white hover:bg-blue-400">Login</button>
                </form>
                    )
                }
            </div>
        </div>
        </>
      )
}

export default AdminLogin