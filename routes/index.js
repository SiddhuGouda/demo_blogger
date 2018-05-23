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


          //=======================================
          /*
            Here we are configuring our SMTP Server details.
            SMTP is mail server which is responsible for sending and recieving email.
          */
          //=======================================

          /*
          let transporter = nodeMailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'yourmailid@gmail.com',
                pass: 'yourabovemailidpassword'
            }
        });

        //=============================================================================
           Change the above ID with your Gmail ID and Password start using mail feature
        //==============================================================================

        let mailOptions = {
            from: '"Siddhu Gouda" <purplewebcreations@gmail.com>', // sender address
            to: email, // list of receivers
            html: '<b>Enjoy Blogger and keep blogging</b>' // html body
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message  sent:', email);
                res.redirect('/blogs');
            }); 

            */   

            res.redirect('/blogs');
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