import React from "react";
import ChatItem from "../shared/ChatItem";
import { samplechats } from "../../assets/constants/sampleData";
const ChatList=(
    {
        chats,
        chatId,
        onlineUsers=[],
        newMessagesAlert,
        handleDeleteChat,
    }
)=>
    {
        return <>
        <div className="flex flex-col overflow-auto h-screen">
            {
                chats?.map(({_id,name,groupChat,Members,index})=>
                {
                    const newMessageAlert=newMessagesAlert.find(
                        ({chatId})=>chatId ==_id
                    );
                    //console.log(newMessageAlret);
                    const isonline=Members.some((members) => onlineUsers.includes(members));
                    return <ChatItem 
                    newMessageAlert={newMessageAlert}
                    isOnline={isonline}
                    name={name}
                    _id={_id}
                    key={_id}
                    index={index}
                    groupChat={groupChat}
                    samesender={chatId === _id}
                    handleDeleteChatopen={handleDeleteChat}/>
                })
            }
        </div>
        </>
    };
export default ChatList;