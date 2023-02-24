const port = 3000;

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
// const { findSourceMap } = require("module");

var listPosts = [];

const homeStartingContent = "This is only example of the text, nothing will happen here.";
const aboutStartingContent = "This is only example of the text, nothing will happen here.";
const contactStartingContent = "This is only example of the text, nothing will happen here.";

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

app.get("/home", function(req, res){
    
    res.render("home", {contentHome: homeStartingContent, listOfAllPosts: listPosts});
})

app.get("/about", function(req, res){

    res.render("about", {contentAbout: aboutStartingContent});
})

app.get("/contact", function(req, res){

    res.render("contact", {contentContact: contactStartingContent});
})

app.get("/compose", function(req, res){
    res.render("compose");
})

app.post("/compose", function(req, res){
    let postTitle = req.body.postTitle;
    let newPost = req.body.newPost;

    const post = {
        title: postTitle,
        content: newPost
    }

    listPosts.push(post);
    res.redirect("/home");

})

// app.get("/post", function(req, res){
//     res.render("post");
// })

app.get("/post/:postName", function(req, res){
    const serchingTitle = _.lowerCase(req.params.postName);
    listPosts.forEach(function(post) {
        const storedTitle = _.lowerCase(post.title);
        if (serchingTitle === storedTitle){
            res.render("post", {titlePost: post.title, contentPost: post.content});
        }
    });
})

app.listen(port, function(){
    console.log("Server is running on port " + port);
})