const express = require( 'express');
const router = express.Router();
const contacting = require('../modals/contact-data');
router.get('/All-reponce',(req,res,next)=>{
    contacting.fatchAll((contact)=>{
        console.log(contact);
        res.render('responce',{
            responce:contact
        })
    })


router.post('/delete-res',(req,res,next)=>{
    contacting.deletebyid(req.body.id);
    console.log(req.body.id);
    res.redirect('/admin/All-reponce');
})
   
}) 
module.exports = router;