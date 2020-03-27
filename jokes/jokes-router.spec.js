const request = require("supertest");

const server = require("../api/server.js");


describe("jokes-router.js", function() {
    // it("test GET successful", async function() {
    //     const userCreds = {
    //         username: `${Math.floor(Math.random() * 10000)}`, //create a random generated username ID, since ID must be unique for each entry of user
    //         password: "testPass"
    //     }
    //     const registerResponse = await request(server)
    //                     .post("/api/auth/register")
    //                     .send(userCreds)

    //     const loginResponse = await request(server)
    //                           .post("/api/auth/login")
    //                           .send(userCreds)

    //     const getResponse = await request(server)
    //                         .get("/api/jokes")
    //                         .set('Authorization', loginResponse.body.token)


    //     const array = JSON.parse(getResponse.body);
    //     console.log('array', array)
    //     //expect(getResponse.body).toBe(expect.any(Array));
    //     //expect(getResponse).toBe(expect.arrayContaining(expect.any(Object)));
    //     expect(typeof array).toBe('array');
    // })

    it("test GET unsuccessful", async function() {
        const getResponse = await request(server)
                        .get("/api/jokes")

        
        //should fail with authenticate-middleware
        expect(getResponse.body).toStrictEqual({
            message: "You shall not pass!"
        })
    })
})