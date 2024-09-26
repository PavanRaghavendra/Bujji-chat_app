import { isValidUsername } from "6pp"
export const usernamevalidator=(username)=>
{
    if(!isValidUsername(username))
    return {isvalid:false,errorMessage:"username is invalid"}

}