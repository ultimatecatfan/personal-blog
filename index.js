
import express from "express";
import {main,Post} from './models/posts.js';
import {aboutInfo} from './models/about-info.js';
import bodyParser from 'body-parser';
import 'dotenv/config';

async function startServer(){
    try{
        await main();
        var app = express();
        const port = process.env.PORT || 3000;
        app.use(express.static('public'));
        app.use(bodyParser.urlencoded({extended:true}));
        app.listen(port,(err)=>{
            if (err){
                console.log(err);
            }
            else{
                console.log(`Server started on port ${port}`);
            }
        })
        
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
        
        async function getSinglePostFromSearch(query){
            try{
                let matchingPosts = [];
                let allPosts = await getPosts();
                allPosts.forEach(post=>{
                    if (post.title.toLowerCase().includes(query.toLowerCase())){
                        //if the post title contains the query
                        matchingPosts.push(post); 
                    }
                    else if (post.body.toLowerCase().includes(query.toLowerCase())){
                        matchingPosts.push(post);
                    }
        
                })
                return matchingPosts;
            }
            catch(err){
                console.err(`An error occurred when trying to find the posts you were looking for. ${err}`)
            }
        }
        
        async function getSinglePost(postSlug){
            try{
                let foundPost = await Post.findOne({slug:postSlug});
                return foundPost;
            }
            catch(err){
                console.err(`Error loading the single post with matching title from the database! ${err}`);
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
        
        app.get("/all-posts",async(req,res)=>{
            try{
                let allPosts = await getPosts(); //all the posts from the database retrieved
                res.render("all-posts.ejs",{
                    posts:allPosts
                });
            }
            catch(err){
                console.log(`error when trying to return the all posts page: ${err}`);
            }
        })
        
        app.get("/:postSlug",async(req,res)=>{ //parameter: :postTitle
            try{
                let foundPost = await getSinglePost(req.params['postSlug']);
                if (foundPost){
                    console.log("There is a post that matches the post title.");
                }
                res.render("post.ejs",{post:foundPost});
            }
            catch(err){
                console.log("Error in loading the single post matching the post title.")
            }
        })
        
        app.post('/search',async(req,res)=>{
            let query = req.body.search;
            let matchingPosts = await getSinglePostFromSearch(query);
            if (matchingPosts.length > 0){
                res.render('found-posts.ejs',{posts:matchingPosts, length:matchingPosts.length}
                );
            }
            else{
                res.render('error-404.ejs');
            }
        
        })

    }
    catch(err){
        console.err(`Error in starting server: ${err}`);
    }
}

startServer();
