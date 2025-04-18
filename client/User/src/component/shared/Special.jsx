import { Menu, Stack } from '@mui/material'
import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { setIsadmin } from '../../redux/reducers/buttons'
import { useAsyncMutation } from '../../hooks/hooks'
import { useMakeAdminMutation, useRemoveAdminMutation } from '../../redux/api/api'
export const Special = ({anchorTag,admin}) => {
    const dispatch=useDispatch()
    const openDecision=useSelector(state=>state.buttons.Ismakeadmin)
    const closeHandler=()=>{
        dispatch(setIsadmin(false))
    }
    const [make,isloading]=useAsyncMutation(useMakeAdminMutation)
    const [remove,isloadingremove]=useAsyncMutation(useRemoveAdminMutation)
    const SelectedUserId=useSelector(state=>state.buttons.selectUserId)
    const userId=SelectedUserId.userId;
    console.log(userId)
    const chatId=SelectedUserId.chatId
    console.log(chatId)
    const Isadmin=admin.includes(SelectedUserId.userId)
    const makeAdmin=async ()=>
    {
       await make("makind admin",{userId:userId,chatId:chatId})
        dispatch(setIsadmin(false))
        dispatch(setIsadmin({chatId:"",userId:""}))
    }
    const removeAdmin=()=>
    {
        try{
        remove("removing as admin",{userId,chatId})
        dispatch(setIsadmin(false))
        dispatch(setIsadmin({chatId:"",userId:""}))
        }
        catch(err)
        {
            console.log(err)
        }
    }
  return (
    <Menu open={openDecision} onClose={closeHandler} anchorEl={anchorTag.current}>
        <Stack  
        sx={
                {
                        width:"10rem",
                        padding:"0.5rem",
                        cursor:"pointer"
                }
            }
            onClick={Isadmin?removeAdmin:makeAdmin}
            >
            {
                Isadmin?(<div>Remove admin</div>):(<div>Admin</div>)
            }
        </Stack>
    </Menu>
  )
}
