
var express=require("express");
var router=express.Router();
var passport=require("passport")
var User=require("../models/users");
var driver=require("../models/drivers");
var Cab=require("../models/cabs");
var middleware=require("../middleware");



//landing page
router.get("/", function (req, res) {
    res.render("landing");
  });
  


//booking cab


    
   router.get("/register",function(req,res){
      res.render("user/register");
    });
    
    //handle sign up 
   router.post("/register",function(req,res){
    
      req.body.username
      req.body.password
      req.body.email
      req.body.phoneno

      var newUser=new User({username:req.body.username,avatar:req.body.avatar,
      email:req.body.email});
     
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
    


//user profiles

router.get("/user/:id",function(req,res){
User.findById(req.params.id,function(err,findUser){
  if(err) {
    req.flash("error", "Something went wrong.");
    return res.redirect("/");
  }
  res.render("users/show",{foundUser});
});
});




router.get("/book",middleware.isLoggedIn,function(req,res){
  res.render("booking/book");

  });

  
router.get("/book/show",function(req,res){
  res.render("booking/show");
});

router.post("/book",middleware.isLoggedIn, function (req, res){

  const {pickup, drop, date, time } = req.body;


    //find the user 
     User.findOne(req.user._id,(err,foundCust)=>{
        if(err) throw err;

        //found the user 
        //2 function : i) Create a new cab , ii) Add the cab to the user 
        //(i)Create the cab
        const fare= 120.00;
        const newCab = new Cab({
            pickup,
            drop,
            date,
            time,
            fare
        });

     
      req.flash("success_msg","Cab successfully booked !!")
      res.redirect("/book/show",{user:foundCust});
      
  }) 

      });
 







    //----------------------
    

    module.exports=router;