import { main, mongoose} from "./posts.js";

const aboutInfoSchema = new mongoose.Schema({
    body: String
})

const aboutInfo = mongoose.model('aboutInfo',aboutInfoSchema);

const bodyText = 'Being a naturally curious person, I thrive in nurturing environments that allow me to learn at my own pace. \n \
    I can be seen either clutching a book, learning new technology skills, or reading about global affairs. I possess a good work ethic and valuable skills ranging from various programming languages and data analysis and web development skills to legal analysis and writing skills. \n \
    I am currently learning Javascript, Pandas, and Intellectual Property Law. Having an innate sense of justice, I am highly concerned with issues of global humanitarian concern and enjoy helping the disadvantaged and voiceless. \n \
    Tune in to this blog to follow my journey for knowledge.';

async function checkExistingAndAdd(){
    try{

        let description = await aboutInfo.findOne();
        if (description){
            let updatedDescription = await aboutInfo.findOneAndUpdate({},{body:bodyText},{new:true});
            console.log(`The updated description is: ${updatedDescription}`);
            
        }
        else{
            try{
                await aboutInfo.create({body:bodyText});
                console.log("Successfully added new about me description!");
                
            }
            catch(error){
                console.error(error);
            }
        }

    }
    catch(err){
        console.error(`The description was not successfully updated due to error: ${err}`);
    }

}
checkExistingAndAdd();

export {aboutInfo}
