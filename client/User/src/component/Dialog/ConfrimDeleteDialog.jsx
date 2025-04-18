import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useDeletegroup } from '../../redux/reducers/buttons'
import { useAsyncMutation } from '../../hooks/hooks'
import { useDeleteGroupMutation } from '../../redux/api/api'

const ConfrimDeleteDialog = ({chatId}) => {
  const dispatch=useDispatch()
  const conformDelete=useSelector(state=>state.buttons.deletegroup)
  const handleClose=()=>
  {
    dispatch(useDeletegroup(false))
  }
  const [deleteGroup,deleteIsLoading]=useAsyncMutation(useDeleteGroupMutation)
  const proceed=()=>
  {
    deleteGroup("deleting the group",{chatId})
  }
  return (
    <div className='fixed inset-0 border-black border-2 p-3 text-center md:text-2xl flex justify-center items-center '>
        <dialog open={conformDelete} onClose={handleClose} className='p-2 '>
            <p>Confrim Delete</p>
            <form method="dialog">
                <p className='m-2'>Are u sure do u want to delete this group?</p>
                <div className='flex justify-end p-2 gap-4'>
                <button onClick={handleClose} className='border-2 p-1 rounded-md text-white border-blue-500 bg-blue-500'>No</button>
                <button onClick={proceed}className='border-2 p-1 rounded-md text-white border-red-500 bg-red-500 b-2'>yes</button>
                </div>
             </form>
        </dialog>
    </div>
  )
}

export default ConfrimDeleteDialog