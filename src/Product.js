const mongoose=require("mongoose");
const ProductSchema=new mongoose.Schema({
    ImageUrl: {
       type: String,
      
    },
    ProductHeading: {
        type: String,
     
     },
     Lable:{
        type:String,
     }


  
   })


 module.exports=  mongoose.model("Product", ProductSchema );
