import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("ControllerCity - GetById", () => {
  beforeEach(async () => {
    await testServer.post("/cities").send({
      nome: "Test",
    });
  });

  test("ShouldReturnStatus200WhenIdIsValid", async () => {
    const res1 = await testServer.get("/cities/1");

    expect(res1.status).toEqual(StatusCodes.OK);
  });

  test("ShouldReturnStatus422WhenIdIsZero", async () => {
    const res1 = await testServer.get("/cities/0");

    expect(res1.status).toEqual(StatusCodes.UNPROCESSABLE_ENTITY);
  });

  test("ShouldReturnStatus422WhenIdIsString", async () => {
    const res1 = await testServer.delete("/cities/testString");

    expect(res1.status).toEqual(StatusCodes.UNPROCESSABLE_ENTITY);
    expect(res1.body).toHaveProperty("errors.params.id");
    expect(res1.body.errors.params.id).toEqual("Formato digitado é invalido");
  });
});
