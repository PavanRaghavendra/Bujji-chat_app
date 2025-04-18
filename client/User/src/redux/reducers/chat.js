import { createSlice } from "@reduxjs/toolkit";
import { getNotificationSave } from "../../lib/features";
import { NEW_MESSAGE_ALRET } from "../../assets/constants/events";

const initialState={
    notification:0,
    message_Alert:getNotificationSave({key:NEW_MESSAGE_ALRET,get:true})||[
        {
            chatId:"",
            count:0
        }
    ],
    usertyping:false
}
const chatSilce=createSlice({
    name:'chat',
    initialState,
    reducers:{
        useNotitifcationCount(state,action)
        {
            state.notification += 1;
        },
        useReducenotificationCount(state,action)
        {
            if(state.notification>1)
                state.notification-=1;
        },
        useMessageAlert(state,action)
        {
            const chatId=action.payload.chatId;
            const index=state.message_Alert.findIndex((item)=>item.chatId===chatId);
            if(index!==-1)
                state.message_Alert[index].count+=1;
            else
            {
                state.message_Alert.push(
            {
                chatId,
                count:1
            })
        }
    },
    useremoveMessageAlert(state,action)
    {
        state.message_Alert=state.message_Alert.filter((item)=>item.chatId!==action.payload)
    },
    useUsertyping(state,action)
    {
        state.usertyping=action.payload;
    }
    }
});
export default chatSilce;
export const {useNotitifcationCount,useReducenotificationCount,useMessageAlert,useremoveMessageAlert,useUsertyping}=chatSilce.actions;