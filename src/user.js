const mongoose = require("mongoose");
const BcryptJS=require("bcryptjs");
const jwt=require("jsonwebtoken")
const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true

  },

  Email: {
    type: String,
    required: true,
    unique: true
  },
  Password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: String,
    required: true
  },
  tokens:[{
    token: {
      type: String,
      required: true
    }
  }]
 })
 
//jwt code


UserSchema.methods.generateToken = async function () {
try {
 
        
const token= await jwt.sign({_id:this._id},"hyudggysgyydg63f0a41a4a98ee651fe2a01a");
console.log(token)
   this.tokens= this.tokens.concat({token});
  await this.save();
 return token;
 //   const varify= await jwt.verify(jsonwebtoken,"hyudggysgyydg63f0a41a4a98ee651fe2a01a");
 //   console.log(varify)
          
   
}catch(e){
  console.log(e)
}

}



 UserSchema.pre("save", function (next) {
   const user = this
 
   if (this.isModified("Password") || this.isNew) {
     BcryptJS.genSalt(10, function (saltError, salt) {
       if (saltError) {
         return next(saltError)
       } else {
         BcryptJS.hash(user.Password, salt, function(hashError, hash) {
           if (hashError) {
             return next(hashError)
           }
 
           user.Password = hash
           next()
         })
       }
     })
   } else {
     return next()
   }
 })
 
//comparing encrypted password


 module.exports = mongoose.model("User", UserSchema)