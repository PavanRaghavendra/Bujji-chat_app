import React,{useState} from "react";
import {useInputValidation} from "6pp";
import UserItem from "../shared/UserItem";
import { sampleUser } from "../../assets/constants/sampleData";

const Search=()=>
    {
      const search=useInputValidation("");
      const Users=sampleUser;
      const isLoadingSendFriendRequest=false;
      const addFriendHandler=(id)=>
        {
          console.log(id);
        }
        return (
          <>
          {
          <div className="flex items-center justify-center">
        <dialog open className=" fixed inset-0 border-black border-2 p-3 text-center md:text-2xl">
          <div className="p-2">
            <h2 className="p-1">find people</h2>
            <input type="text" label="" value={search.value} onChange={search.changeHandler} className="border-2 border-solid border-black"></input>
          </div>
          <div>
            {
              Users.map((i)=>
              (
                <UserItem user={i} key={i._id}
                  handler={addFriendHandler}
                  handlerIsLoading={isLoadingSendFriendRequest}/>
              ))
            }
          </div>
      </dialog>
      </div>
    }
      </>
    )};
export default Search;