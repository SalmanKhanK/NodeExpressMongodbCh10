require('express-async-errors');
const winston=require('winston');
require('winston-mongodb');
const express=require("express");
const mongoose=require("mongoose");
const error=require('./middleware/error');
const config=require('config');
const app=express();
const user=require('./routes/user');
const genre=require('./routes/genere');
const auth=require('./routes/auth');

// process.on('uncaughtException',(ex)=>{
//     console.log("we got an uncaught exception");
//     winston.error(ex.message,ex);
//     process.exit(1);
// });

winston.exceptions.handle(new winston.transports.File({
    filename:"uncaughtException.log"
}))

process.on('unhandledRejection',(ex)=>{
  throw ex;
});

winston.add(new winston.transports.File({filename:'logfile.log'}));
winston.add(new winston.transports.MongoDB({
    db:'mongodb://localhost/authpractice',
    level:'error'
}));

const p=Promise.reject(new Error("something failed miserably"));
p.then(()=>console.log("Done"));



if(!config.get('jwtPrivateKey')){
    console.error("Fatal error:private key is not defined");
    process.exit(1);
}
mongoose.connect("mongodb://localhost/authpractice")
.then(()=>console.log("Connected to mogodb"))
.catch(()=>console.error("Could not connect to mongodb"));
app.use(express.json());
app.use('/api/userRegister',user);
app.use('/api/auth',auth);
app.use('/api/genre',genre);
app.use(error);

const port=process.env.PORT || 3000;
app.listen(port,()=>console.log(`Listening on port ${port}...`));