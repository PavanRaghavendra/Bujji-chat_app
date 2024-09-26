import React from "react";
import Title from "../shared/Title";
import Header from "./Header";
import ChatList from "../specific/Chatlist";
import { samplechats } from "../../assets/constants/sampleData";
import Profile from "../specific/Profile";
const AppLayout = ({ children }) => {
  return (
    <>
      <Title />
      <div className="mb-3"><Header/></div>
      <div className="grid grid-flow-col h-screen">
  <div className="hidden sm:block p-0"><ChatList chats={samplechats} chatId={"1"}
  newMessagesAlret={[
    {
    chatId:"1",
    count:4,
  }
  ]}
  /></div>
  <div className="col-span-12 sm:col-span-8 md:col-span-10">{children}</div>
  <div className="bg-slate-700 hidden md:block p-2"><Profile/></div>
</div>
    </>
  );
};

export default AppLayout;