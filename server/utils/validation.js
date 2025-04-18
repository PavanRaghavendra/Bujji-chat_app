import {body, param, validationResult} from 'express-validator'
const registerValidator=()=>
[
    body("username","please enter user name").notEmpty(),
    body("name","please enter name").notEmpty(),
    body("password","please enter password").notEmpty()

];
const validateHandler=(req,res,next)=>
{
    const errors=validationResult(req);
  //  console.log(errors)
    const errorMessage=errors.array().map((error)=>error.msg).join(",");
   //  console.log(errorMessage);
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
        param(["username","please enter username"]).notEmpty(),
        param(["password","please enter password"]).notEmpty()
    
];
const newGroupvalidator=()=>
        [
            body("name","please enter name").notEmpty(),
            body("Members").notEmpty().withMessage("please enter Members").isArray({min:2,max:100}).withMessage("enter min of 2 or max of 100 members")
        ];
const addGroupvalidator=()=>
            [
                body("chatId","please enter chatId").notEmpty(),
                body("Members").notEmpty().withMessage("please enter Members").isArray({min:1,max:97}).withMessage("Members must be 2-97")
            
            ];
const deleteUserFromChat=()=>
[
    body('chatId').notEmpty().withMessage("enter chatId"),
    body('Members').notEmpty().withMessage("enter Members to be deleted")
];
const chatValidator=()=>
[
    body('chatId').notEmpty().withMessage("Enter valid chatId")
];
const chatnameValidator=()=>
[
    body('name').notEmpty().withMessage("Enter valid chat name")
];
const sendValidator=()=>
[
    body("userId").notEmpty().withMessage("Enter valid userId")
]
const adminLoginValidator=()=>
[
    body("secretKey").notEmpty().withMessage("Enter valid secret key")
]
export {newGroupvalidator,addGroupvalidator,deleteUserFromChat,
    registerValidator,validateHandler,loginValidator,chatValidator,chatnameValidator,sendValidator,adminLoginValidator};