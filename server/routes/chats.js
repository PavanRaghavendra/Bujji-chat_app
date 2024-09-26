import express from 'express';
import { Router } from 'express';
import { auth } from '../middlewares/auth.js';
import { newGroupChat,getMychat, getmyGroup, addnewMem, removeMembers, leaveGroup, sendAttachments, getChatDetails, renameGroup, deleteChat, getMessages } from '../controllers/chat.js';
import { attachmentMulter } from '../middlewares/muter.js';
import { addGroupvalidator, deleteUserFromChat, newGroupvalidator, validateHandler } from '../utils/validation.js';
const router=Router();
const app=express();
app.use(express.json());
router.use(express.json());
router.use(auth);
router.post('/new',newGroupvalidator(),validateHandler,newGroupChat)
router.get('/my',getMychat);
router.get('/my/groups',getmyGroup);
router.put('/addMembers',addGroupvalidator(),validateHandler,addnewMem);
router.delete('/removeMember',deleteUserFromChat(),validateHandler,removeMembers);
router.delete("/leave/:id",leaveGroup);
router.post("/message",attachmentMulter,sendAttachments);
router.get('/messages/:id',getMessages)
router.route("/:id").get(getChatDetails).put(renameGroup).delete(deleteChat);
export default router;