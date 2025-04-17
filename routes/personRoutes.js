const express = require('express');
const router = express.Router();
const Person = require('./../models/person');

router.get('/',async(req,res)=>{
    try{
        const data = await Person.find();
        console.log("Data fetched");
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error : 'Internal server error'})
    }
})
router.put('/:id',async(req,res)=>{
    try{
        const personId = req.params.id;
        const data = req.body;

        const response = await Person.findByIdAndUpdate(personId,data);
        console.log('Data updated');
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Servee Error'});
    }
})
router.post('/',async(req,res)=>{
    try{
        const data = req.body;
        const newPerson = new Person(data);

        const response = await newPerson.save();
        console.log('data saved');
        res.status(200).json(response);
    }catch(error){
        console.log(error);
        res.status(500).json({error:'Internal Server Error'});
    }
})
router.put('/',async(req,res)=>{
    try{
        const data = req.body;

        const response = await Person.updateOne({name:data.name},{$set:{work:data.work}});
        console.log('data updated');
        res.status(200).json(response);
    }catch(error){
        console.log(error);
        res.status(500).json({error:'Internal Server Error'});
    }
})
router.get('/:work',async(req,res)=>{
    try{
        const workType = req.params.work;
        if(workType =='chef' || workType =='manager' || workType == 'waiter'){
            const response = await Person.find({work : workType});
            console.log("Fetched worktype");
            res.status(200).json(response);
        }else{
            res.status(404).json({error: 'Invalid work type'});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
})
router.delete('/:id',async(req,res)=>{
    try{
        const personId = req.params.id;
        const response = await Person.findByIdAndDelete(personId);
        if(!response) return res.status(404).json();
        console.log("Data deleted");
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error : "Internal Server Error"});
    }
})
module.exports = router;
