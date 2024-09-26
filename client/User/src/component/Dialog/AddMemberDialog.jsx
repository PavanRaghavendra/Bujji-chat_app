import React, { useState } from 'react'
import {sampleUser} from '../../assets/constants/sampleData'
import UserItem from '../shared/UserItem'
const AddMemberDialog = ({addMember,isLoadingAddMember,chatId}) => {
     const [Members,setMembers]=useState(sampleUser);
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
            setselectMembers([]);
            setMembers([]);
        };
    const addSubmitMemebers=()=>
     {
        closehandler();
     };
    return (
    <div className='fixed inset-0 border-black border-2 p-3 text-center md:text-2xl flex justify-center items-center backdrop-blur-md'>
        <dialog open onClose={closehandler} className='p-10 bg-black text-white'>
            <p className='p-3'>Add member</p>
            <div>
                {
                  Members.length > 0 ? (
                    // If sampleUser array has elements
                    Members.map((i) => (
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
            <div className='flex flex-col m-3 gap-2'>
            <button onClick={addSubmitMemebers} className='text-blue-500'>submit changes</button>
            <button onClick={closehandler} className='text-red-500'>cancel</button>
            </div>
        </dialog>
    </div>
  )
}

export default AddMemberDialog