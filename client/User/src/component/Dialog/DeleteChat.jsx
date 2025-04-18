import React, { useEffect } from 'react'
import { Menu, Stack, Typography } from '@mui/material'
import {ExitToApp as ExitToAppIcon,Delete as DeleteIcon} from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { useDeletechat } from '../../redux/reducers/buttons'
import { useNavigate } from 'react-router-dom'
import {useAsyncMutation} from '../../hooks/hooks'
import { useDeleteGroupMutation, useLeaveGroupMutation } from '../../redux/api/api'
const DeleteChat = ({dispatch,deletechatAnchor}) => {
    //const dispatch=useDispatch()
    const  navigate=useNavigate()
    const openHandler=useSelector(state=>state.buttons.Isdeletechat)
    const selectedChat=useSelector(state=>state.buttons.selectChatId)
    const isgroup=selectedChat.groupChat;
    const [deletingChat,Isloadingdelete,deletedChat]=useAsyncMutation(useDeleteGroupMutation)
    const [exitgroup,Isloading,exitedgroup]=useAsyncMutation(useLeaveGroupMutation)
    const closeHandler=()=>dispatch(useDeletechat(false))
    const onLeaveGroup=()=>{
        closeHandler()
        exitgroup("Leaving group",{chatId:selectedChat.chatId})
    };
    const onRemovefriend=()=>
    {
        closeHandler(),
        deletingChat("deleting Chat",{chatId:selectedChat.chatId})
    }
    useEffect(()=>{
        if(deletedChat||exitedgroup)
            navigate("/")
    },[deletedChat,exitedgroup])
    return(
        <>
            <Menu open={openHandler} onClose={closeHandler} anchorEl={deletechatAnchor.current}
            anchorOrigin={
                {
                    vertical:"bottom",
                    horizontal:"right"
                }
            }transformOrigin={{
                vertical:"center",
                horizontal:"center"
            }}>
                <Stack
                sx={
                    {
                        width:"10rem",
                        padding:"0.5rem",
                        cursor:"pointer"
                    }
                }
                 direction="row" spacing={2}
                 onClick={isgroup?onLeaveGroup:onRemovefriend}
                 >
                {
                    isgroup?
                    <>
                    <ExitToAppIcon/>
                    <Typography>Leave Group</Typography>
                    </>:
                    <>
                    <DeleteIcon/>
                    <Typography>Remove Chat</Typography>
                    </>
                }
                </Stack>
            </Menu>
        </>
    )
}

export default DeleteChat