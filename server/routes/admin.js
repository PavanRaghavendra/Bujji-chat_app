import express from 'express';
import {allChats, allUsers, alldashboard, adminLogin,logOut,getAdmin, allMessages} from '../controllers/admin.js';
import { validateHandler, adminLoginValidator } from '../utils/validation.js';
import {checkAdmin} from '../middlewares/admin.js';
const router = express.Router();
router.use(express.json());
router.post('/verify',adminLoginValidator(),validateHandler, adminLogin);
router.post("/logout",logOut);
router.use(checkAdmin);
router.get('/',getAdmin); // Added handler for root route
router.get("/users", allUsers); // Changed to GET and renamed path for clarity
router.get("/chats", allChats); // Renamed path for consistency
router.get("/dashboard", alldashboard);
router.get('/messages',allMessages)
export default router;