const supertest = require("supertest");
const db = require('../data/connection')
const server = require("./server.js");

describe("server", function () {
    it("runs the tests", function () {
        expect(true).toBe(true);
    });

    describe("GET /", function () {
        it("should respond with 200 OK", function () {
            return supertest(server)
                .get("/")
                .then(res => {
                    expect(res.status).toBe(200);
                });
        });

        it("should respond with JSON", function () {
            return supertest(server)
                .get("/")
                .then(res => {
                    expect(res.type).toMatch(/json/i);
                });
        });

        it("should respond with api: 'up'", function () {
            return supertest(server)
                .get("/")
                .then(res => {
                    expect(res.body.api).toBe("up");
                });
        });
    });

    describe('GET/ getAll testing', () => {
        beforeEach(async () => {
            await db("hobbits").truncate()
            await db('hobbits').insert({ name: 'francisco' })
            await db('hobbits').insert({ name: 'marta' })

        })
        it('should return an array with 4 hobbit objects', () => {
            return supertest(server)
                .get('/hobbits')
                .then(res => {
                    const recieved = res.body
                    expect(recieved).toHaveLength(2)
                })
        })
        it('should return status 200', () => {
            return supertest(server)
                .get('/hobbits')
                .then(res => {
                    expect(res.status).toBe(200)
                })
        })
    })

    describe("POST/ ", () => {
        beforeEach(async () => {
            await db("hobbits").truncate()
            await db('hobbits').insert({ name: 'francisco' })
        })
        it('should create a resource aka our hobbit', () => {
            return supertest(server)
                .post('/hobbits')
                .send({ name: 'pippin' })
                .then(res => {
                    return supertest(server)
                        .get('/hobbits')
                        .then(res => {
                            expect(res.body).toHaveLength(2)
                        })
                })

        })
        it('should respond with status 201 for created', () => {
            return supertest(server)
                .post('/hobbits')
                .send({ name: 'pippin' }).then(res => {
                    expect(res.status).toBe(201)
                })
        })
    })

    describe('delete()', () => {
        beforeEach(async () => {
            await db("hobbits").truncate()
            await db('hobbits').insert({ name: 'francisco' })
        })

        it('should return a count of 1', () => {
        
            return supertest(server)
                .delete('/hobbits/1')
                
                .then(res => {
                    expect(res.body).toBe(1)
                })
        })

        it('should delete hobbit from DB', () => {
            return supertest(server)
            .delete('/hobbits/1')
            .then(res => {
                return supertest(server)
                .get('/hobbits')
                .then( res => {
                    expect(res.body).toHaveLength(0)
                })
            })
        })
        

    })

});
