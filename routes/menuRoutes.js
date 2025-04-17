const express = require('express');
const router = express.Router();
const Menu = require('./../models/menu');

router.get('/',async(req,res)=>{
    try{
        const data = await Menu.find();
        console.log("Data fetched");
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error : 'Internal server error'})
    }
})
router.get('/:price',async(req,res)=>{
    try{
        const price = req.params.price;
        const data = await Menu.find({price:{$lt:price}});
        console.log("Data fetched");
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error : 'Internal server error'})
    }
})
router.put('/:id',async(req,res)=>{
    try{
        const menuId = req.params.id;
        const data = req.body;

        const response = await Menu.findByIdAndUpdate(menuId,data);
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
        const newDish = new Menu(data);

        const response = await newDish.save();
        console.log('data saved');
        res.status(200).json(response);
    }catch(error){
        console.log(error);
        res.status(500).json({error:'Internal Server Error'});
    }
})
router.delete('/:id',async(req,res)=>{
    try{
        const menuId = req.params.id;
        const response = await Menu.findByIdAndDelete(menuId);
        if(!response) return res.status(404).json();
        console.log("Data deleted");
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error : "Internal Server Error"});
    }
})
module.exports = router;