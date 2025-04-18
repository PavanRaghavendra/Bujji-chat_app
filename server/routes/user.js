import express from 'express';
import { Router } from 'express';
import { getMyProfile,Login,Newuser,Logout,Search_user, sendRequest, acceptRequest,getallNotification, All_user, getFriends} from '../controllers/user.js';
import { auth } from '../middlewares/auth.js';
import { loginValidator, registerValidator, validateHandler,sendValidator } from '../utils/validation.js';
const router=Router();
const app=express();
app.use(express.json());
router.use(express.json());
//multer middle ware....to br used to upload files and handle.
router.post('/new',registerValidator(),validateHandler,Newuser);  
router.post('/login',loginValidator(),Login);
//After here user must be logged in to access the route...
router.use(auth);
router.get('/me',getMyProfile);
router.get('/logout',Logout);
router.get('/search',Search_user);
router.get('/allusers',All_user)
router.put("/sendrequest",sendRequest);
router.put("/acceptRequest",acceptRequest);
router.get('/notification',getallNotification);
router.get("/friends",getFriends)
export default router;