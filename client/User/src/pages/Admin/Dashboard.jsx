import React from 'react'
import AdminLayout from '../../component/Layout/AdminLayout'
import moment from 'moment-timezone'
import PersonIcon from '../../assets/images/Iconsjsx/PersonIcon'
import  ChatIcon  from '../../assets/images/Iconsjsx/ChatIcon'
import  MessagesIcon  from '../../assets/images/Iconsjsx/MessageIcon'
import { Charts, PillaMessage } from '../../component/specific/charts'
const Dashboard = () => {
  const Appbar=(
    <div className='shadow-2xl border-2 border-solid m-1 p-2 rounded-lg'>
            <div className='flex justify-around items-center'>
              <p className='text-xs sm:text-xl'>icon</p>
             <input type="text" placeholder='' className='border-2 border-solid border-black w-50'/>
             <button className='border-2 p-1 rounded-sm text-white bg-black text-xs sm:text-xl'>Search</button>
             <p className='hidden md:block'>{moment().format("MMMM Do YYYY")}</p>
             <button>
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
              </svg>
             </button>
            </div>
    </div>
  )
  const Widget=({title,value,icon})=>
    (
      <div className='border m-2 p-3 flex justify-center items-center shadow-xl rounded-md'>
        <div className='flex flex-col items-center m-1 gap-2'>
          <div>
          <p className='bg-black text-white border border-solid border-black w-10 h-10 flex justify-center items-center rounded-full'>{value}</p>
          </div>
          <div className='flex gap-4'>
              <div className='text-black'> {icon}</div>
            <p>{title}</p>
          </div>
        </div>
      </div>
    )
  const Widgets=(
    <div className='flex flex-col  sm:flex-row justify-around items-center'>
      <Widget title={"users"} value={34} icon={<PersonIcon></PersonIcon>}></Widget>
      <Widget title={"chats"} value={4} icon={<ChatIcon/>}/>
      <Widget title={"messages"} value={453} icon={<MessagesIcon/>}/>
    </div>
  )
  return (
    <AdminLayout>
       {Appbar}
       <div className='flex flex-col gap-4 sm:flex-row items-center m-2'>
        <div className='h-80 border w-full sm:w-1/2  shadow-lg p-2 rounded-md flex flex-col justify-center items-center'>
          <p>Last Messages</p>
          <Charts value={[1,2,5,7,8,9]}/>
        </div>
        <div className='border mx-auto w-full sm:w-1/2 flex justify-center items-center shadow-md p-1  m-5 rounded-md max-w-96 relative'>
          <PillaMessage labels={["Single Chat","Group Chat"]} value={[23,66]}/>
          <div className='flex justify-center absolute'>
            <p>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
            </svg>
            </p>
            <p>Vs</p>
            <p>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
               <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
           </svg>
            </p>
          </div>
        </div>
        </div>
       {
        Widgets
       }
    </AdminLayout>
  )
}

export default Dashboard