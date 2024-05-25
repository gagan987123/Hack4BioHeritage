const fs = require('fs');
const path = require('path');
let reviews =[];
const p = path.join(path.dirname(process.mainModule.filename),'data','review.json');
module.exports = class review{
    constructor(data,name){
        this.data = data;
        this.name =name
        }

        save(){
const p = path.join(path.dirname(process.mainModule.filename),'data','review.json');
            

            fs.readFile(p,(err,filecontent)=>{
                if(!err){
                    // console.log(err);
                    console.log(this);
                    if(filecontent.length>0){
                    reviews = JSON.parse(filecontent);}
                    else{
                        console.log(err);
                    }
                }
               
                    reviews.push(this);
                
                fs.writeFile(p,JSON.stringify(reviews),(err)=>{
                    // console.log(err);
                });
            });

        }

        static fatchAll(cb){
const p = path.join(path.dirname(process.mainModule.filename),'data','review.json');

            fs.readFile(p,(err,filecontant)=>{
                if(err){
                    console.error("Error reading contact file:", err);
                  cb([]);
                }
                else{cb(JSON.parse(filecontant));}
            });
        }
}