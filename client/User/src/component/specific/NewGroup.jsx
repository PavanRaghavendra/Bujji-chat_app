import React, { useState } from "react";
import {useInputValidation} from "6pp"
import { useDispatch,useSelector } from "react-redux";
import { useGroup } from "../../redux/reducers/buttons";
import { useAllusersQuery, useCreateGroupMutation, useGetFriendsQuery } from "../../redux/api/api";
import {toast} from 'react-hot-toast'
import {useErrors,useAsyncMutation} from "../../hooks/hooks"
const NewGroup=()=>
    {
      const dispatch=useDispatch();
        const [groupName,setgroupName]=useState("");
        const {data,isError,error,isLoading}=useGetFriendsQuery();
        useErrors([{isError:isError,error:error}])
        const [selectMembers,setselectMembers]=useState([]);
        const [createGroup,createisLoading]=useAsyncMutation(useCreateGroupMutation);
        const isNewGroup=useSelector(state=>state.buttons.newgroup);
        const handleClose=()=>
        {
          dispatch(useGroup(!isNewGroup));
        }
        const SelectMemberHandler=(_id)=>{
          setselectMembers((prev)=>[...prev,_id]);
        };
        const SelectRemoveHandler=(_id)=>
        {
          const currentMembers=selectMembers.filter((id)=>id!==_id)
          setselectMembers(currentMembers);
        }
        const UserGroup = ({user}) => {
            const {name,_id}=user
          return (
            <div className="p-2">
              <div className="flex justify-between items-center gap-2">
                <p>{name}</p>
                {
                  selectMembers.includes(_id)?(
                    <button disabled={isLoading} className="bg-red-600 rounded-full w-8 h-8 " onClick={()=>
                      {
                        SelectRemoveHandler(_id)
                      }
                    }>-</button>
                  ):(<button disabled={isLoading} className="bg-blue-600 rounded-full w-8 h-8 " onClick={()=>
                    {
                      SelectMemberHandler(_id)
                    }
                  }>+</button>)
                }
              </div>
           </div>
          )
        }
        const onsubmithandler=async()=>{
            dispatch(useGroup(false));
            if(selectMembers<2)
              return toast.error("Members should be atleast 2")
            if(groupName==="")
              return toast.error("please enter group name")
            await createGroup("Creating group",{name:groupName,Members:selectMembers})
        };
        const onClosehadler=()=>
        {
          setselectMembers([]);
          setgroupName("");
        }
        return (
            <>
            {
            <div className="flex items-center justify-center">
          <dialog open className=" fixed inset-0  border-2 p-3 text-center md:text-2xl">
           <div className="flex justify-between">
           <p className="m-2">New Group</p>
           <button onClick={handleClose}>close</button>
           </div>
           <input placeholder="Group Name" label="Group Name" type="text" value={groupName} onChange={(e)=>{setgroupName(e.target.value)}}className="border-2 border-solid p-2"></input>
           <p className="font-semibold m-2">Members</p>
           <div className="w-full h-screen/5 overflow-scroll p-2">
            {
            data?.data.map((i)=>
              (
                <UserGroup user={i} key={i._id} />
              ))
            }
          </div>
           <div className="flex gap-2 justify-evenly">
            <button className="text-blue-600 hover:border-blue-500 hover:border-2  m-2" onClick={onsubmithandler}>Create</button>
            <button className="text-red-600 hover:border-red-500 hover:border-2  m-2" onClick={onClosehadler}>cancel</button>
           </div>
        </dialog>
        </div>
      }
        </>
      )
    };
export default NewGroup;