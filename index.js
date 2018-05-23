 var express               = require("express"),
     mongoose              = require("mongoose"),
     bodyParser            = require("body-parser"),
     methodOverride        = require("method-override"),
     passport              = require("passport"),
     localStrategy         = require("passport-local"),
     passportLocalMongoose = require("passport-local-mongoose"),
     User                  = require("./models/user"),
     Blog                  = require("./models/blogs"),
     nodemailer            = require("nodemailer"),
     app                   = express();

        //Blog and Authentication Routes
        var blogRoutes     = require("./routes/blog"),
            indexRoutes    = require("./routes/index");             
            
//Connect To Database
mongoose.connect("mongodb://localhost/blog_demo");
// mongoose.connect("mongodb://siddhu:kyliejenner@ds231090.mlab.com:31090/blog");

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({extended: true})); 

app.use(require("express-session")({
	secret: "I love kylie Jenner",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session()); 
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  next();
});

/*
    Here we are configuring our SMTP Server details.
    STMP is mail server which is responsible for sending and recieving email.
*/
// var smtpTransport = nodemailer.createTransport({
//     service: "gmail",
//     host: "smtp.gmail.com",
//     auth: {
//         user: "gouda.siddhu@gmail.com",
//         pass: "gangster111"
//     }
// });
/*------------------SMTP Over-----------------------------*/

//Blog and auth Routes
app.use(blogRoutes);
app.use(indexRoutes);

var port = process.env.PORT || 3000;
app.listen(port, function(){
	console.log("Server started on Port number 3000");
});