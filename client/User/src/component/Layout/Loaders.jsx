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
export default Loader;