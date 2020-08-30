const request = require('supertest');
const {User} =require('../../models/users');
const { Genre } = require('../../models/generes');
let server;
describe('/api/generes', () => {
    beforeEach(()=>{server=require('../../index')});
    afterEach(async()=>{
        await Genre.remove();
        server.close()})
   let token;
    const exec=()=>{
        return request(server).
        post("/api/genre").
        set("x-auth-token",token).
        send({name:"genres1"})
    };
    beforeEach(()=>{
         token=new User().generateAuthtoken();
    });
    it("Should return 401 if token is not provided",async()=>{
          token="";
         const res=await exec();
         expect(res.status).toBe(401);
    });
    it("Should return 400 if invalid token provided",async()=>{
        token="a";
       const res=await exec();
       expect(res.status).toBe(400);
  });
  it("Should return 200 if valid token provided",async()=>{
   const res=await exec();
   expect(res.status).toBe(200);
});
});
