var express = require("express"),
    router = express.Router();
var Blog = require("../models/blogSchema");


router.get("/blogs", function(req, res){
    Blog.find({}, function(err, allBlogs){
        if(err){
            console.log(err);
        }else{
            res.render("blog/index", {blogs:allBlogs}); 
        }
    });
});

router.post("/blogs", function(req,res){
    var name= req.body.name;
    var image= req.body.image;
    var desc = req.body.description;
    var newBlog = {name: name, image: image, description:desc};
    Blog.create(newBlog, function(err, newlyCreated){
      if(err){
          console.log(err);
      }else{
            res.redirect("/blogs");
      }
    });
})
//new blog page
router.get("/blogs/new", function(req, res){
   res.render("blog/new"); 
});

router.get("/blogs/:id", function(req, res){
  Blog.findById(req.params.id, function(err, foundBlog){
      if(err){
          console.log(err);
      } else{
          res.render("blog/show", {blog:foundBlog});
      }
  });
});

module.exports = router;