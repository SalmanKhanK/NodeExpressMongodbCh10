const express=require("express");
const mongoose=require("mongoose");
const error=require('./middleware/error');
const config=require('config');
const app=express();
const user=require('./routes/user');
const genre=require('./routes/genere');
const auth=require('./routes/auth');
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