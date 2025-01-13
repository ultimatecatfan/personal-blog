import express from "express";
import posts from './dummy-post.js';


var app = express();
const port = 3000;
app.use(express.static('public'));


app.get("/",(req,res)=>{ //homepage
    res.render("home.ejs",{
        recentPosts:posts.slice(0,3)
    })
})


app.listen(port,(err)=>{
    if (err){
        console.log(err);
    }
    else{
        console.log(`Server started on port ${port}`);
    }
})
