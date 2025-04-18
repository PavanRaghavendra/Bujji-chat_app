import React, { memo } from 'react'
import { Link } from 'react-router-dom'
/*
--Things to pending
1.bgcolor for chats
2.chat text color also
 */
import { useMobile } from "../../redux/reducers/buttons";
import { useDispatch,useSelector } from "react-redux";
import { motion } from 'framer-motion';
const ChatItem = ({
    name,
    _id,
    groupChat,
    samesender,
    isOnline,
    newMessageAlert,
    index,
    handleDeleteChatopen}) => {
      const dispatch=useDispatch();
      const mobile=useSelector(state=>state.buttons.ismobile);
      const handleClose=()=>dispatch(useMobile(!mobile))
  return (
    <>
    {
      (mobile)?(
      <>
          <Link to={`/chat/${_id}`} onClick={handleClose} onContextMenu={(e)=>handleDeleteChatopen(e,_id,groupChat)} className='hover:bg-black hover:shadow-xl hover:text-white p-2 m-2 '>
      <motion.div initial={{opacity:0,y:"-100%"}} whileInView={{opacity:1,y:0}} transition={{delay:0.1*index}} className='flex gap-4 items-center p-2'>
        <div className="w-full h-fit">
          <p className='text-xl'>{name}</p>
          {newMessageAlert&&(
            <p>{newMessageAlert.count} New Message</p>
          )}
        </div>
        {
          isOnline&&(
            <div className='w-5 h-5 rounded-full bg-green-500'></div>
          )
        }
      </motion.div>
    </Link>
      </>
     ):
      (
        <>
            <Link to={`/chat/${_id}`} onContextMenu={(e)=>handleDeleteChatopen(e,_id,groupChat)} className='hover:bg-black hover:shadow-xl hover:text-white p-2 m-2 '>
      <motion.div initial={{opacity:0,y:"-100%"}} whileInView={{opacity:1,y:0}} transition={{delay:0.1*index}} className='flex gap-4 items-center p-2'>
        <div className="w-full h-fit">
          <p className='text-xl'>{name}</p>
          {newMessageAlert&&(
            <p>{newMessageAlert.count} New Message</p>
          )}
        </div>
        {
          isOnline&&(
            <div className='w-5 h-5 rounded-full bg-green-500'></div>
          )
        }
      </motion.div>
    </Link>
        </>
      )
    }
    </>
  )
}

export default memo(ChatItem);