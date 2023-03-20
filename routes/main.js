const express=require("express");
const cookieparser=require("cookie-parser");
const routes=express.Router();
const jwt=require("jsonwebtoken");
const auth=require("./auth")


routes.use(cookieparser());

const user=require("../src/user");

const BodyParser= require("body-parser");
const BcryptJS=require("bcryptjs");
routes.use(express.json());
routes.use(express.urlencoded({extended:false}));



routes.get("/",(req,resp)=>{
  resp.render("register")
 
})

routes.get("/register",(req,resp)=>{
  resp.render("register")
 
})



routes.get("/login",(req,resp)=>{
  resp.render("login")
 
})


routes.get("/user", async (req, resp)=>{

  let userList=await user.find({});
               
   resp.send(userList)          
//  resp.render("index",{userList})
   

})




// register api


routes.post("/register", async(req,resp)=>{
 
  try{
    
      const registerUser = new user({
        userName:req.body.userName,
        Email:req.body.Email,
        Password:req.body.Password,
        isAdmin:req.body.isAdmin,
      })
      const token= await registerUser.generateToken();
      const register=registerUser.save();
      typeof(token)

      resp.cookie("JsonWEbToken", token,{

        expires: new Date(Date.now() + 1000*60*60*24),
        httpOnly: true,
        
      })

      resp.send(registerUser)
            
        // resp.render("login")

  
  }catch(e){
           console.log(e)
  }
  
})



//login api

 routes.post("/login", async(req,resp)=>{
   try{

    console.log("get coocies", req.cookies.JsonWEbToken)
             let Password=req.body.Password;            
             const regadata= await user.findOne({Email:req.body.Email})
             console.log("your id",regadata.id)
             console.log("is admin ",regadata.isAdmin)

            const daaa=await BcryptJS.compareSync(Password, regadata.Password)
             if(daaa){
              let userList=await user.find();
              resp.send(userList)
              //   resp.render("index" ,{userList})
              //  console.log(daaa)
             }
   }catch(e){
    console.log(e)
   }
})

//edit user list api

routes.get("/editUserList/:id",async(req,resp)=>{
 
  try{ 

  
      let userList= await user.findById(req.params.id)

      const userRole=req.cookies.Role;
      const userid=req.cookies.userid;
      resp.send(userList)

      console.log( "user role is", userRole);
      console.log( "user id is", userid);
      
      if(userRole==="true"||userid===req.params.id){
        resp.render("edit",{userList})
      }else{
        resp.send("you cannot change the password")
       }

  }catch(e){
           console.log(e)
  }
  
})


//updateuserlist 

routes.patch("/editUserList/updateUserList/:id", async(req,resp)=>{
 
  try{ 
  
    const updtauser= await user.findByIdAndUpdate(req.params.id, req.body)
    let result= await user.findById(req.params.id)

    resp.send(result)
    // console.log("params id"+result)  
    // resp.redirect("/index");
    // resp.send(updtauser)
    
  }catch(e){
           console.log(e)
  }
  
})


// delete api

routes.delete("/deleteUser/:id", async(req,resp)=>{
  try{ 
      let result= await user.findById(req.params.id)
      
            const deleteUser= await user.deleteOne(result)
    
    resp.send("user deleate")
    const userRole=req.cookies.Role;
    const userid=req.cookies.userid;
    console.log( "user role is", userRole);
    console.log( "user id is", userid);
    if(userRole==="true"||userid===req.params.id){
      const deleteUser= await user.deleteOne(result)
      let userList=await user.find();     
      resp.render("index",{userList})
    }else{
      resp.send("you cannot delete the account")
    }
    
    
  }catch(e){
           console.log(e)
  }
  
})

module.exports=routes;