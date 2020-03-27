const request = require("supertest");

const server = require("../api/server.js");


describe("jokes-router.js", function() {
    it("test GET successful", async function() {
        const userCreds = {
            username: `${Math.floor(Math.random() * 10000)}`, //create a random generated username ID, since ID must be unique for each entry of user
            password: "testPass"
        }
        const registerResponse = await request(server)
                        .post("/api/auth/register")
                        .send(userCreds)

        const loginResponse = await request(server)
                              .post("/api/auth/login")
                              .send(userCreds)

        const getResponse = await request(server)
                            .get("/api/jokes")
                            .set('Authorization', loginResponse.body.token)


 
        // let array = JSON.stringify(getResponse.body);
        // array = JSON.parse(array);
        // // expect(typeof array).toBe('array');
        // expect(array).toEqual(expect.arrayContaining({
        //    "id": "0189hNRf2g", 
        //    "joke": "I'm tired of following my dreams. I'm just going to ask them where they are going and meet up with them later."
        // }))

        expect(getResponse.status).toBe(200);
    })

    it("test GET unsuccessful", async function() {
        const getResponse = await request(server)
                        .get("/api/jokes")

        
        //should fail with authenticate-middleware
        expect(getResponse.body).toStrictEqual({
            message: "You shall not pass!"
        })
    })
})