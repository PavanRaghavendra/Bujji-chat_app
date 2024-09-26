import { memo } from "react"
import React from 'react'

const UserItem = ({user,handler,handlerIsLoading,isAdded=false}) => {
    const {name,_id}=user
  return (
    <div className="p-2">
      <div className="flex justify-between items-center gap-2">
        <p>{name}</p>
        {
          isAdded?(
            <button className="bg-red-600 rounded-full w-8 h-8 hover:bg-red-500 " onClick={()=>
              handler(_id)
            }>-</button>
          ):(
            <button className="bg-blue-600 rounded-full w-8 h-8 hover:bg-blue-500 " onClick={()=>
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