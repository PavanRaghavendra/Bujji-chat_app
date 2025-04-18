import { memo, useEffect } from "react";
import React from "react";
import toast from 'react-hot-toast'
import { sampleNotification } from "../../assets/constants/sampleData";
import { useDispatch,useSelector } from "react-redux";
import { useNotification } from "../../redux/reducers/buttons";
import { useAcceptRequestMutation, useGetnotificationQuery } from "../../redux/api/api";
import { useErrors,useAsyncMutation} from "../../hooks/hooks";
import {Loader} from 'rsuite'
import { useReducenotificationCount } from "../../redux/reducers/chat";
const Notification=()=>
    {
        const dispatch=useDispatch();
        const {isError,error,data,isLoading}=useGetnotificationQuery();
        useErrors([{isError,error}])
        const notifications=data?.AllNotifications;
        const [acceptRequest,isLoadingRequest]=useAsyncMutation(useAcceptRequestMutation);
        const friendRequestHandler=async ({_id,accept})=>
            {
                handleClose()
                await acceptRequest("Accepting...",{requestId:_id,accept});
            }
            const isnotify=useSelector(state=>state.buttons.notification);
            const handleClose=()=>
            {
                dispatch(useNotification(!isnotify));
            }
            const NotificationItem=(({sender,_id,handler,key})=>
                {
                    const name=sender
                    return <>
                      <div className="flex flex-col">
                <div className="flex gap-2 m-2 justify-between items-center">
                    {
                        (window.innerWidth>786)?
                        (
                            <p>{name} <span className="text-sm">sent you a friend request</span></p>
                        ):(
                            <p>{name}...</p>
                        )
                    }
                    <div className="flex gap-2">
                        <button onClick={()=>{
                            handler({_id,accept:true})
                            handleClose()
                            }} className=" text-blue-600  hover:rounded-sm hover:p-2 hover:bg-blue-500 hover:border-blue-500 hover:text-white">Accept</button>
                        <button onClick={()=>{
                            handler({_id,accept:false})
                            handleClose()
                            }} className="text-red-600  hover:border-red-600 hover:rounded-sm hover:p-2 hover:bg-red-500 hover:text-white">Reject</button>
                    </div>
                </div>
                </div>
                    </>
                });
        return (
            <>
            {
            <div className="flex items-center justify-center">
          <dialog open className=" fixed inset-0 border-black border-2 p-3 text-center md:text-2xl">
            <div className="p-2">
            <div className="flex justify-between">
             <p className="font-semibold">Notification</p>
             <button onClick={handleClose}>close</button>
             </div>
             {
              isLoading?(<Loader/>):(
                notifications.length>0?(
                    <div className="text-center">
                        {
                        notifications.map(({senderName,requestId,senderId})=>
                        (
                            <NotificationItem 
                            sender={senderName}
                            _id={requestId} 
                            handler={friendRequestHandler} 
                            key={senderId}/>
                        ))
                    }
                    </div>
                ):(
                    <div className="text-center m-4">
                        <p>No notifications</p>
                    </div>
                )
              )
             }
            </div>
        </dialog>
        </div>
      }
        </>
      )
    };
export default Notification;