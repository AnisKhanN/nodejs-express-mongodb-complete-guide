const request = require("supertest");
const app = require("../app");
describe("GET /", () => {
    it("it should return 200 OK", async () => {
        const response = await request(app).get("/").expect(200);
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ message: "Welcome to the Task Management API" });
    });
});