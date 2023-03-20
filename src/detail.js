const mongoose=require("mongoose");
const SettingSchema=new mongoose.Schema({
    Heading: {
       type: String,
      
    },
    SubHeading: {
        type: String,
     
     },

     Artical: {
        type: String,
       
     },

     ImageUrl: {
        type:String,
     }
   })


 module.exports=  mongoose.model("AppSetting", SettingSchema );
//  module.exports= new mongoose.model("detail", app_detail);