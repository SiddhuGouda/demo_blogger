var express    = require("express"),
    User       = require("../models/user"),
    passport   = require("passport"),
    router     = express.Router(),
    nodeMailer = require("nodemailer");

   

router.get("/register", function(req, res){
   res.render("register");
});

router.post("/register", function(req, res){

  var email = req.body.email;
	var newUser     = new User({username: req.body.username, email: email });
	User.register(newUser, req.body.password, function(err, user){
        if(err){
        	console.log("Error Something Went Wrong");
        	res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function(){
          console.log("Authentication started");
          let transporter = nodeMailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'purplewebcreations@gmail.com',
                pass: '59910113'
            }
        });
        let mailOptions = {
            from: '"Siddhu Gouda" <purplewebcreations@gmail.com>', // sender address
            to: email, // list of receivers
            //subject: req.body.subject, // Subject line
            //text: req.body.body, // plain text body
            html: '<b>NodeJS Email Tutorial</b>' // html body
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message  sent:', email);
                res.redirect('/blogs');
            });    
        });
       
	});

});

router.get("/login", function(req, res){
    res.render("login");
});

router.post("/login", passport.authenticate("local", {
	successRedirect: "/blogs",
	failureRedirect: "/login"
}), function(req, res){
});

router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
});

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
  	return next();
  }
  res.redirect("/login");
}

module.exports = router;