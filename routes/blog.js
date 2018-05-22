var express  = require("express"),
    Blog     = require("../models/blogs"),
    passport = require("passport")
    router   = express.Router({mergeParams: true});


//==================
//Routes
//==================
router.get("/", function(req, res){
    res.render("index");
});

router.get("/blogs", function(req, res){
	Blog.find({}, function(err, blog){
      if(err){
         console.log("Something Went Wrong !!!Try Again Later")
      }else{
      	res.render("blogs", {blogs: blog});  
      }    
	});
});

router.post("/blogs", isLoggedIn, function(req, res){
   var username = req.body.username;
   var image    = req.body.image;
   var body     = req.body.body;
   var author   = {
   	         id   : req.user._id,
   	         user : req.user.username
   };
   var newUser = { username: username, image: image, body: body, author: author};
   Blog.create(newUser, function(err, newBlog){
   	if(err){
      console.log("Blog not added!!");
      res.render("new");
   	}else{
      res.redirect("/blogs"); 
   	}
   });
});

router.get("/blogs/new", isLoggedIn, function(req, res){
   res.render("new");
});

router.get("/blogs/:id", isLoggedIn, function(req, res){
  Blog.findById(req.params.id, req.body.blog, function(err, blog){
       if(err){
         console.log("Error Something Went Wrong!!!");
       }else{
       	res.render("show" , {blog: blog});
       }
  });
});

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
  	return next();
  }
  res.redirect("/login");
}

module.exports = router;