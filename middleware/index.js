var driver=require("../models/drivers");
var comment=require("../models/comment");



//all the middlewares
var middlewareObj={};




//driver
middlewareObj.checkDriverOwnership=function(req,res,next){
   
        if(req.isAuthenticated()){
          driver.findById(req.params.id,function(err,foundDriver){
            if(err){
              req.flash("error","Not found");
              res.redirect("/drivers");
            }else{
               //does user own the driver
          if(foundDriver.author.id.equals(req.user._id)){
         next();
          }else{
            req.flash("error","you dont have permission to do that");
            res.redirect("back");
          }
          }
         });
        }else{
          req.flash("error","you need to login");
         res.redirect("back");
        } 
      
      
}


//comment
middlewareObj.checkCommentOwnership=function(req,res,next){
   
        if(req.isAuthenticated()){
          Comment.findById(req.params.comment_id,function(err,foundComment){
            if(err){
              res.redirect("back");
            }else{
               //does user own the comment
          if(foundComment.author.id.equals(req.user._id)){
         next();
          }else{
            req.flash("error","You dont have permission");
            res.redirect("back");
          }
          }
         });
        }else{
          req.flash("error","you need to login");
         res.redirect("back");
        } 
      
     
}



//login
middlewareObj.isLoggedIn=function(req,res,next){    
        if(req.isAuthenticated()){
          return next();
        }
        req.flash("error","You need to login to do that");
        res.redirect("/login");
        
}

module.exports=middlewareObj;