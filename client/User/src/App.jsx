
import {BrowserRouter,Route, Routes, UNSAFE_LocationContext} from 'react-router-dom';
import { lazy,Suspense } from 'react';
let Login=lazy(()=>import("./pages/Login.jsx"));
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
//outlet in react router dom..thing uses to nested paths and routes..
function App() {

  return (
    <>
     <BrowserRouter>
     <Suspense fallback={<Loaders/>}>
     <Routes>
      <Route path='/about' element={<h1></h1>}></Route>
      <Route path="/login" element={<Login />}/>
      <Route path="/groups" element={ <Groups />} />
      <Route path='/' element={ <AppLayout><Home/></AppLayout>}/>
      <Route path='/chat' element={<AppLayout><Chat/></AppLayout>}/>
      <Route path='*' element={<Notfound/>}/>
      <Route path='/admin' element={<Suspense fallback={<div>..Loading</div>}><AdminLogin/></Suspense>}></Route>
      <Route path='/admin/dashboard' element={<Suspense fallback={<div>..Loading</div>}><Dashboard/></Suspense>}></Route>
      <Route path='/admin/users' element={<Suspense fallback={<div>..Loading</div>}><Usermanagement/></Suspense>}></Route>
      <Route path='/admin/messages' element={<Suspense fallback={<div>..Loading</div>}><Messagemanagement/></Suspense>}></Route>
      <Route path='/admin/chats' element={<Suspense fallback={<div>..Loading</div>}><Chatmanagment/></Suspense>}></Route>
     </Routes>
     </Suspense>
     </BrowserRouter>
    </>
  )
}

export default App;