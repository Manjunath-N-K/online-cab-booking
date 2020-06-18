var express=require("express");
var router=express.Router();

var driver=require("../models/drivers");
var passport=require("passport");
var User=require("../models/users");

var middleware=require("../middleware");


//INDEX - display
router.get("/", function (req, res) {
    //get all drivers from db
    console.log(req.user);
    driver.find({},function(err,alldrivers){
    if(err){
      console.log(err);
    }else{
      res.render("drivers/index", { drivers:alldrivers,currentUser:req.user });
    }
    });
    });
    
    //CREATE- add new 
    router.post("/",middleware.isLoggedIn, function (req, res) {
      var name = req.body.name;
      var price=req.body.price;
      var licNo=req.body.licNo;
      var image = req.body.image;
      var place = req.body.place;
      var phone = req.body.phone;
      var password = req.body.password;
      var car = req.body.car;
      var reg = req.body.reg;
      var email = req.body.email;
    
    var author={
        id:req.user._id,
        username:req.user.username
    }
    //saving driver
      var newDriver = { name:name, image: image, licNo: licNo, place:place ,phone:phone,password:password,car:car,reg:reg,email,email,author:author,price:price };
      //create new driver and save to db
      driver.create(newDriver,function(err,newlyCreated){
    if(err)
    {
      console.log(err);
    }else{
        console.log(newlyCreated);
      res.redirect("/drivers");
    }
    User.register(new User({username:req.body.username}),req.body.password,function(err,user){
      if(err){
        console.log(err);
        return res.render("drivers/signup")
      }
      passport.authenticate("local")(req,res,function(){
        res.redirect("/drivers");
          });
        });
    
    }); 
    });
    
    
    router.get("/new",middleware.isLoggedIn, function (req, res) {
      res.render("drivers/new");
    });
    
    
    /*
    driver.create(
        {
                name: "Partha", 
             image: "https://pecb.com/conferences/wp-content/uploads/2017/10/no-profile-picture.jpg",
             licNo:"KA-23BGYDNRKSMSU",
             place:"vijayanagar",
             phone:"8096351423",
             password:"partha",
             car:"maruti suzuki",
             reg:": KA01A-9999",
             email:"partha@gmail.com" 
          },
            function(err, driver){
          if(err){
              console.log(err);
             } else {
                console.log("NEWLY CREATED CAMPGROUND: ");
                 console.log(driver);
             }
         });
    */
    
    
    
    //driver signup
    router.get("/signup", function (req, res) {
      res.render("drivers/signup");
    });
    
    router.post("/drivers/signup",function(req,res){
    
      User.register(new User({username:req.body.username}),req.body.password,function(err,user){
        if(err){
          console.log(err);
          return res.render("drivers/signup")
        }
        passport.authenticate("local")(req,res,function(){
          res.redirect("/drivers");
            });
          });
    });
    
    //driver login
   router.get("/login",function(req,res){
    res.render("drivers/login");
    });
    
    router.post("/drivers/login",passport.authenticate("local",{
      successRedirect:"/drivers",
      failureRedirect:"/drivers/login"     
     }),function(req,res){
     });
     
  router.get("drivers/logout",function(req,res){
    req.logout();
    res.redirect("/drivers");
     });
    
    
    //SHOW- info abt one driver
    router.get("/:id",function(req,res){
    //find required id
    driver.findById(req.params.id).populate("comments").exec(function(err,foundDriver){
      if(err){
    console.log(err);
      }else{  
        console.log(foundDriver)
    res.render("drivers/show",{driver:foundDriver});
      }
    });
    //render template
    });
    


    //edit
    router.get("/:id/edit",middleware.checkDriverOwnership,function(req,res)
    { 
    driver.findById(req.params.id,function(err,foundDriver){
         res.render("drivers/edit",{driver:foundDriver}); 
  });
});


  
    //update
    router.put("/:id",middleware.checkDriverOwnership,function(req,res){
      driver.findByIdAndUpdate(req.params.id,req.body.driver,function(err,updatedDriver){
        if(err){
          res.redirect("/drivers");
        }else{
          res.redirect("/drivers/"+req.params.id);
        }
      })
      });
      

    
    //delete
   router.delete("/:id",middleware.checkDriverOwnership,function(req,res){
      //destrou blog
      //redircect somewhere
      driver.findByIdAndRemove(req.params.id,function(err){
        if(err){
          res.redirect("/drivers");
        }else{
          res.redirect("/drivers");
        }
      });
   
    });
   

   router.get("/login",function(req,res){
    res.render("drivers/login");
    });
    


    //middleware
   
      
 
  


    module.exports=router;