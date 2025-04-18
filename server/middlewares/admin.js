import jwt from "jsonwebtoken";
const checkAdmin=async(req,res,next)=>{
    try{
        //console.log(req.cookies.admintoken)
    if(!req.cookies.admintoken)
    {
        return res.status(400).json({
            success:false,
            msg:"Admin not logged in"
        })
    };
    const secretKey=jwt.verify(req.cookies.admintoken,process.env.JWT_SECRET);
    if(secretKey.secretKey!==process.env.Admin_key)
    {
        return res.status(400).json({
            success:false,
            msg:"Admin not verified"
        })
    };
    next()
}
catch(err)
{
    return res.status(400).json({
        success:false,
        message:err.message
    })
}
};
export {checkAdmin};