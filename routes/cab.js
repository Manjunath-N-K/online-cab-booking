
var express=require("express");
var router=express.Router({mergeParams:true});
var driver=require("../models/drivers");
var Comment=require("../models/comment");
var Cab=require("../models/cabs");
var User=require("../models/users");
var middleware=require("../middleware");




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
  
          Driver.findOneRandom( (err,foundDriver)=>{
            if(err) throw err;
  
            newCab.customerName = foundCust.name;
            newCab.driverName = foundDriver.name;
            newCab.carName = foundDriver.carName;
            newCab.regNo = foundDriver.regNo;
            newCab.save();
  
            //Add the cab to the driver
            foundDriver.cabs.push(newCab);
            foundDriver.save();
            //(ii)Add this cab to the user/
            foundCust.cabs.push(newCab);
            foundCust.save();
  
        })
       
        req.flash("success_msg","Cab successfully booked !!")
        res.redirect("/book/show");
        
    }) 
  
        });
   
  
  
  
  
  