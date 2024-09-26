import { memo } from "react";
import React from "react";
import { sampleNotification } from "../../assets/constants/sampleData";
const Notification=()=>
    {
        const friendRequestHandler=(_is,accept)=>
            {
                
            }
        return (
            <>
            {
            <div className="flex items-center justify-center">
          <dialog open className=" fixed inset-0 border-black border-2 p-3 text-center md:text-2xl bg-black text-white">
            <div className="p-2">
             <p className="font-semibold">Notification</p>
             {
                sampleNotification.length>0?(
                    <div className="text-center">
                        {
                        sampleNotification.map(({sender,_id})=>
                        (
                            <NotificationItem 
                            sender={sender} 
                            _id={_id} 
                            handler={friendRequestHandler} 
                            key={_id}/>
                        ))
                    }
                    </div>
                ):(
                    <div className="text-center">
                        <p>No notifications</p>
                    </div>
                )
             }
            </div>
        </dialog>
        </div>
      }
        </>
      )
    };
    const NotificationItem=(({sender,_id,handler})=>
        {
            const {name}=sender
            return <>
              <div className="flex flex-col bg-black text-white">
        <div className="flex gap-2 m-2 justify-between items-center">
            {
                (window.innerWidth>786)?
                (
                    <p>{name} sent you a friend request</p>
                ):(
                    <p>{name}...</p>
                )
            }
            <div className="flex gap-2">
                <button onClick={()=>handler({_id,accept:true})} className=" text-blue-600  hover:rounded-sm hover:p-2 hover:bg-blue-500 hover:border-blue-500 hover:text-white">Accept</button>
                <button onClick={()=>handler({_id,accept:false})} className="text-red-600  hover:border-red-600 hover:rounded-sm hover:p-2 hover:bg-red-500 hover:text-white">Reject</button>
            </div>
        </div>
        </div>
            </>
        });
export default Notification;