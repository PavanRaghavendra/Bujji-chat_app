import { ListItemText, Menu, MenuItem, MenuList } from "@mui/material"
import React, { useRef } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useSendAttachmentsMutation } from '../../redux/api/api'
import { useFileOption, usesetLoading } from '../../redux/reducers/buttons'
const FileMenu = ({anchorE1,chatId}) => {
  const isFileMenu=useSelector((state)=>state.buttons.File)
 // console.log(isFileMenu);
  const dispatch=useDispatch();
  const imageref=useRef();
  const Audioref=useRef();
  const Videoref=useRef();
  const fileref=useRef();
  const [sendAttachment]=useSendAttachmentsMutation();
  const closehandleMenu=()=>
  {
    dispatch(useFileOption(false));
  }
  const selectRef=(ref)=>
  {
    ref.current?.click()
  }
  const filehandleOption=async(e,key)=>
  {
    const files=Array.from(e.target.files);
    if(files.length<=0)
         toast.error("choose a file")
    if(files.length>5)
         toast.error("can't send more than 5 files at a time");
    dispatch(usesetLoading(true));
    const toastId=toast.loading(`sending ${key}`)
    closehandleMenu()
    try{
      const myFrom=new FormData()
      myFrom.append("chatId",chatId)
      files.forEach((file)=>
      {
        myFrom.append("files",file)
      })
      console.log(myFrom);
      const res= await sendAttachment(myFrom).unwrap();
    if(res)
         toast.success(`${key} sent successfully`, { id: toastId })
    } catch (error) {
      toast.error(error.msg||"Failed to send files", { id: toastId })
    }
    finally{
      dispatch(usesetLoading(false))
    }
  }
  return (
    <Menu  open={isFileMenu} anchorEl={anchorE1} onClose={closehandleMenu}>
      <div className='w-40'></div>
      <MenuList>
      <MenuItem onClick={()=>selectRef(imageref)}>
        <ListItemText className='ml-2'>Image</ListItemText>
        <input type='file' multiple 
        accept='image/png,image/jpeg,image/jpg,image/gif' 
        className='hidden' onChange={(e)=>filehandleOption(e,"Images")}
        ref={imageref}></input>
        </MenuItem>
        <MenuItem onClick={()=>selectRef(Audioref)}>
        <ListItemText className='ml-2'>Audio</ListItemText>
        <input type='file' multiple 
        accept='audio/mpeg,audio/wav' 
        className='hidden' ref={Audioref}onChange={(e)=>filehandleOption(e,"Audio")}></input>
        </MenuItem>
        <MenuItem onClick={()=>selectRef(Videoref)}>
        <ListItemText className='ml-2'>Video</ListItemText>
        <input type='file' multiple 
        accept='video/mp4' 
          className='hidden' ref={Videoref} onChange={(e)=>filehandleOption(e,"Videos")}></input>
        </MenuItem>
        <MenuItem onClick={()=>selectRef(fileref)}>
        <ListItemText className='ml-2'>File</ListItemText>
        <input type='file' multiple 
        accept='*' 
        className='hidden' ref={fileref} onChange={(e)=>filehandleOption(e,"File")}></input>
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

export default FileMenu