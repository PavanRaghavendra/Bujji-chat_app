import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useGetChatsQuery, useGetMessagesQuery } from "../redux/api/api";

const useErrors=({erros=[]})=>
{
    useEffect(()=>{
        erros.forEach(({isError,error,fallback})=>
        {
            if(isError)
            {
                if(fallback)
                     fallback()
                else toast.error(error?.data?.message||"something is fishy");
            }
        })
    },[erros])
};
const useAsyncMutation = (mutatationHook) => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(null);
  
    const [mutate] = mutatationHook();
  
    const executeMutation = async (toastMessage, ...args) => {
      setIsLoading(true);
      const toastId = toast.loading(toastMessage || "Updating data...");
  
      try {
        const res = await mutate(...args);
  
        if (res.data) {
          toast.success(res.data.msg || "Updated data successfully", {
            id: toastId,
          });
          setData(res.data);
        } else {
          toast.error(res?.error?.data?.msg || "Something went wrong", {
            id: toastId,
          });
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong", { id: toastId });
      } finally {
        setIsLoading(false);
      }
    };
  
    return [executeMutation, isLoading, data];
  };
const useSocketEvent=(socket,events)=>
{
    useEffect(()=>{
        Object.entries(events).forEach(([event,handler])=>
        {
            socket.on(event,handler)
        });
        return ()=>{ 
            Object.entries(events).forEach(([event,handler])=>
            {
                socket.off(event,handler)
            })
        }
            
    },[socket,events])
}
export {useErrors,useSocketEvent,useAsyncMutation}