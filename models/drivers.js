var mongoose=require("mongoose");


//schema setup
var driverSchema= new mongoose.Schema({
    name:String,
    price:String,
    image:String,
    licNo:String,
    place:String,
    phone:String,
    password:String,
    car:String,
    reg:String,
    email:String,
    author:{
       id:{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
       },
       username:String
    },
    comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
  });
  
module.exports=mongoose.model("driver",driverSchema);