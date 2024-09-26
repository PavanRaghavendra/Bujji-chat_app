import React, { Suspense, useState,lazy } from "react";
import { useNavigate } from "react-router-dom";
const ConfrimDeleteDialog=lazy(()=>import("../component/Dialog/ConfrimDeleteDialog"))
const isAddmember=false;
const AddMemberDialog=lazy(()=>import('../component/Dialog/AddMemberDialog'))
import { sampleUser } from "../assets/constants/sampleData";
import UserItem from "../component/shared/UserItem";
const Groups=()=>
    {
        const navigate=useNavigate();
        const [ismobileopen,setIsmobileopen]=useState(false);
        const [isedit,setIsedit]=useState(false);
        const [groupName,setGroupName]=useState("Group Name");
        const [groupNameupdated,setgroupNameupdated]=useState("");
        const [ConfirmDeleteDialog,setConfirmDeleteDialog]=useState(false);
        const navigateback=()=>
            {
                navigate("/");
            };
            const handlemobile=()=>
                {
                    setIsmobileopen((prev)=>!prev)
                };
                const updateGroupName=()=>
                    {
                        setIsedit((prev)=>!prev);
                        setGroupName(groupNameupdated);
                    };
        const confirmdelete=()=>
            {
                setConfirmDeleteDialog(true);
            };
            const addmember=()=>
                {
                    setConfirmDeleteDialog(false);
                };
        return(
            <>
            <div className="flex h-screen">
            <div className="hidden sm:block w-96 bg-indigo-400 text-center">
                <p>Group List</p>
            </div>
            <div className="bg-indigo-100 p-2 flex w-full">
                       { ismobileopen&&(
                            <div className="sm:hidden shadow-2xl w-1/2 sm:w-full text-center">
                               <p>grouplist</p>
                            </div>
                        )
                    }
                <div className="flex flex-col w-full">
                    <div className="flex justify-evenly sm:justify-between">
                    <button onClick={navigateback} className="text-white border-2 border-solid rounded-full bg-black hover:opacity-50">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8 p-1">
  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" /></svg>
                    </button>
                    {
                        isedit ? (
                            <>
                            <div className="flex ">
                                <input onChange={(e)=>setgroupNameupdated(e.target.value)} type="text" className="border-2 border-black"/>
                                <button onClick={updateGroupName}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="size-7">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                </button>
                            </div>
                            </>
                        ):(
                            <>
                            <div className="flex sm:mr-12">
                             <p className="text-2xl">{groupName}</p>
                             <button onClick={()=>setIsedit((prev)=>!prev)}>
                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="size-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                              </svg>
                             </button>
                             </div>
                            </>
                        )
                    }
                    <button onClick={handlemobile} className="text-white  sm:hidden border-2 border-solid rounded-full bg-black hover:opacity-50 w-fit">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8 p-1">
  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
                    </button>
                    </div>
                    <div className="mt-4">
                        {
                            groupName && (
                                <div>
                                    <p>Memebers</p>
                                    <div className="sm:p-4 md:pt-4 md:pb-4 md:pl-12 md:pr-12 max-w-2xl w-full h-screen/2 overflow-auto text-white bg-neutral-300">
                                    {
                                       sampleUser.length > 0 ? (
                                     sampleUser.map((i) => (
                                        <div className="border-2 border-solid m-3">
                                       <UserItem key={i._id} user={i}/>
                                       </div>
                                      ))
                                     ) : (
                                       <div>
                                         <p>No frined</p>
                                       </div>
                                     )
                                   }
                                    </div>
                                    <div className="flex flex-col sm:flex-row items-center m-3 gap-3">
                                        <button onClick={addmember} className=" border-2 border-indigo-600 bg-indigo-600 text-white w-fit p-2 rounded-md hover:bg-indigo-400"> Add Member</button>
                                        <button onClick={confirmdelete} className="border-2 border-indigo-600 bg-indigo-600 text-white w-fit p-2 rounded-md hover:bg-indigo-400">Delete Group</button>
                                    </div>
                                </div>
                            )
                        }
                        {
                            ConfirmDeleteDialog && <Suspense fallback={<div>..Loading</div>}>
                                <ConfrimDeleteDialog   handleclose={addmember}/>
                            </Suspense>
                        }
                        {
                            isAddmember&&<Suspense>
                                <AddMemberDialog/>
                            </Suspense>
                        }
                    </div>
                </div>
            </div>
            </div>
            </>
        )
    };
export default Groups;