   
   module.exports=function(req,res,next){
       //401 //which means invalid webtoken
       //403 which mean webtoken is provided but can not accesss resourse
       if(!req.users.isAdmin) return res.status(403).send("Access denied!")
       next();
   }