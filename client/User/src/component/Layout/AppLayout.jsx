import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Button, Drawer } from "rsuite";
import { NEW_MESSAGE_ALRET, REFETCH_CHATS, START_TYPING, STOP_TYPING } from "../../assets/constants/events";
import { useErrors, useSocketEvent } from "../../hooks/hooks";
import { getNotificationSave } from "../../lib/features.js";
import { useGetChatsQuery } from "../../redux/api/api";
import { setchatId, useDeletechat, useMobile } from "../../redux/reducers/buttons";
import { useMessageAlert, useUsertyping } from "../../redux/reducers/chat.js";
import { useSocket } from "../../Socket/socket.jsx";
import DeleteChat from "../Dialog/DeleteChat.jsx";
import ChatList from "../specific/Chatlist";
import Profile from "../specific/Profile";
import Header from "./Header";
import { ChatLoader } from "./Loaders";
const AppLayout = ({ children}) => {
  const dispatch=useDispatch();
  const {data,isLoading,error,isError,refetch}=useGetChatsQuery("");
  const {chatId}=useParams()
  const deletechatRef=useRef(null)
 // const userTyping=useSelector(state=>state.chat.usertyping);
  const mobile=useSelector(state=>state.buttons.ismobile);
  const user=useSelector(state=>state.auth.user)
  const handledrawer=()=>dispatch(useMobile(!mobile));
  useErrors([{isError,error}])
    const notificationAlert=useSelector(state=>state.chat.message_Alert);
    useEffect(()=>{
      getNotificationSave({key:NEW_MESSAGE_ALRET,value:notificationAlert});
    },[notificationAlert])
    const socket=useSocket();
      const newMessageAlret=useCallback((data)=>{
        if(data.chatId===chatId)
              return
          dispatch(useMessageAlert(data));
      },[notificationAlert,chatId])
       const messageTyping=useCallback((data)=>
          {
            //console.log("into message")
              if(data.chatId!==chatId)
                   return
             // console.log("typing",data)
             dispatch(useUsertyping(true))
          },[chatId])
          const messageStopTyping=useCallback((data)=>
            {
              //console.log("into message")
                if(data.chatId!==chatId)
                     return
                  dispatch(useUsertyping(false))
            },[chatId])
            const ReftechingChatsListner=useCallback(()=>
            {
              refetch()
            },[refetch])
       const eventHandler={[NEW_MESSAGE_ALRET]:newMessageAlret,[START_TYPING]:messageTyping,[STOP_TYPING]:messageStopTyping,[REFETCH_CHATS]:ReftechingChatsListner
       };
      useSocketEvent(socket,eventHandler);
      const handleDelete=(e,_id,groupChat)=>
      {
        e.preventDefault()
        dispatch(useDeletechat(true))
        dispatch(setchatId({chatId:_id,groupChat}))
        deletechatRef.current=e.currentTarget
      }
  return (
    <>
    <div className="h-screen">
      <div className="shadow-xl p-2 bg-slate-500"><Header/></div>
      { mobile?(
        <Drawer size="xs" placement="left" open={mobile} onClose={handledrawer} theme="dark" >
          <Drawer.Header>
            <Drawer.Title>Chats</Drawer.Title>
            <Drawer.Actions>
              <Button onClick={handledrawer} appearance="primary">Close</Button>
            </Drawer.Actions>
          </Drawer.Header>
          <Drawer.Body>
          <ChatList chats={data.msg} newMessagesAlert={notificationAlert} />
          </Drawer.Body>
        </Drawer>
      ):(<span></span>)}
      <div className="grid grid-flow-col bg-gray-900">
      <div className="hidden sm:block col-span-2">
      {
        (isLoading)?(<ChatLoader/>):(<ChatList chats={data.msg} handleDeleteChat={handleDelete} newMessagesAlert={notificationAlert} />)
      }
      </div>
       <div className="bg-black col-span-12 sm:col-span-8 md:col-span-14">{children}</div>
      <div className=" hidden md:block p-2"><Profile user={user}/></div>
      </div>
      {
        <DeleteChat dispatch={dispatch} deletechatAnchor={deletechatRef}/>
      }
  </div>
    </>
  );
};

export default AppLayout;