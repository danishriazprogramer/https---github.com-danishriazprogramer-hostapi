
const user=require("../src/user");
const jwt=require("jsonwebtoken");

const auth = async (req,resp,next)=>{
    try{
       const token=req.cookies.JsonWEbToken;
       console.log(token)
       const varifyToken= jwt.verify(token, "hyudggysgyydg63f0a41a4a98ee651fe2a01a");
      
       const uservalid= await user.findOne({_id:varifyToken._id})
       console.log("varify token isadmin",uservalid.isAdmin);
       resp.cookie("Role", uservalid.isAdmin)
       resp.cookie("userid", uservalid.id)
         console.log(uservalid)
        if(!uservalid){
        resp.send("Invalid")
        }
           
       

       next();      
    }catch(e){

        console.log(e)
    }
}

module.exports=auth;