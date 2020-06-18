var mongoose = require("mongoose");
var driver = require("./models/drivers");
var Comment   = require("./models/comment");
 
var data = [
    {
        name: "Nayan", 
        image: "https://pecb.com/conferences/wp-content/uploads/2017/10/no-profile-picture.jpg",
         place:"Hosa Road",
        phone:"8579461235",
        password:"mohan",
        car:"Maruti Suzuki Swift",
        reg:"KA123-4589",
     email:"mohan@gmail.com"
    },
    {
        name: "Karan", 
        image: "https://pecb.com/conferences/wp-content/uploads/2017/10/no-profile-picture.jpg",
        licNo:"KA-XQ1GtyWZtyLZz",
    place:"Hebbal",
    phone:"7854962135",
    password:"karan",
    car:"Maruti Suzuki Swift",
    reg:"KA123-1234",
    email:"karan@gmail.com"
    },
    {
        name: "Akash", 
        image: "https://image.shutterstock.com/image-photo/kolkata-india-april-25-2018-260nw-1452213149.jpg",
        licNo:"KA-XQ1GtyWZtyLZz",
    place:"Chandra Layout",
    phone:"8596471235",
    password:"akash",
    car:"Honda",
    reg:"KA145-98765",
    email:""
    }
]
 
function seedDB(){
   //Remove all campgrounds
Comment.remove({},function(err){
if(err){
    console.log(err);
}
    console.log("removed comments");
    driver.remove({}, function(err){
                                            if(err){
                                                console.log(err);
                                            }
                                            console.log("removed drivers!");
                                                //add a few campgrounds
                                                data.forEach(function(seed){
                                                driver.create(seed, function(err, driver){
                                                        if(err){
                                                            console.log(err)
                                                        } else {
                                                            console.log("added a driver");
                                                            //create a comment
                                                            Comment.create(
                                                                {
                                                                    text: "The cab was great, but I wish there was internet",
                                                                    author: "Homer"
                                                                }, function(err, comment){
                                                                    if(err){
                                                                        console.log(err);
                                                                    } else {
                                                                    driver.comments.push(comment);
                                                                        driver.save();
                                                                        console.log("Created new comment");
                                                                    }
                                                                });
                                                        }
                                                    });
                                                });

                                            });
                                    
  


});
  
}
 
module.exports = seedDB;