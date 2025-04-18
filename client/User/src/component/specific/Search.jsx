import React,{useEffect, useState} from "react";
import {useInputValidation} from "6pp";
import UserItem from "../shared/UserItem";
import { sampleUser } from "../../assets/constants/sampleData";
import { useDispatch,useSelector } from "react-redux";
import { useSearch } from "../../redux/reducers/buttons";
import { useLazyNameSearchQuery,useSendRequestMutation } from "../../redux/api/api";
import toast from "react-hot-toast";
import {Loader} from 'rsuite'
import { useAsyncMutation } from "../../hooks/hooks";
const Search=()=>
    {
      const dispatch=useDispatch();
      const search=useInputValidation("");
      const [Users,setUsers]=useState([]);
      //const isLoadingSendFriendRequest=false;
      const [nameSearch]=useLazyNameSearchQuery();
      const[sendRequest,isLoading]=useAsyncMutation(useSendRequestMutation);
      useEffect(()=>{
        const timeout=setTimeout(()=>{
          nameSearch(search.value).then(({data})=>
          {
            console.log(data.user)
            setUsers(data.user);
          }
          ).catch((err)=>
          {
            console.log(err)
          })
        },1000);
        return()=>
        {
          clearTimeout(timeout)
        }
      },[search.value])
      const addFriendHandler=async (id)=>
        {
          await sendRequest("sending request...",{userId:id});
        };
        const isSearch=useSelector(state=>state.buttons.search);
        const handleClose=()=>dispatch(useSearch(!isSearch));
        return (
          <>
          {
          <div className="flex items-center justify-center">
        <dialog open={isSearch} onClose={handleClose} className="fixed inset-0 border-black border-2 p-3 text-center md:text-2xl">
          <div className="p-2">
            <div className="flex justify-between w-full pb-3">
            <h2 className="p-1 text-xs md:text-xl">Find People</h2>
            <button onClick={handleClose}>close</button>
            </div>
            <input type="text" label="" value={search.value} onChange={search.changeHandler} className="border-2 border-solid border-black"></input>
          </div>
          <div className=" w-full h-screen/5 overflow-scroll p-2">
          {
            Users.length==0?(<Loader/>):(
             <>
             {
                Users.map((i)=>
                  (
                    <UserItem user={i} key={i._id}
                      handler={addFriendHandler}
                      handlerIsLoading={isLoading}/>
                  ))
             }
             </>
            )
          }
          </div>
      </dialog>
      </div>
    }
      </>
    )};
export default Search;