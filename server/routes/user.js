import express from 'express';
import { Router } from 'express';
import { getMyProfile,Login,Newuser,Logout,Search_user} from '../controllers/user.js';
import { auth } from '../middlewares/auth.js';
import { loginValidator, registerValidator, validateHandler } from '../utils/validation.js';
const router=Router();
const app=express();
app.use(express.json());
router.use(express.json());
//multer middle ware....to br used to upload files and handle.
router.post("/new",registerValidator(),validateHandler,Newuser);  
router.get('/login',loginValidator(),validateHandler,Login);
//After here user must be logged in to access the route...
router.use(auth);
router.get('/me',getMyProfile);
router.get('/logout',Logout);
router.get("/search",Search_user);
export default router;