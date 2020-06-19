var express = require("express"),
    app = express(),
    methodOverride=require("method-override"),
    bodyParser = require("body-parser"),
    driver=require("./models/drivers"),
    seedDB=require("./seeds"),
    User=require("./models/users"),
    Cab=require("./models/cabs"),
    Comment=require("./models/comment"),
    passport=require("passport"),
    LocalStratergy=require("passport-local"),
    passportLocalMongoose=require("passport-local-mongoose"),
     flash=require("connect-flash"),
 mongoose = require("mongoose");

 //requiring routesclear

 var commentsRoutes=require("./routes/comments"),
     driverRoutes=require("./routes/drivers"),
     cabRoutes=require("./routes/cab"),
     userRoutes=require("./routes/user");

 //seedDB(); seed the database

  //session for login------passport configuration
app.use(require("express-session")({
secret:"taxi app",
resave:false,
saveUninitialized:false
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname+"/public"));
app.set("view engine", "ejs");

//overirdes the post to put,delete 
app.use(methodOverride("_method"));
app.use(flash());

//login passprt
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStratergy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
res.locals.currentUser=req.user;
res.locals.error=req.flash("error");
res.locals.success=req.flash("success");
next();
});

  //connect to db
mongoose.connect("mongodb://localhost:27017/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
},function(err){
  if(err){
    console.log(err);
  }else
  {
    console.log("mongo database connected");
  }
});


app.use("/",userRoutes);
app.use("/drivers",driverRoutes);
app.use("/drivers/:id/comments",commentsRoutes);



function isDLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/drivers/login");
}

//port connection
const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log("All Ok at the port :" + PORT));
