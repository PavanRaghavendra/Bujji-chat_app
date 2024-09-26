import React, { useState } from "react";
import { sampleUser } from "../../assets/constants/sampleData";
import UserItem from "../shared/UserItem";
import {useInputValidation} from "6pp"
const NewGroup=()=>
    {
        const SelectMemberHandler=(id)=>{
          setselectMembers((prev) => {
            if (prev.includes(id)) {
              return prev.filter((memberId) => memberId !== id);
            } else {
              return [...prev, id];
            }
          });
        };
        const onsubmithandler=()=>{};
        const groupName=useInputValidation("");
        const [Members,setMembers]=useState(sampleUser);
        const [selectMembers,setselectMembers]=useState([]);
        return (
            <>
            {
            <div className="flex items-center justify-center">
          <dialog open className=" fixed inset-0  border-2 p-3 text-center md:text-2xl">
           <p className="m-2">New Group</p>
           <input placeholder="Group Name" label="Group Name" type="text" value={groupName.value} onChange={groupName.changeHandler}className="border-2 border-solid p-2"></input>
           <p className="font-semibold m-2">Members</p>
           <div>
            {
            Members.map((i)=>
              (
                <UserItem user={i} key={i._id}
                  handler={SelectMemberHandler}
                  isAdded={selectMembers.includes(i._id)}
                  />
              ))
            }
          </div>
           <div className="flex gap-2 justify-evenly">
            <button className="text-blue-600 hover:border-blue-500 hover:border-2  m-2" onClick={onsubmithandler}>Create</button>
            <button className="text-red-600 hover:border-red-500 hover:border-2  m-2">cancel</button>
           </div>
        </dialog>
        </div>
      }
        </>
      )
    };
export default NewGroup;