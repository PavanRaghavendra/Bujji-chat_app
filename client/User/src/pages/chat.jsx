import { useRef } from "react";
import React from "react";
import { sampleMessage } from "../assets/constants/sampleData";
import MessageComponent from "../component/shared/MessageComponent";
const Chat=()=>
{
    const containerRef=useRef(null);
    const user={
        _id:3456,
        name:"Pavan"
    }
    return(
    <>
    <div className="bg-slate-200 h-full flex flex-col justify-between text-black">
        <div>
        {
            sampleMessage.map((i) => (
                <MessageComponent key={i._id}message={i} User={user} />
              ))
        }
        </div>
        <div className="border-2 border-solid border-white rounded-full shadow-xl bg-white">
        <form className="border-2 border-solid">
            <div className=" flex justify-evenly gap-2">
                <button className="">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
  <path strokeLinecap="round" strokeLinejoin="round" d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13" />
</svg>
                </button>
                <input type="text" placeholder="Text your message" className="w-full border-black border-solid border-2 rounded-lg"/>
                <button className="hover:bg-blue-500 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 hover:bg-blue-500">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
</svg>
                </button>
            </div>
        </form>
        </div>
        </div>
    </>
    )
}
export default Chat;