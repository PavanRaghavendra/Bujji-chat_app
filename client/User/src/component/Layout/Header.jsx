import React, { lazy, Suspense, useState } from "react";
import { useNavigate } from "react-router-dom";
const Search=lazy(()=>import("../specific/Search"));
const Notifica=lazy(()=>import("../specific/Notification"))
const NewGroup=lazy(()=>import("../specific/NewGroup"))
const Header=()=>
    {
        const navigate=useNavigate();
        const [isSearch,setIsSearch]=useState(false);
        const[isNewGroup,setNewGroup]=useState(false);
        const[Notification,setNotification]=useState(false);
        const [isDropdownOpen,setIsDropdownOpen]=useState(false);
        const openSearch=()=>
            {
                setIsSearch((prev)=> !prev);
            };
            const OpenNewGroup=()=>
                {
                    setNewGroup((prev)=>!prev)
                };
                const Logouthandler=()=>
                    {
                        console.log("Logout");
                    };
            const OpenNotification=()=>
                {
                    setNotification((prev)=>!prev);
                };
                const navigationGroup=()=>
                    {
                    navigate("/groups");
                    }
                    const toggleDropdown = () => {
                      setIsDropdownOpen((prev)=>!prev);
                    };
        return(
            <>
            <div className="bg-slate-500 z-50">
            <div className="bg-slate-400 rounded-sm">
    <nav className="flex justify-between p-3">
      <div className="flex align-center justify-center gap-1">
      <img src="" className="w-10 rounded-full"></img>
      <p className="text-xl md:text-3xl">Bujji</p>
      </div>
      <div className="flex gap-4 justify-center items-center">
        <button onClick={openSearch} className="hidden md:block">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
</svg>
        </button>
        <button onClick={OpenNewGroup} className="hidden md:block">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>
        </button>
        <button onClick={OpenNotification} className="hidden md:block">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
</svg>
        </button>
        <button onClick={navigationGroup} className="hidden md:block">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
</svg>
    </button>
        <p className="text-white border text-2xl rounded-full w-10 h-10 flex justify-center items-center bg-orange-500"></p>
        {(window.innerWidth > 786) ? (
  <button className="font-semibold text-xl md:text-3xl" onClick={toggleDropdown}>
    User
  </button>
) : (
  <div>
  <button className="font-semibold text-xl md:text-3xl" onClick={toggleDropdown}>
    User
  </button>
  {isDropdownOpen && (
    <div className="w-48 rounded-lg shadow-xl border-2 border-solid border-black">
      {/* Dropdown menu items */}
      <ul className="py-2">
        <li className="px-4 py-2 hover:bg-gray-100">Option 1</li>
        <li className="px-4 py-2 hover:bg-gray-100">Option 2</li>
        <li className="px-4 py-2 hover:bg-gray-100">Option 3</li>
      </ul>
    </div>
  )}
  </div>
)}
      </div>
    </nav>
    </div>
    {
      isSearch&&(
        <Suspense fallback={<div className="h-screen bg-slate-600"></div>}>
          <div>
          </div>
          <Search/>
        </Suspense>
      )
    }
    {
      isNewGroup&&(
        <Suspense fallback={<div className="h-screen bg-slate-600"></div>}>
        <NewGroup/>
      </Suspense>
      )
    }
     {
      Notification&&(
        <Suspense fallback={<div className="h-screen bg-slate-600"></div>}>
        <Notifica/>
      </Suspense>
      )
    }
    </div>
   </>
)
    };
export default Header;