
import jwt from 'jsonwebtoken'
const protect=async(req,res,next)=>{
    // whenever the user is logged in then we will send the headers
    // and in the headers we will send the authorization property where we will add the token
    const token=req.headers.authorization
    if(!token){
        return res.status(401).json({message:"Unauthorized"});
    }
    try{

        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        // since we have created the token using userID ,we can extract the userId from this decoded token
        req.userId=decoded.userId
        next() // next() will execute controller function
    }catch(error){
        return res.status(401).json({message:'Unauthorized'})

    }
}

export default protect;