import server from "../../../server/server";
import request from "supertest";

describe("Testing the milwaukee endpoint", () => {
  it("should return status 400 for missing query params", async () => {
    const res = await request(server).get("/reviews/milwaukee_ale_house");
    expect(res.statusCode).toEqual(500);
  });
});

describe("Testing the general reviews endpoint", () => {
  it("should return status 400 for missing query params", async () => {
    const res = await request(server).get("/reviews/");
    expect(res.statusCode).toEqual(400);
  });

  it("should return status 400 for missing location query param", async () => {
    const res = await request(server).get("/reviews/?business=speedys-pizza");
    expect(res.statusCode).toEqual(400);
  });

  it("should return status 400 for missing business query param", async () => {
    const res = await request(server).get("/reviews/?location=sylva");
    expect(res.statusCode).toEqual(400);
  });
});
