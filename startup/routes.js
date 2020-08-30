
const error=require('../middleware/error');
const user=require('../routes/user');
const genre=require('../routes/genere');
const auth=require('../routes/auth');
const express=require('express');
module.exports=function(app){
app.use(express.json());
app.use('/api/userRegister',user);
app.use('/api/auth',auth);
app.use('/api/genre',genre);
app.use(error);
}