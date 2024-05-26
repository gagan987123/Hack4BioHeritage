const express = require('express');
const contacts = require('../modals/contact-data');
const review =require('../modals/review');
const dotenv = require('dotenv');
dotenv.config();
const Groq = require("groq-sdk");
const request = require('request');
const router = express.Router();
const path = require('path');
const course ='web dev';
const data =[];
router.get('/',(req,res,next)=>{
    // const p = path.join(path.dirname(process.mainModule.filename),'views','index.html');

    // res.sendFile(  p );
   
 
    review.fatchAll((review)=>{
        res.render('index',{

            index:review
        })
    })
  
   
  
})
router.get('/animal',(req,res,next)=>{

    res.render('about-animal');
});

router.post('/animal_details',(req,res,next)=>{
    let animal = req.body.animal;
    
    request.get({
        url: 'https://api.api-ninjas.com/v1/animals?name=' + animal,
        headers: {
            'X-Api-Key': process.env.API_KEY
        },
    }, function(error, response, body) {
        if(error) {
            console.error('Request failed:', error);
            res.status(500).send('Error: Failed to fetch data from the API');
        } else if(response.statusCode != 200) {
            console.error('Error:', response.statusCode, body.toString('utf8'));
            res.status(response.statusCode).send('Error: Unexpected response from the API');
        } else {
            try {
                const data = JSON.parse(body);

                if(data && data.length > 0) {
                    // Extract the relevant attributes from the data
                    const { name, locations, characteristics } = data[0];
                    const { name_of_young, habitat, diet, common_name, lifespan, weight, height, 
                            group, color, skin_type, biggest_threat, most_distinctive_feature, 
                            scientific_name, estimated_population_size, age_of_weaning } = characteristics;

                    // Store them in a variable
                    const animalDetails = {
                        name,
                        locations,
                        name_of_young,
                        habitat,
                        diet,
                        common_name,
                        lifespan,
                        weight,
                        height,
                        group,
                        color,
                        skin_type,
                        biggest_threat,
                        most_distinctive_feature,
                        scientific_name,
                        estimated_population_size,
                        age_of_weaning
                    };

                    // Send the extracted data as a response
                    // console.log(animalDetails);
                    res.render('animal_details', { animalDetails });
                } else {
                    console.error('Error: No data found for animal:', animal);
                    res.status(404).send('Error: No data found for the requested animal');
                }
            } catch (parseError) {
                console.error('Error parsing JSON:', parseError);
                res.status(500).send('Error: Failed to parse API response');
            }
        }
    });
});
router.post('/ai',async(req,res,nest)=>{
    const data = req.body.data;
    const region = req.body.region;
    try{
        const groq = new Groq({
            apiKey: process.env.GROQ_API_KEY
        })
        async function main(groq){
            const chatcompletion = await getgroqchat(groq);
            
            const ans = chatcompletion.choices[0]?.message?.content || "";

            // console.log(ans);
            if(data || region){
            res.render('cources',{
                // aidata:((ans.replaceAll('**:',' :')).replaceAll('**',' ')).replaceAll('/n','<br>')
                aidata:ans.replaceAll('**','    ')
            })}else{ res.render('cources',{
                // aidata:((ans.replaceAll('**:',' :')).replaceAll('**',' ')).replaceAll('/n','<br>')
                aidata:"Please enter the data"
            })}
            // console.log(((ans.replaceAll('**:','</strong>:')).replaceAll('**','<strong>')).replaceAll('/n','<br>'));

            // res.send(((ans.replaceAll('**:','</strong>:')).replaceAll('**','<strong>')).replaceAll('/n','<br>'));
          
          
        }
        async function getgroqchat(groq){
           
            return groq.chat.completions.create({
                messages:[
                    {
                        role:"user",
                        content: 'methods to preserve ' + data + 'region' + region + '10 points'
                    }
                ],
                model:"llama3-8b-8192"
            });
        }
         await main(groq);
    }catch(err){
        console.log(err);
    
    }
 
  
})
 
router.get('/about',(req,res,next)=>{
    // const p = path.join(path.dirname(process.mainModule.filename),'views','about.html');

    // res.sendFile(p);
    res.render('about');
})
router.get('/donate',(req,res,next)=>{
    // const p = path.join(path.dirname(process.mainModule.filename),'views','about.html');

    // res.sendFile(p);
    res.render('donation');
})


router.get('/contact',(req,res,next)=>{
    // const p = path.join(path.dirname(process.mainModule.filename),'views','contact-us.html');
    // res.sendFile(p);
    res.render('contact-us');
})
router.post('/user-contact',(req,res,next)=>{
    // const p = path.join(path.dirname(process.mainModule.filename),'views','contact-us.html');
    // res.sendFile(p);
    const name = req.body.name;
    const email = req.body.email;
    const number = req.body.number;
    const problem = req.body.problem;
    const gender = req.body.gender;
    // console.log(name,email,number,course,gender);
    const contact = new contacts(name,email,number,problem,gender);
    contact.save();
    // data.push(name);
    // console.log(data);
    
    res.redirect('/');
})

router.get('/methods-of-preservation',(req,res,next)=>{
    // const p = path.join(path.dirname(process.mainModule.filename),'views','cources.html');
    // res.sendFile(p);
    res.render('cources',{
        aidata:null
    });
})

router.post('/add-review',(req,res,next)=>{
    const reviews = req.body.review;
    const name = req.body.name;
    const new_review = new review(reviews,name);
    new_review.save();
    res.redirect('/');
})

module.exports =router;