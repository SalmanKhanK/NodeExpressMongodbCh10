const express=require("express");
const mongoose=require("mongoose");
const jwt=require('jsonwebtoken');
const config=require('config');
const Joi = require("joi");
const Userschema=new mongoose.Schema({
    name:{
        type:String,
        minlength:5,
        maxlength:20,
        required:true
    },
    email:{
        type:String,
        minlength:12,
        maxlength:24,
        required:true,
        unique:true
    },
    password:{
        type:String,
        minlength:8,
        maxlength:255,
        require:true
    },
    isAdmin:Boolean
});
Userschema.methods.generateAuthtoken=function(){
    const token=jwt.sign({_id:this.id,isAdmin:this.isAdmin},config.get('jwtPrivateKey'));
    return token
}
const User=mongoose.model("User",Userschema);

function uservalidation(user){
    const schema={
        name:Joi.string().min(5).max(20).required(),
        email:Joi.string().min(12).max(24).required().email(),
        password:Joi.string().min(8).max(255).required()
    }
return Joi.validate(user,schema);
}
exports.User=User,
exports.validate=uservalidation