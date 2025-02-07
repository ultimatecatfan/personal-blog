import mongoose from "mongoose";
import 'dotenv/config';

//const url = process.env.DB_URL;
const url = process.env.MONGO_URI;

let posts = [];

const postShema = new mongoose.Schema({
    date: {type: Date, default: Date.now() }, //sets default date
    title: String,
    slug: String,
    image: String,
    body: String
})

const Post = mongoose.model('Post',postShema);


async function main(){
    console.log(`The url is: ${url}`);
    try {
        await mongoose.connect(url); //database connection string
        console.log("successful connection to mongoDB");
    }
    catch (error){
        console.log(error);
    }

    
}

main()


posts.push(new Post({
    title: "Teaching Assistant for LLB Law of Torts class",
    slug: "teaching-assistant-torts",
    image: "law-of-torts",
    body: "I am pleased to announce that I have received a teaching position in SMU!<br>I thoroughly enjoyed learning the Law of Torts when I was taking the module. It was fascinating learning about what Prof Jerrold Soh termed the law of misadventures. I was fascinated by the diversity of cases which we had to read as part of the module, as they covered a range of fact situations from road accidents to exorcisms (yes, literally), medical negligence, and so much more.<br> I hope that the students who are in the class I am helping to teach will thoroughly enjoy their time in class as well."
}));

posts.push(new Post({
    title:"A review of Giovanni's room",
    slug: "review-giovannis-room",
    image:"giovanni's-room",
    body: "Giovanni's room, written by the inimitable James Baldwin, is an absolutely fantastic work. Following the story of David, an American who has abruptly left the States for France — leaving behind his estranged father, who desperately seeks to find information about why his son has abandoned him. We learn that David is bisexual, or even homosexual, having had a past sexual and emotional relationship with a childhood friend named Joey, whom David deserted out of shame and terror about his own sexuality.<br> He proposes to a woman, Hella, who is beautiful and mischievous, in hopes that this socially acceptable relationship would serve as an anchor for him. Hella, struggling with indecision, escapes to Spain for a few months in order to make up her mind. While Hella is away, David hangs around seedy gay bars in Paris, and meets Giovanni, a very beautiful Italian bartender. Giovanni shares his bleak views on the world. There is an undeniable, electrifying spark between the two of them, an instant chemistry. The two soon begin a passionate relationship, one that is destined to doom and which leaves an indelible mark on both of them. <br> It is not so much a story about David's sexuality but rather his inability to love anyone -- he cannot love Giovanni or Hella; and, most importantly, he is unable to love himself. David's story is marked by shame. Convinced that he would eventually become his drunken and possibly womanising father, David follows in his footsteps and too ends up drowning his sorrows at the bottom of a bottle. Ashamed of his budding bisexuality as a child, David abandons Joey. He loves Giovanni, and the two of them have an intense sexual and emotional relationship, yet he is terrified to commit fully to Giovanni and too leaves him, sealing Giovanni's tragic fate.<br> Significantly, when David expresses his desire to leave Paris and Giovanni behind in order to start a 'safe' life with a woman he does not particularly love, David says that he wishes to leave Giovanni's room -- that place where the two had made loved, fought, reconciled in. Throughout the entire novel, David adopts various methods of escape: drinking, pointless casual sex, and -- most destructive of all -- fleeing from those who love him.<br> I loved Giovanni as a character. He is beautiful, passionate and vulnerable. Whereas David is repressed, Giovanni is seemingly shameless and openly homosexual. However, very early on, we see glimpses of Giovanni's sadness. He does not much want to live, expressing to David that he wished to die many times before David arrived, and remarking that both the world and himself were dirty. I have encountered few male characters like him in Literature — so passionate, vulnerable, and compelling. "
}))

async function addPosts(newPost){
    
    let existing = await Post.findOne({title:newPost.title});
    if (existing){
        console.log("The post already exists!");
        
    }
    else{
        newPost.save().then(()=>{
            console.log("Your post has been saved!");
        
        }).catch(()=>{
            console.log("Failed to save post successfully!")
        });
        
    }
}

posts.forEach(newPost=>{
    addPosts(newPost);
})
            
export {main,Post,mongoose};
    




