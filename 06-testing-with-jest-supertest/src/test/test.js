const request = require("supertest");
const app = require("../app");

describe("API Endpoints Testing with Jest & Supertest", () => {
  describe("GET /", () => {
    it("should return 200 OK with welcome message", async () => {
      const response = await request(app).get("/").expect(200);
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        message: "Welcome to the Task Management API",
      });
    });
  });

  describe("POST /login", () => {
    it("should login user and return 200 OK", async () => {
      const payload = {
        email: "test@example.com",
        password: "password123",
      };

      const response = await request(app)
        .post("/login")
        .send(payload)
        .expect(200);

      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe("User logged in successfully");
      expect(response.body.data.email).toBe(payload.email);
    });
  });

  describe("POST /logout", () => {
    it("should logout user and return 200 OK", async () => {
      const response = await request(app).post("/logout").expect(200);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        message: "User logged out successfully",
      });
    });
  });
});