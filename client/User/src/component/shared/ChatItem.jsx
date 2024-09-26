import React, { memo } from 'react'
import { Link } from 'react-router-dom'
/*
--Things to pending
1.bgcolor for chats
2.chat text color also
 */
const ChatItem = ({
    name,
    _id,
    groupChat=false,
    samesender,
    isOnline,
    newMessageAlret,
    index=0,
    handleDeleteChatopen}) => {
  return (
    <Link to={'/chat'} onContextMenu={(e)=>handleDeleteChatopen(e,_id,groupChat)} className='hover:bg-black hover:shadow-xl hover:text-white p-2 m-2 '>
      <div className='flex gap-4 items-center p-4'>
        <div className="w-full h-full">
          <p className='text-xl'>{name}</p>
          {newMessageAlret&&(
            <p>{newMessageAlret.count} New Message</p>
          )}
        </div>
        {
          isOnline&&(
            <div className='w-5 h-5 rounded-full bg-green-500'></div>
          )
        }
      </div>
    </Link>
  )
}

export default memo(ChatItem);