const fs = require('fs');
const path = require('path');
let contacts = [];
module.exports = class contact{
    constructor(name,email,number,course,gender){
        this.name = name;
        this.email =  email;
        this.number = number;
        this.course = course;
        this.gender = gender;

    }
    save(){
        this.id = Math.random().toString();
        const p = path.join(path.dirname(process.mainModule.filename),'data','contact.json');
        fs.readFile(p,(err,filecontant)=>{
            if(!err){
                contacts = JSON.parse(filecontant);
            }
            contacts.push(this);
            // console.log(contacts);
            fs.writeFile(p,JSON.stringify(contacts),(err)=>{
                console.log(err);
            });
        });

    }
    static fatchAll(cb){
        // return products;
        const p = path.join(path.dirname(process.mainModule.filename),'data','contact.json');

        fs.readFile(p,(err,filecontant)=>{
            if(err){
                console.error("Error reading contact file:", err);
              cb([]);
            }
            else{cb(JSON.parse(filecontant));}
        });

    }

    static deletebyid(id,cb){
        const p = path.join(path.dirname(process.mainModule.filename),'data','contact.json');

        fs.readFile(p,(err,filecontant)=>{
            if(err){
              cb([]);
            }
             const presentdata=(JSON.parse(filecontant));
             const index = presentdata.findIndex(todel=>todel.id === id);
             presentdata.splice(index,1);
            console.log(presentdata);
            fs.writeFile(p,JSON.stringify(presentdata,null,2),(err)=>{
                if(err){
                    console.error(err);
                }
            });
        });

        

    }
}
