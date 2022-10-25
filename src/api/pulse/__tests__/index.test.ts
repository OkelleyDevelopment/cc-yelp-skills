import server from "../../../server/server";
import request from "supertest";

describe("Testing the Pulse Endpoint /", () => {
  it('should return status code 200 with message "Hello World"', async () => {
    const res = await request(server).get("/");
    expect(res.statusCode).toEqual(200);
    expect(res.text).toEqual("Hello World!");
  });
});
