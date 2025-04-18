import React, { lazy, Suspense, useEffect, useState ,useCallback} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SERVER_API from "../../lib/consfig";
import axios from "axios";
import toast from "react-hot-toast";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { userExisits } from "../../redux/reducers/auth";
const Search=lazy(()=>import("../specific/Search"));
const Notifica=lazy(()=>import("../specific/Notification"))
const NewGroup=lazy(()=>import("../specific/NewGroup"));
import { useGroup,useNotification,useSearch,useMobile } from "../../redux/reducers/buttons";
import { Badge } from "@mui/material";
import {useSocket} from "../../Socket/socket.jsx";
import { useSocketEvent } from "../../hooks/hooks";
import { NEW_MESSAGE_ALRET, New_request } from "../../assets/constants/events";
import { useNotitifcationCount } from "../../redux/reducers/chat.js";
const Header=()=>
    {
      const dispatch=useDispatch();
        const navigate=useNavigate();
        const user=useSelector((state)=>state.auth.user);
       // console.log(user);
      // const socket=useSocket()
        const mobile=useSelector(state=>state.buttons.ismobile);
       const isSearch=useSelector(state=>state.buttons.search);
       const isNewGroup=useSelector(state=>state.buttons.newgroup)
       const Notification=useSelector(state=>state.buttons.notification);
       const notificationCount=useSelector(state=>state.chat.notification)
       //console.log(notificationCount)
       const isAnyModalOpen = isSearch || isNewGroup || Notification;
       const socket=useSocket();
       const newMessageAlerthandle=useCallback(()=>{},[])
        const newRequesthandler=useCallback(()=>{
          dispatch(useNotitifcationCount())
          },[dispatch])
      const eventHandlers={
      [NEW_MESSAGE_ALRET]:newMessageAlerthandle,
      [New_request]:newRequesthandler
    };
    useSocketEvent(socket,eventHandlers);
       const drawerOpen=()=>
       {
        dispatch(useMobile(!mobile));
       }
       const openSearch = () => {
        if (!isAnyModalOpen || isSearch) {
          dispatch(useSearch(!isSearch));
          // Close other modals if they're open
          if (isNewGroup) dispatch(useGroup(false));
          if (Notification) dispatch(useNotification(false));
        }
      };
      const OpenNewGroup = () => {
        if (!isAnyModalOpen || isNewGroup) {
          dispatch(useGroup(!isNewGroup));
          // Close other modals if they're open
          if (isSearch) dispatch(useSearch(false));
          if (Notification) dispatch(useNotification(false));
        }
      };
      const OpenNotification = () => {
        if (!isAnyModalOpen || Notification) {
          dispatch(useNotification(!Notification));
          // Close other modals if they're open
          if (isSearch) dispatch(useSearch(false));
          if (isNewGroup) dispatch(useGroup(false));
        }
      };
                const Logouthandler=()=>
                    {
                      const id=user._id;
                       axios.get(`${SERVER_API}/api/v1/user/logout`,{withCredentials:true}).
                       then(()=>{
                        dispatch(userExisits(null));
                        toast.success(`Succesfully loged out`)
                       }).
                       catch(err=>{console.log(err);toast.error("something is fishy")});
                       socket.emit("disconnect",{id})
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
            <div className=" z-50">
            <div className=" rounded-sm">
    <nav className="flex justify-between">
      <div className="flex justify-center">
      <p className="hidden sm:block text-2xl pl-3 md:text-3xl text-black">Bujji</p>
      <button className="sm:hidden w-5 h-5 pt-1" onClick={drawerOpen}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
      <path fill="#198ae1" d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"/>
      </svg>
      </button>
      </div>
      <div className="flex gap-4 justify-center items-center">
        <button onClick={openSearch} 
                className=""
                disabled={isAnyModalOpen && !isSearch}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
</svg>
        </button>
        <button 
        onClick={OpenNewGroup} 
        className=""
        disabled={isAnyModalOpen&&!isNewGroup}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>
        </button>
        {
          notificationCount>0?(
            <Badge badgeContent={notificationCount} color="error">
              <button onClick={OpenNotification} className=""
                    disabled={isAnyModalOpen&&!Notification}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
              </svg>
              </button>
            </Badge>
          ):(
            <button onClick={OpenNotification} className=""
            disabled={isAnyModalOpen&&!Notification}>
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
              </svg>
             </button>
          )
        }
        <button onClick={navigationGroup} className=""
        disabled={isAnyModalOpen}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
</svg>
    </button>
        <button>
        <DropdownButton id="dropdown-basic-button" title="Memu">
          <Dropdown.Item href="#/action-1" onClick={Logouthandler}>Logout</Dropdown.Item>
        </DropdownButton>
        </button>
      </div>
    </nav>
    </div>
    {
      isSearch&&(
        <Suspense fallback={<div className="h-screen bg-slate-600"></div>}>
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