import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("ControllerCity - Create", () => {
  test("ShouldReturnStatus201WhenDataIsValid", async () => {
    const res1 = await testServer
      .post("/cities")
      .send({ nome: "Rio de Janeiro" });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
  });

  test("ShouldReturnStatus422WhenNameIsTooShort", async () => {
    const res1 = await testServer.post("/cities").send({ name: "Ri" });

    expect(res1.statusCode).toEqual(StatusCodes.UNPROCESSABLE_ENTITY);
    expect(res1.body).toHaveProperty("errors.body.nome");
  });

  test("ShouldReturnStatus422WhenDataIsEmpty", async () => {
    const res1 = await testServer.post("/cities");

    expect(res1.statusCode).toEqual(StatusCodes.UNPROCESSABLE_ENTITY);
    expect(res1.body).toHaveProperty("errors.body.nome");
  });
});
