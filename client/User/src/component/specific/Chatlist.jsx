import React from "react";
import ChatItem from "../shared/ChatItem";
import { samplechats } from "../../assets/constants/sampleData";
const ChatList=(
    {
        chats=[],
        chatId,
        onlineUsers=[],
        newMessagesAlret=[
            {
                chatId:"",
                count:0,
            },
        ],
        handleDeleteChat,
    }
)=>
    {
        return <>
        <div className="flex flex-col overflow-auto h-full">
            {
                chats?.map((data,index)=>
                {
                    const {_id,name,groupchat,members}=data;
                    const newMessageAlret=newMessagesAlret.find(
                        ({chatId})=>chatId ==_id
                    );
                    //console.log(newMessageAlret);
                    const isonline=members.some((members) => onlineUsers.includes(members));
                    return <ChatItem 
                    index={index}
                    newMessageAlret={newMessageAlret}
                    isOnline={isonline}
                    name={name}
                    _id={_id}
                    key={_id}
                    groupChat={groupchat}
                    samesender={chatId=== _id}
                    handleDeleteChatopen={handleDeleteChat}/>
                })
            }
        </div>
        </>
    };
export default ChatList;