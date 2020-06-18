
var express=require("express");
var router=express.Router();
var passport=require("passport")
var User=require("../models/users");
var middleware=require("../middleware");



//landing page
router.get("/", function (req, res) {
    res.render("landing");
  });
  


//booking cab

router.get("/book",middleware.isLoggedIn,function(req,res){
    res.render("booking/book");
    });
    
   router.get("/register",function(req,res){
      res.render("user/register");
    });
    
    //handle sign up 
   router.post("/register",function(req,res){
    
      req.body.username
      req.body.password
      req.body.email
      req.body.phoneno
    
      User.register(new User({username:req.body.username}),req.body.password,function(err,user){
    if(err){
      req.flash("error",err.message);
     return res.render("user/register"); 
    }
    passport.authenticate("local")(req,res,function(){
    req.flash("success","Welcome to Taxify "+ user.username);
      res.redirect("/book");
        });
      });
    });
    
    router.get("/login",function(req,res){
      res.render("user/login");
    });
    
    //middleware
    router.post("/login",passport.authenticate("local",{
     successRedirect:"/book",
     failureRedirect:"/login"     
    }),function(req,res){
    });
    
    
 router.get("/logout",function(req,res){
    req.logOut();
    req.flash("success","logged u out");
    res.redirect("/");
    });
    

router.get("/show",middleware.isLoggedIn,function(req,res){
  res.render("booking/show");
});

router.post("/book",middleware.isLoggedIn, function (req, res){

  User.findById(req.params.id,function(err,foundCab){
if(err){
  res.send("lofer");
}
  else{
    res.render("/show",{user:foundCab});
  }

  });


});




    //----------------------
    

    module.exports=router;