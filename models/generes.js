const express=require('express');
const mongoose=require('mongoose');
const Joi=require('joi');

const genereSchema=new mongoose.Schema({
    name:{
        type:String,
        minlength:4,
        maxlength:25,
        required:true
    }
});
const Genre=mongoose.model('Genre',genereSchema);

function validateGenre(genre){
    const Schema={
        name:Joi.string().min(4).max(25).required()
    }
    return Joi.validate(genre,Schema);
}
exports.Genre=Genre,
exports.validate=validateGenre