import express from "express";
import {main,Post} from './models/posts.js';
let posts = [];
main();
let cursor = Post.find().cursor();
let document;
while ((document = await cursor.next()) !== null){
    console.log(document);
    console.log(typeof document); //object
    posts.push(document);

}
console.log(posts);

var app = express();
const port = 3000;
app.use(express.static('public'));


app.get("/",(req,res)=>{ //homepage
    
    res.render("home.ejs",{
        recentPosts:posts.slice(0,3)
    })
})

app.get("/about-me",(req,res)=>{
    res.render("about-me.ejs");
})

app.listen(port,(err)=>{
    if (err){
        console.log(err);
    }
    else{
        console.log(`Server started on port ${port}`);
    }
})
