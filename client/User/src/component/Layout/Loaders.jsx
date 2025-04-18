import React from "react";
const Loader=()=>
    {
        return (
            <>
            <div className="h-10 bg-slate-300 rounded shadow-md"></div>
             <div className="grid grid-flow-col h-screen animate-pulse gap-3">
  <div className="bg-slate-300 hidden sm:block sm:col-span-4 md:col-span-3 rounded shadow-2xl"></div>
  <div className="bg-slate-300 col-span-12 sm:col-span-8 md:col-span-5 lg:col-span-6 rounded shadow-2xl"></div>
  <div className="bg-slate-300 hidden md:block md:col-span-4 lg:col-span-3 p-2 rounded shadow-2xl"></div>
</div>
            </>
        )
    };
const ChatLoader=()=>
{
    return(<>
    <div className="grid grid-flow-col h-full">
        <div className="w-full h-12 bg-slate-400 shadow-xl"></div>
        <div className="w-full h-12 bg-slate-400 shadow-xl"></div>
        <div className="w-full h-12 bg-slate-400 shadow-xl"></div>
        <div className="w-full h-12 bg-slate-400 shadow-xl"></div>
        <div className="w-full h-12 bg-slate-400 shadow-xl"></div>
        <div className="w-full h-12 bg-slate-400 shadow-xl"></div>
        <div className="w-full h-12 bg-slate-400 shadow-xl"></div>
        <div className="w-full h-12 bg-slate-400 shadow-xl"></div>
        <div className="w-full h-12 bg-slate-400 shadow-xl"></div>
        <div className="w-full h-12 bg-slate-400 shadow-xl"></div>
    </div>
    </>)
}
const TypingLoader=()=>
{
    return (
        <div className="flex items-center text-gray-500 text-sm p-2">
          <div className="mr-2 animate-pulse" style={{animationDelay:'0ms'}}>typing</div>
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" 
                 style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" 
                 style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" 
                 style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      );
}
export {Loader,ChatLoader,TypingLoader};
export default Loader;