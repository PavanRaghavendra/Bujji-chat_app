import jwt from 'jsonwebtoken'
const auth=async (req,res,next)=>
{
    try
    {
        const token=req.cookies["Bujji-token"];
        if(!token)
            return res.status(401).json(
        {
            msg:"please login to get access"
        });
        const decodedData=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decodedData._id;
        //console.log(req.user);
        next();
    }
    catch
    {

    }
};
export {auth};