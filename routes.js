import express from "express";
import {main,Post} from './models/posts.js';
import {aboutInfo} from './models/about-info.js';

main();

async function getPosts(){
    try{
        let allPosts = await Post.find({});
        console.log("All posts have been successfully retrieved from database");
        return allPosts;
    }
    catch(err){
        console.log(`An error occurred when fetching the posts from the database: ${err}`);
    }
}

var app = express();
const port = 3000;
app.use(express.static('public'));

async function getDescription(){ //function to get the aboutinfo 
    try{
        let about = await aboutInfo.findOne({});
        console.log(`The about info is: ${about}`);
        return about;
    }
    catch(err){
        console.log(`There is an error in retrieving the about! ${err}`);
    }

}

app.get("/",async (req,res)=>{ //homepage
    try{
        let posts = await getPosts(); //wait for the posts to be successfully fetched from the getPosts method before continuing
    
        res.render("home.ejs",{
            recentPosts:posts.slice(0,3)
        })
    }
    catch(err){
        console.log(`An error occurred when trying to return the home page with the most recent posts: ${err}`);
    }
})

app.get("/about-me",async (req,res)=>{
    try{
        let about = await getDescription();
        res.render("about-me.ejs",{
            check:"Hello",
            description: about
        });
    }
    catch(err){
        console.log(`error in rendering the about-me page with the required description. ${err}`);
    }
})

app.listen(port,(err)=>{
    if (err){
        console.log(err);
    }
    else{
        console.log(`Server started on port ${port}`);
    }
})
