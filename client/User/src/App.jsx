import {BrowserRouter,Route, Routes, useParams} from 'react-router-dom';
import { lazy,Suspense, useEffect } from 'react';
import axios from 'axios';
import SERVER_API from './lib/consfig.js';
//import {useAppDispatch,useAppSelector} from './redux/hooks.js';
import { userExisits, userNotExists } from './redux/reducers/auth.js';
import {Toaster} from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import ProtectedRoute from './component/auth/ProtectedRoute.jsx';
import { SocketProvider } from './Socket/socket.jsx';
const Login=lazy(()=>import("./pages/Login.jsx"));
const Home=lazy(()=>import("./pages/Home.jsx"));
const Chat=lazy(()=>import("./pages/chat.jsx"));
const Notfound=lazy(()=>import("./pages/NotFound.jsx"));
const AppLayout=lazy(()=>import("./component/Layout/AppLayout.jsx"));
const Groups=lazy(()=>import("./pages/Groups.jsx"));
const Loaders=lazy(()=>import("./component/Layout/Loaders.jsx"));
const AdminLogin=lazy(()=>import('./pages/Admin/AdminLogin.jsx'))
const Dashboard=lazy(()=>import('./pages/Admin/Dashboard.jsx'))
const Chatmanagment=lazy(()=>import('./pages/Admin/Chatmanagment.jsx'))
const Usermanagement=lazy(()=>import('./pages/Admin/Usermanagement.jsx'))
const Messagemanagement=lazy(()=>import('./pages/Admin/Messagemanagement.jsx'))
import { useSocket } from "./Socket/socket.jsx";
//outlet in react router dom..thing uses to nested paths and routes..
function App() {
  const socket=useSocket()
  const dispatch=useDispatch();
  const user=useSelector((state)=>state.auth.user);
  const isAdmin=useSelector((state)=>state.auth.isAdmin)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`${SERVER_API}/api/v1/user/me`, { withCredentials: true });
        dispatch(userExisits(data.msg));
      } catch {
        dispatch(userNotExists(null));
      }
    };
    fetchUser();
  }, [dispatch]);
  return (
    <>
     <BrowserRouter>
     <Suspense fallback={<Loaders/>}>
     <Routes>
      <Route element={
        <SocketProvider>
        <ProtectedRoute user={user} redirect="/login" />
        </SocketProvider>
      }>
      <Route path='/' element={ <AppLayout><Home /></AppLayout>}/>
      <Route path='/groups' element={ <Groups />} />
      <Route path="/chat/:chatId" element={<AppLayout><Chat /></AppLayout>}/>
      </Route>
      <Route
            path='/login'
            element={
              <ProtectedRoute user={user} redirect="/">
                <Login />
              </ProtectedRoute>
            }
          />
      <Route path='/about' element={<h1></h1>}></Route>
      <Route path='*' element={<Notfound/>}/>
      <Route element=
      {
        <ProtectedRoute user={isAdmin} redirect={'/admin'}>
      </ProtectedRoute>}
      >
        <Route path='/admin/dashboard' element={<Suspense fallback={<div>..Loading</div>}><Dashboard/></Suspense>}></Route>
      <Route path='/admin/users' element={<Suspense fallback={<div>..Loading</div>}><Usermanagement/></Suspense>}></Route>
      <Route path='/admin/messages' element={<Suspense fallback={<div>..Loading</div>}><Messagemanagement/></Suspense>}></Route>
      <Route path='/admin/chats' element={<Suspense fallback={<div>..Loading</div>}><Chatmanagment/></Suspense>}></Route>
      </Route>
      <Route path='/admin' element={<ProtectedRoute user={isAdmin} redirect={'/admin/dashboard'}><AdminLogin/></ProtectedRoute>}></Route>
     </Routes>
     <Toaster position='bottom-center'/>
     </Suspense>
     </BrowserRouter>
    </>
  )
}

export default App;