import { memo } from "react"
import React from 'react'
const UserItem = ({user,handler,handlerIsLoading,isAdded=false,admin}) => {
    const {name,_id}=user
  return (
    <div className="p-2">
      <div className="flex justify-between items-center gap-2">
        <div className="flex items-center gap-1">
        <p>{name}</p>
        {
          admin?(
            <p className="text-xs text-blue-600">Admin</p>
          ):(<span></span>)
        }
        </div>
        {
          isAdded?(
            <button disabled={handlerIsLoading} className="bg-red-600 rounded-full w-8 h-8 hover:bg-red-300 " onClick={()=>
              {
                handler(_id);
              }
            }>-</button>
          ):(
            <button disabled={handlerIsLoading} className="bg-blue-600 rounded-full w-8 h-8 hover:bg-blue-500 " onClick={()=>
              {
                handler(_id);
              }
            }>+</button>
          )
        }
      </div>
   </div>
  )
}

export default memo(UserItem);