import React, { Children, useState } from 'react'
import { useLocation,Link, Navigate } from 'react-router-dom';

const AdminLayout = ({children}) => {
  const [isMobile,setIsMobile]=useState(false);
  const adminTabs=[
    {
    name:"Dashboard",
    path:"/admin/dashboard",
    icon:"icon"
},
{
  name:"Chats",
  path:"/admin/chats",
  icon:"icon"
},
{
  name:"messages",
  path:"/admin/messages",
  icon:"icon"
},
{
  name:"users",
  path:"/admin/users",
  icon:"icon"
},
]
const logouthandler=()=>
  {

  };
  const handleMobile=()=>
    {
      setIsMobile(!isMobile);
    };
    const location=useLocation();
    const IsAdmin=true;
   if(!IsAdmin)
    return <Navigate to={"/admin"}/>
  return (
   <div className='min-h-screen flex relative'>
    <div className='hidden shadow-2xl sm:block sm:w-1/4 bg-slate-200'>
    {
        adminTabs.map((tab)=>
        (
         location.pathname===tab.path?(
            <Link to={tab.path} key={tab.path}>
              <div className=' bg-black rounded-lg text-white border-2 w-fit m-2 p-1 flex gap-2 justify-center mx-auto'>
                <p>{tab.icon}</p>
                <p>{tab.name}</p>
              </div>
            </Link>
         ):
         (
          <Link to={tab.path} key={tab.path}>
              <div className=' w-fit m-2 p-1 flex gap-2 justify-center mx-auto hover:border-2 hover:rounded-lg'>
                <p>{tab.icon}</p>
                <p>{tab.name}</p>
              </div>
            </Link>
         )
        ))
      }
          <Link onClick={logouthandler}>
            <div className=' w-fit m-2 p-1 flex gap-2 justify-center mx-auto'>
                <p>Icon</p>
                <p>Logout</p>
              </div>
          </Link>
    </div>
    {
      isMobile?(
      <div className='w-1/2 h-screen backdrop-blur-md shadow-2xl absolute'>
      <p className='text-2xl text-center'>Pavan</p>
      {
        adminTabs.map((tab)=>
        (
         location.pathname===tab.path?(
            <Link to={tab.path} key={tab.path}>
              <div className=' bg-black rounded-lg text-white border-2 w-fit m-2 p-1 flex gap-2 justify-center mx-auto'>
                <p>{tab.icon}</p>
                <p>{tab.name}</p>
              </div>
            </Link>
         ):
         (
          <Link to={tab.path} key={tab.path}>
              <div className=' w-fit m-2 p-1 flex gap-2 justify-center mx-auto hover:border-2 hover:rounded-lg'>
                <p>{tab.icon}</p>
                <p>{tab.name}</p>
              </div>
            </Link>
         )
        ))
      }
          <Link onClick={logouthandler}>
            <div className=' w-fit m-2 p-1 flex gap-2 justify-center mx-auto'>
                <p>Icon</p>
                <p>Logout</p>
              </div>
          </Link>
      </div>
      ):(<div></div>)
    }
    <div className='w-full sm:ml-12 sm:mt-2 sm:mr-3'>
        {children}
    </div>
    <div className='block sm:hidden'>
      <button onClick={handleMobile}>
        {
          isMobile?(
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>
          ):
        (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
</svg>
        )
        }
</button>
    </div>
   </div>
  )
}

export default AdminLayout