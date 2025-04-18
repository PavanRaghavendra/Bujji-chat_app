import React, { useState } from 'react'
import {sampleUser} from '../../assets/constants/sampleData'
import UserItem from '../shared/UserItem'
import { useDispatch, useSelector } from 'react-redux'
import { useAddmember } from '../../redux/reducers/buttons'
import { useAddMembersMutation, useGetFriendsQuery } from '../../redux/api/api'
import { useAsyncMutation, useErrors } from '../../hooks/hooks'
import {Loader} from '../Layout/Loaders'
import toast from 'react-hot-toast'
const AddMemberDialog = ({chatId}) => {
  const dispatch=useDispatch()
    const addMemberOpen=useSelector(state=>state.buttons.IsaddMember)
      const {isLoading,data,isError,error}=useGetFriendsQuery(chatId)
      useErrors([{isError:isError,error:error}])
      const [addMembers,addMembersLoading]=useAsyncMutation(useAddMembersMutation)
        const [selectMembers,setselectMembers]=useState([]);
        const SelectMemberHandler=(id)=>{
            setselectMembers((prev) => {
              if (prev.includes(id)) {
                return prev.filter((memberId) => memberId !== id);
              } else {
                return [...prev, id];
              }
            });
          };
    const closehandler=()=>
        {
          dispatch(useAddmember(false))
        };
    const addSubmitMemebers=()=>
     {
        if(selectMembers.length<1)
          return toast.error("Please select members")
        addMembers("adding Members",{chatId:chatId,Members:selectMembers})
        closehandler()
     };
    return (
      <>
      {
        isLoading?(<Loader/>):(
          <div className='fixed inset-0 border-black border-2 p-2 text-center md:text-2xl flex justify-center items-center'>
          <dialog open={addMemberOpen} onClose={()=>closehandler()} className='w-96'>
            <div className='flex justify-between'>
              <p className='p-3'>AddMember</p>
              <button className='p-3'onClick={closehandler}>Close</button>
            </div>
              <div className='overflow-auto h-screen/5 p-4'>
                  {
                      data?.data.length> 0 ? (
                      // If sampleUser array has elements
                      data?.data.map((i) => (
                        <UserItem key={i._id} user={i} handler={SelectMemberHandler}
                        isAdded={selectMembers.includes(i._id)} />
                      ))
                    ) : (
                      // If sampleUser array is empty
                      <div>
                        <p>No frined</p>
                      </div>
                    )
                  }
              </div>
              <div className='flex flex-row justify-center gap-5'>
              <button onClick={addSubmitMemebers} className='text-blue-500 hover:border-blue-500 hover:text-white hover:bg-blue-500 hover:p-2'>submit</button>
              <button onClick={closehandler} className='text-red-500 hover:border-red-500 hover:text-white hover:bg-red-500 hover:p-2'>cancel</button>
              </div>
          </dialog>
      </div>
        )
      }
  </>
  )
}

export default AddMemberDialog