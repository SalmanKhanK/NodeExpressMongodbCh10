const winston=require('winston');
require('winston-mongodb');
module.exports=function(){


    // process.on('uncaughtException',(ex)=>{
//     console.log("we got an uncaught exception");
//     winston.error(ex.message,ex);
//     process.exit(1);
// });

    winston.exceptions.handle(
        new winston.transports.console({colorize:true,prettyPrint:true}),
        new winston.transports.File({filename:"uncaughtException.log"})
        
        )
    
    process.on('unhandledRejection',(ex)=>{
      throw ex;
    });
    
    winston.add(new winston.transports.File({filename:'logfile.log'}));
    winston.add(new winston.transports.MongoDB({
        db:'mongodb://localhost/authpractice',
        level:'info'
    }));
    const p=Promise.reject(new Error("something failed miserably"));
    p.then(()=>console.log("Done"));
}