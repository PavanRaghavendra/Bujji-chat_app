import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Loader } from "rsuite";
import { ALERT, NEW_MESSAGE, START_TYPING, STOP_TYPING } from "../assets/constants/events";
import FileMenu from "../component/Dialog/FileMenu.jsx";
import { TypingLoader } from "../component/Layout/Loaders.jsx";
import MessageComponent from "../component/shared/MessageComponent";
import { useErrors, useSocketEvent } from "../hooks/hooks";
import { useChatDetailsQuery, useGetMessagesQuery } from "../redux/api/api";
import { useFileOption } from "../redux/reducers/buttons.js";
import { useremoveMessageAlert } from "../redux/reducers/chat.js";
import { useSocket } from "../Socket/socket.jsx";
const Chat=()=>
{
    const dispatch=useDispatch();
    const {chatId}=useParams();
    const navigate=useNavigate();
    const[Iamtyping,setIamTyping]=useState(false);
    const [message,setMessage]=useState("");
    const typingMessage=useRef(null);
    const [Messages,setMessages]=useState([]);
    const userTyping=useSelector(state=>state.chat.usertyping)
    const[Fileanchor,setFileanchor]=useState(null);
    const[page,setPage]=useState(1);
    const socket=useSocket()
    const chatdetails=useChatDetailsQuery({chatId,skip:!chatId});
    const {data,isLoading,isError,error}=useGetMessagesQuery({chatId,skip:!chatId,page});
    const members=chatdetails?.data?.chat?.Members;
    const errors=[{IsError:chatdetails.isError},{error:chatdetails.error},{isError:isError},{error:error}]
    const hasMore=data?.totalpages>page;
    errors.map((i)=>
    {
        useErrors(i);
    })
    //useEffect(()=>setMessages([]),[chatId]);
    useEffect(()=>{
        dispatch(useremoveMessageAlert(chatId));
        return ()=>
        {
            setMessage(""),
            setMessages([]),
            setPage(1)
        }
    },[chatId])
    const newMessagehandle=useCallback((data)=>
    {
        if(data?.chatId!==chatId)
        {
            return;
        }
        setMessages((prev)=>[...prev,data.message]);
    },[chatId]);
    console.log(Messages)
    const alertListener = useCallback(
        (data) => {
            console.log(data)
          if (data.chatId !== chatId) return;
          const messageForAlert = {
            content: data.message,
            sender: {
              _id: "djasdhajksdhasdsadasdas",
              name: "Admin",
            },
            chat: chatId,
            createdAt: new Date().toISOString(),
          };
          setMessages((prev) => [...prev, messageForAlert]);
        },
        [chatId]
      );
    const eventHandler={[NEW_MESSAGE]:newMessagehandle,[ALERT]:alertListener};
    useSocketEvent(socket,eventHandler);
    const exisit=()=>
    {        navigate('/');
    }
    const submitMessage=(e)=>
    {
        e.preventDefault();
        if(!message.trim()) return;
        socket.emit(NEW_MESSAGE,{chatId,message,members});
        setMessage("");
    }
    const MessageChange=(e)=>
        {
            setMessage(e.target.value);
            if(!Iamtyping)
            {
                setIamTyping(true);
                socket.emit(START_TYPING,{members,chatId});
            }
            if(typingMessage.current)
                clearTimeout(typingMessage.current)
         typingMessage.current=setTimeout(()=>{
                socket.emit(STOP_TYPING,{members,chatId})
                setIamTyping(false);
            },[2000])
        }
    const containerRef = useRef();
    const lastContainer = useRef();
    const visibleCount = useRef(0);
    const lastMessagehook = useCallback(
        node => {
            if (isLoading) return;
    
            if (containerRef.current) containerRef.current.disconnect();
    
            containerRef.current = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting&&hasMore) {
                    visibleCount.current += 1;
                    if (visibleCount.current >= 2) {
                        visibleCount.current = 0; 
                        setPage(prevPage => prevPage + 1);
                    }
                }
            });
            if (node) containerRef.current.observe(node);
        },
        [isLoading, hasMore,page]
    );
    const firstMessagehook = useCallback(
        node => {
            if (isLoading) return;
    
            if (lastContainer.current) lastContainer.current.disconnect();
    
            lastContainer.current = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting) {
                    let currentPage=page;
                    currentPage=currentPage-1;
                    if(currentPage>=1)
                        setPage(prevPage => prevPage - 1);
                }
            });
            if (node) lastContainer.current.observe(node);
        },
        [isLoading,page,hasMore]
    );
    const lastMessageref=useCallback(()=>{

    },[])
    const handleFileOpen=(e)=>
    {
        dispatch(useFileOption(true))
        setFileanchor(e.currentTarget)
    }
    return (chatdetails.isLoading||isLoading)?(<Loader/>):(
    <div className="">
    <div className="w-full flex justify-start h-fit bg-slate-700 shadow-2xl">
        <button className=" text-white pl-2" onClick={exisit}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-6 h-6  hover:bg-blue-600 ">
        <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/>
        </svg>
        </button>
        <p className="p-2 text-xl teessages.isLoadingxt-white">{chatdetails?.data?.chat?.name}</p>
    </div>
    <div className="bg-slate-200 flex h-screen  flex-col justify-between text-black">
        <div class="messageblock" className="h-screen overflow-y-auto overflow-x-hidden">
        {
                 data?.msg.map((message,index) => {
                    if(index===0)
                        return(
                            <div ref={lastMessagehook}>
                            <MessageComponent
                            key={message._id}
                            message={message}
                        />
                        </div>
                    )
                   else if(index === data?.msg.length - 1)
                        return(
                            <div ref={firstMessagehook}>
                            <MessageComponent
                            key={message._id}
                            message={message}
                        />
                        </div>
                    )
                    else
                    return (
                        <MessageComponent
                            key={message._id}
                            message={message}
                        />
                    );
                })
        }
        {
            Messages.map((i) => {
              return <MessageComponent key={i._id} message={i} Userid={socket.id} />
                    })
        }
        {
            userTyping&&<TypingLoader/>
        }
        </div>
        <div className=" m-1 p-1 rounded-md shadow-xl bg-white">
        <form className=" border-solid" onSubmit={(e)=>submitMessage(e)}>
            <div className=" flex justify-evenly gap-2">
                <button type="button" onClick={(e)=>handleFileOpen(e)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 md:w-7 md:h-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13" />
                    </svg>
                </button>
                <input type="text" value={message} onChange={(e)=>MessageChange(e)}  placeholder="Text your message" className="w-full overflow-hidden md:text-xl hover:border-2 hover:border-black rounded-md"/>
                <button type="button" className="rounded-full bg-blue-100">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 md:w-7 md:h-7 flex justify-center rounded-full hover:bg-blue-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                </svg>
                </button>
            </div>
        </form>
        </div>
        </div>
        <FileMenu anchorE1={Fileanchor} chatId={chatId}/>
    </div>
    )
}
export default Chat;