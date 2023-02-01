import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("ControllerCity - GetAll", () => {
  test("ShouldReturnStatus200", async () => {
    const res1 = await testServer.get("/cities");

    expect(res1.status).toEqual(StatusCodes.OK);
  });
});
