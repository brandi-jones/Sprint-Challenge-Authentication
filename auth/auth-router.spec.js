//register
//should return obj containing only id and username
//should return status 201

//login
//should return status 200
//should return a token if successfull
//should return "message: "You shall not pass! Wrong credentials!" if wrong creds
const request = require("supertest");

const server = require("../api/server.js");

describe("auth-router.js", function() {
    describe("register functionality", function () {
        it("should return 201 status at successful post", async function() {
            const newUser = {
                username: `${Math.floor(Math.random() * 10000)}`, //create a random generated username ID, since ID must be unique for each entry of user
                password: "testPass"
            }

            const response = await request(server)
                            .post("/api/auth/register")
                            .send(newUser)
 
            expect(response.status).toBe(201);
        })

        it("should return obj containing the id and username of created user", async function() {
            const newUser = {
                username: `${Math.floor(Math.random() * 10000)}`, //create a random generated username ID, since ID must be unique for each entry of user
                password: "testPass"
            }

            const response = await request(server)
                            .post("/api/auth/register")
                            .send(newUser)

            expect(response.body).toStrictEqual({
                id: expect.any(Number),
                username: newUser.username
            })
            
        })
        
        it("should return JSON", async function() {
            const newUser = {
                username: `${Math.floor(Math.random() * 10000)}`, //create a random generated username ID, since ID must be unique for each entry of user
                password: "testPass"
            }

            const response = await request(server)
                            .post("/api/auth/register")
                            .send(newUser)

            expect(response.type).toMatch(/json/i);
        })
    })

    describe("login functionality", function () {
        it("should return status 200 upon successful login", async function() {
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

            expect(loginResponse.status).toBe(200);
        })

        it("should return a token if successful", async function() {
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
            
            expect(loginResponse.body).toStrictEqual({
                token: expect.any(String)}
            )})
        it("should return wrong creds message if creds are incorrect", async function() {
            let userCreds = {
                username: `${Math.floor(Math.random() * 10000)}`, //create a random generated username ID, since ID must be unique for each entry of user
                password: "testPass"
            }
            const registerResponse = await request(server)
                            .post("/api/auth/register")
                            .send(userCreds)

            userCreds.password = "testChanged"; //change pass to wrong credentials to attempt a login with those creds

            const loginResponse = await request(server)
                                  .post("/api/auth/login")
                                  .send(userCreds)
            expect(loginResponse.body).toStrictEqual({
                message: "You shall not pass! Wrong credentials!" 
            })
        })
    })
})