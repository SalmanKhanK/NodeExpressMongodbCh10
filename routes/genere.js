
const {Genre,validate}=require('../models/generes');
const express=require('express');
const auth=require('../middleware/auth');
const admin=require('../middleware/admin');
const router=express.Router();

router.get('/',async(req,res,next)=>{
    try{
      const genre=await Genre.find().sort('name');
      res.send(genre);
    }
    catch(ex){
        next(ex);
    }
});

router.post('/',auth, async(req,res)=>{
    const {error}=validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let genre=await Genre({name:req.body.name});

   genre=await genre.save();

    res.send(genre);
});
router.delete('/:id', [auth,admin], async(req,res)=>{
    const genre=await Genre.findByIdAndRemove(req.params.id);
    if (!genre) return res.status(404).send("Given id is not present");
    res.send(genre);
})
module.exports=router;