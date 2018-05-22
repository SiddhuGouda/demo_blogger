 var express               = require("express"),
     mongoose              = require("mongoose"),
     bodyParser            = require("body-parser"),
     methodOverride        = require("method-override"),
     passport              = require("passport"),
     localStrategy         = require("passport-local"),
     passportLocalMongoose = require("passport-local-mongoose"),
     User                  = require("./models/user"),
     Blog                  = require("./models/blogs"),
     app                   = express();

        var blogRoutes     = require("./routes/blog"),
            indexRoutes    = require("./routes/index");             
            
//Connect To Database
// mongoose.connect("mongodb://localhost/blog_demo");
mongoose.connect("mongodb://siddhu:kyliejenner@ds231090.mlab.com:31090/blog");

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({extended: true})); 
app.use(require("express-session")({
	secret: "I love kylie Jenner",
	resave: false,
	saveUninitialized: false
})) 
app.use(passport.initialize());
app.use(passport.session()); 
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  next();
});

app.use(blogRoutes);
app.use(indexRoutes);

app.listen(3000, function(){
	console.log("Server started on Port number 3000");
});