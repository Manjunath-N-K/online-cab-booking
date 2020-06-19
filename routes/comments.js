var express=require("express");
var router=express.Router({mergeParams:true});

var driver=require("../models/drivers");
var Comment=require("../models/comment");
var Cab=require("../models/cabs");
var User=require("../models/users");

var middleware=require("../middleware");

//---------------------
//comment section

router.get("/new",middleware.isLoggedIn, function(req, res){
    // find campground by id
    
    driver.findById(req.params.id, function(err, driver){
        if(err){
            console.log(err);
        } else {
             res.render("comments/new", {driver: driver});
        }
    })
  });
  
  //cpmment create
router.post("/", function(req, res){
    //lookup campground using ID
    driver.findById(req.params.id, function(err, driver){
        if(err){

            console.log(err);
            res.redirect("/drivers ");
        } else {
         Comment.create(req.body.comment, function(err, comment){
            if(err){
              req.flash("error","something went wrong");
                console.log(err);
            } else {
                //add usernam and id and save coment
      
        comment.author.id=req.user._id;
        comment.author.username=req.user.username;
        comment.save();

                driver.comments.push(comment);
                driver.save();
                req.flash("success","Comment created successfully");
                res.redirect('/drivers/' + driver._id);
              
            }
         });
        }
    });
   
  });


  //comment edit
router.get("/:comment_id/edit",middleware.checkCommentOwnership,function(req,res){
Comment.findById(req.params.comment_id,function(err,foundComment){
  if(err){
    res.redirect("back");
  }
  else{
    res.render("comments/edit",{driver_id:req.params.id,comment:foundComment});
  }
})

});

//commment update
router.put("/:comment_id",middleware.checkCommentOwnership,function(req,res){
 Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment){
   if(err){
     res.redirect("back");
   }else{
     res.redirect("/drivers/"+req.params.id);
   }
 });
});


//delete comment
router.delete("/:comment_id",middleware.checkCommentOwnership,function(req,res){
Comment.findByIdAndRemove(req.params.comment_id,function(err){
  if(err){
    res.redirect("back");
  }else{
    req.flash("success","Comment deleted ");
res.redirect("/drivers/"+req.params.id);
  }
})
});



  //middleware
 




  module.exports=router;