const user=require("../src/user");
const jwt=require("jsonwebtoken");

const role = async (req,resp,next)=>{
    try{
       const token=req.cookies.JsonWEbToken;
       console.log(token)
       const varifyToken= jwt.verify(token, "hyudggysgyydg63f0a41a4a98ee651fe2a01a");
       console.log(varifyToken);

       const uservalid= await user.findOne({_id:varifyToken._id})
       console.log("uservalid",uservalid)
        
           
       

       next();      
    }catch(e){

        console.log(e)
    }
}

module.exports=role;