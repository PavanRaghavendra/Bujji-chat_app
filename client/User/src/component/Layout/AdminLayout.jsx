import React, { Children, useState } from 'react'
import { useLocation,Link, Navigate, useNavigate } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux'
import { logoutAdmin } from '../../redux/reducers/thunk/admin';
const AdminLayout = ({children}) => {
  const [isMobile,setIsMobile]=useState(false);
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const adminTabs=[
    {
    name:"Dashboard",
    path:"/admin/dashboard",
    icon:"icon"
},
{
  name:"Chats",
  path:"/admin/chats"
},
{
  name:"messages",
  path:"/admin/messages"
},
{
  name:"users",
  path:"/admin/users"
},
]
const logouthandler=()=>
  {
    console.log("logout")
    dispatch(logoutAdmin())
    navigate("/admin")
  };
  const handleMobile=()=>
    {
      setIsMobile(!isMobile);
    };
    const location=useLocation();
    const IsAdmin=useSelector(state=>state.auth.isAdmin);
   if(!IsAdmin)
   {
      navigate("/admin")
   }
  return (
   <div className='min-h-screen flex relative'>
    <div className='hidden shadow-2xl sm:block sm:w-1/4 text-xl cursor-pointer bg-slate-200'>
    {
        adminTabs.map((tab)=>
        (
         location.pathname===tab.path?(
            <Link to={tab.path} key={tab.path}>
              <div className=' bg-black rounded-lg text-white border-2 w-fit m-2 p-1 flex items-center gap-2 mx-auto'>
                <p>{tab.name}</p>
              </div>
            </Link>
         ):
         (
          <Link to={tab.path} key={tab.path}>
              <div className=' w-fit m-2 p-1 flex gap-2 justify-center mx-auto hover:border-2 hover:rounded-lg'>
                <p>{tab.name}</p>
              </div>
            </Link>
         )
        ))
      }
          <Link onClick={logouthandler}>
            <div className=' w-fit m-2 p-1 flex gap-2 justify-center mx-auto'>
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