//return user model

var mongoose=require("mongoose");
var passportLocalMongoose=require("passport-local-mongoose");

var UserSchema=new mongoose.Schema({
username:String,
password:String,
avatar:String,
phoneno:String,
email:String,
cabs : [
            {
                type : mongoose.Schema.Types.ObjectId,
                ref : "Cab"
            }
        ]
});

UserSchema.plugin(passportLocalMongoose);

module.exports=mongoose.model("User",UserSchema);