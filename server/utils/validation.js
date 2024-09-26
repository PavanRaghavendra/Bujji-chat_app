
import {body, validationResult} from 'express-validator'
const registerValidator=()=>
[
    body(["username","please enter username"]).notEmpty(),
    body(["name","please enter name"]).notEmpty(),
    body(["password","please enter password"]).notEmpty()

];
const validateHandler=(req,res,next)=>
{
    const errors=validationResult(req);
    const errorMessage=errors.array().map((error)=>error.msg).join(",");
    console.log(errorMessage);
    if(errors.isEmpty())
      return  next();
    else{
        return res.status(400).json(
            {
                success:false,
                msg:errorMessage
            }
        )
    }
};
const loginValidator=()=>
[
        body(["username","please enter username"]).notEmpty(),
        body(["password","please enter password"]).notEmpty()
    
];
const newGroupvalidator=()=>
        [
            body(["name","please enter name"]).notEmpty(),
            body("Members").notEmpty().withMessage("please enter Members").isArray({min:2,max:100}).withMessage("enter min of 2 or max of 100 members")
        
        ];
const addGroupvalidator=()=>
            [
                body(["chatId","please enter chatId"]).notEmpty(),
                body("Members").notEmpty().withMessage("please enter Members").isArray({min:1,max:97}).withMessage("Members must be 2-97")
            
            ];
const deleteUserFromChat=()=>
[
    body('chatId').notEmpty().withMessage("enter chatId"),
    body('userId').notEmpty().withMessage("enter userId to be deleted")
]
export {newGroupvalidator,addGroupvalidator,deleteUserFromChat,
    registerValidator,validateHandler,loginValidator};