import request from "supertest";

import app from "../src/app";

describe("Test app.ts", () => {
  test("Catch-all route", async () => {
    const res = await request(app).get("/");
    expect(res.body).toEqual({ message: "Hello. This is a NodeJs Project updated 38b4b828-0fb9-428a-8d0b-8770184607aa" });
  });
});
