const request = require('supertest');
const {Genre} =require('../../models/generes');
const {User} =require('../../models/users');
let server;

describe("/api/genre", () => {
    beforeEach(() => { server = require('../../index'); })
    afterEach( async() => { server.close(); 
                    await Genre.remove({});
                });

    describe("GET /", () => {
        it("Should return all the genres", async () => {

            await Genre.collection.insertMany([
                {name:'genre1'},
                {name:'genre2'}
            ]);
            const res = await request(server).get("/api/genre");
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
            expect(res.body.some(g=>g.name==='genre2')).toBeTruthy();

            
        });
    });
    describe("GET /:id",()=>{
        it("Should return all the generes if valid id is given",async()=>{
             const genre= new Genre({name:"genre1"});
             await genre.save();
             const res=await request(server).get("/api/genre/"+genre._id);
             expect(res.status).toBe(200);
             expect(res.body).toHaveProperty("name",genre.name);
        });
        it("Should return 404 if invalid id is passes",async()=>{
            const res=await request(server).get("/api/genre/1");
            expect(res.status).toBe(404);
            
       });
    });
    describe("POST /",()=>{
         // define a function which helps to code cleaner
         let token;
         let name;
       const exec=async()=>{
           return await request(server)
            .post("/api/genre")
            .set("x-auth-token",token)
            .send({name});
        } 
        beforeEach(()=>{
            token=new User().generateAuthtoken();
            name="genere1";
        });     

        it("Should return 401 if client is not logged in",async()=>{
         token='';
         const res=await exec();
         expect(res.status).toBe(401);
        }); 
        it("Should return 400 if input is less than 4",async()=>{
           name="123";
           const res=await exec();
         expect(res.status).toBe(400);
        });
        it("Should return 400 if input is greater than 25",async()=>{
            name=new Array(50).join('s');
            const res=await exec();
         expect(res.status).toBe(400);
        });
        it("Should save the genere if it is valid",async()=>{
         await exec();
         const genre= await Genre.find({name:"gener1"});
         expect(genre).not.toBeNull();
        }); 
        it("Should return the genere if it is valid",async()=>{
        const res=await exec();
         expect(res.body).toHaveProperty('_id');
         expect(res.body).toHaveProperty("name","genere1");
        }); 
    });
    
});
