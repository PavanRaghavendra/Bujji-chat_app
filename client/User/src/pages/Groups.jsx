import { motion } from "framer-motion";
import React, { lazy, Suspense, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserItem from "../component/shared/UserItem";
import { useAsyncMutation, useErrors } from '../hooks/hooks';
import { useChatDetailsQuery, useGetGroupsQuery, useRemoveMembersGroupMutation, useRenameChatMutation } from "../redux/api/api";
import { setchatId, setIsadmin, setUserId, useAddmember, useDeletegroup } from "../redux/reducers/buttons";
import { Special } from "../component/shared/Special";
const ConfrimDeleteDialog=lazy(()=>import("../component/Dialog/ConfrimDeleteDialog"))
const AddMemberDialog=lazy(()=>import('../component/Dialog/AddMemberDialog'))
const Groups=({socket})=>
    {
        const navigate=useNavigate();
        const dispatch=useDispatch();
        const adminRef=useRef(null)
        const [ismobileopen,setIsmobileopen]=useState(false);
        const [isedit,setIsedit]=useState(false);
        const [groupName,setGroupName]=useState("");
        const [groupNameupdated,setgroupNameupdated]=useState("");
        const conformDelete=useSelector(state=>state.buttons.deletegroup)
        const [groupSelect,setGroupSelect]=useState("");
        const addmemberOpen=useSelector(state=>state.buttons.IsaddMember)
        const group=useGetGroupsQuery("");
        const [renameGroup,renameIsloading]=useAsyncMutation(useRenameChatMutation)
        const [removeMembersGroup,removeMembersGroupIsLoading]=useAsyncMutation(useRemoveMembersGroupMutation)
        const getChatDetails=useChatDetailsQuery({chatId:groupSelect,populate:true},{skip:groupSelect===""});
        const Members=getChatDetails?.data?.chat?.Members;
        const admin=getChatDetails?.data?.chat?.admin;
        const [SelectedMember,setSelectedMembers]=useState([]);
        useErrors([{isError:group.isError,error:group.error}]);
        const navigateback=()=>
            {
                navigate("/");
            };
        const handlemobile=()=>
                {
                    setIsmobileopen((prev)=>!prev)
                };
        const updateGroupName=(e)=>
                    {
                       // console.log("into the ")
                       if(groupName===groupNameupdated)
                            return toast.error("change name to update")
                        if(groupNameupdated.length<0)
                        {
                            return toast.error("Please enter the Group Name")
                        }
                        setIsedit((prev)=>!prev);
                        setGroupName(groupNameupdated);
                        const name=groupNameupdated;
                        const chatId=groupSelect;
                        renameGroup("updating groupname...",{chatId,name})
                    };
        const handledelete=()=>
            {
                dispatch(useDeletegroup(true))
            };
        const addmember=()=>
                {
                    dispatch(useAddmember(true));
                };
        const editHandle=()=>
                {
                    setIsedit((prev)=>!prev)
                }
        const SelectGroup=({name,_id})=>
                {
                    if(ismobileopen)
                        setIsmobileopen((prev)=>!prev)
                    setGroupSelect(_id);
                   // console.log(groupSelect)
                    setGroupName(name);
                    setgroupNameupdated(name)
                    //console.log(groupName)
                }
        const DeSelectGroup=()=>
                {
                    setGroupSelect("");
                    setGroupName("");
                    setgroupNameupdated("")
                    setSelectedMembers([])
                }
        const GroupList=({name,key,_id,index})=>
                    {
                        return(
                            <>
                                <div className="text-white sm:text-xl m-2">
                                    {
                                    groupSelect===_id.toString()?(
                                        <button onClick={(e)=>DeSelectGroup({name,_id})} className="bg-indigo-800 border-2 border-indigo-800 p-1 rounded-sm hover:bg-indigo-600 hover:shadow-xl">{name}</button>
                                    ):(
                                        <button onClick={(e)=>SelectGroup({name,_id})} className="bg-indigo-600 border-2 border-indigo-600 p-1 rounded-sm hover:bg-indigo-800 hover:shadow-xl">{name}</button>
                                    )
                                }
                                    <hr></hr>
                                </div>
                            </>
                        )
                    }
        const SelectRemove=(id)=>
                {
                    const index=SelectedMember.indexOf(id);
                    if(index!==-1)
                    {
                        setSelectedMembers((prev)=>
                        {
                            const newMembers=prev.filter(i=>i!==id);
                            return newMembers;
                        })
                    }
                    else
                    {
                        setSelectedMembers((prev)=>[...prev,id])
                    }
                }
        const removeMembers=()=>
                {
                    if(SelectedMember.length<1)
                        return toast.error("select Memebers to remove");
                    if(Members.length-SelectedMember.length<3)
                        return toast.error("Group must contains more than 2 instead remove group")
                    removeMembersGroup("..removing Members",{chatId:groupSelect,Members:SelectedMember})

                }
        const handleClick=(e,_id)=>{
            e.preventDefault(),
            dispatch(setIsadmin(true))
            dispatch(setUserId({userId:_id,chatId:groupSelect}))
            adminRef.current=e.currentTarget;
        }
        return(
            <>
            {group.isLoading||getChatDetails.isLoading||removeMembersGroupIsLoading?(<></>):(
                 <div className="flex h-screen">
                    {
                        group.data?.groups.length===0?(<div className="shadow-2xl w-1/2 text-center bg-indigo-400">
                            NO Groups...
                        </div>):(
                            ismobileopen?(<div className="sm:hidden shadow-2xl w-1/2 sm:w-full text-center bg-indigo-400">
                            {
                                 group?.data?.groups.map((item,index) => (
                                    <GroupList name={item.name} key={item._id} _id={item._id} index={index}/>
                                  ))
                            }
                         </div>):(<div className="hidden sm:block w-96 bg-indigo-400 text-center">
             {
             group?.data?.groups.map((item,index) => (
                <GroupList name={item.name} key={item._id} _id={item._id} index={index}/>
              ))
         }
         </div>))
                    }
                    
                 <div className="bg-indigo-100 p-2  w-full">
                    <div className="flex h-fit w-full justify-between">
                    <button onClick={navigateback} className="w-fit h-fit p-2 text-white border-2 border-solid rounded-sm bg-black hover:opacity-50">
                                     Home
                        </button>
                    <button onClick={handlemobile} className="text-white h-fit  sm:hidden border-2 border-solid rounded-full bg-black hover:opacity-50 w-fit">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8 p-1">
                             <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
                                </button>
                    </div>
                         {
                           groupSelect&&(
                                <div className="flex flex-col justify-center">
                                <div className="flex justify-center gap-2">
                                {
                                    isedit ? (
                                        <>
                                        <div className="flex flex-row justify-center">
                                            <input onChange={(e)=>setgroupNameupdated(e.target.value)} type="text" value={groupNameupdated} className="border-2 border-black"/>
                                            <button onClick={(e)=>updateGroupName(e)} disabled={renameIsloading}  className="p-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                            </svg>
                                            </button>
                                            <button onClick={()=>setIsedit((prev)=>!prev)}>close</button>
                                        </div>
                                        </>
                                    ):(
                                        <>
                                        <div className="flex gap-2 justify-center">
                                         <p className="text-2xl pt-1">{groupName}</p>
                                         <button onClick={(e)=>editHandle()}disabled={renameIsloading} >
                                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5">
                                          <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                          </svg>
                                         </button>
                                         </div>
                                        </>
                                    )
                                }
                                 <button onClick={()=>DeSelectGroup()} className="border-2 text-md p-2 rounded-sm text-white border-indigo-600 bg-indigo-600 hover:bg-indigo-800">
                                                back
                                        </button>
                                </div>
                                <div>
                                    {
                                         (
                                            <div>
                                                <p className="text-xl font-semibold">Memebers</p>
                                                <div className="sm:p-4 md:pt-4 md:pb-4 md:pl-12 md:pr-12 max-w-2xl w-full h-screen/2 overflow-auto border-2 border-black">
                                                {
                                                   Members.length > 0 ? (
                                                 Members.map((i) => (
                                                    <div key={i._id} className="border-2 border-solid border-black m-3" onContextMenu={(e)=>handleClick(e,i._id)}>
                                                                <UserItem key={i._id} user={i} handlerIsLoading={group.isLoading} handler={SelectRemove} isAdded={SelectedMember.indexOf(i._id)===-1} admin={admin.includes(i._id)}/>
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
                                                    <button onClick={handledelete} className="border-2 border-indigo-600 bg-indigo-600 text-white w-fit p-2 rounded-md hover:bg-indigo-400">Delete Group</button>
                                                    <button onClick={removeMembers} className="border-2 border-indigo-600 bg-indigo-600 text-white w-fit p-2 rounded-md hover:bg-indigo-400">Remove Members</button>
                                                </div>
                                            </div>
                                        )
                                    }
                                    {
                                        conformDelete && <Suspense fallback={<div>..Loading</div>}>
                                            <ConfrimDeleteDialog chatId={groupSelect}/>
                                        </Suspense>
                                    }
                                    {
                                        addmemberOpen&&<Suspense>
                                            <AddMemberDialog chatId={groupSelect}/>
                                        </Suspense>
                                    }
                                    {
                                        <Special  anchorTag={adminRef} admin={getChatDetails?.data?.chat?.admin}/>
                                    }
                                </div>
                            </div>
                            )
                         }
                 </div>
                 </div>
            )}
            </>
        )
    };

export default Groups;