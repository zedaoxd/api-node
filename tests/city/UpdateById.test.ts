import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("ControllerCity - UpdateById", () => {
  test("ShouldReturnStatus200WhenIdIsValidAndValidBody", async () => {
    const res1 = await testServer.put("/cities/1").send({ name: "São Paulo" });

    expect(res1.status).toEqual(StatusCodes.OK);
  });

  test("ShouldReturnStatus422WhenIdIsValidAndInvalidNameEmpty", async () => {
    const res1 = await testServer.put("/cities/1").send({ namee: "São Paulo" });

    expect(res1.status).toEqual(StatusCodes.UNPROCESSABLE_ENTITY);
    expect(res1.body).toHaveProperty("errors.body.name");
    expect(res1.body.errors.body.name).toEqual("Este campo é obrigatório");
  });

  test("ShouldReturnStatus422WhenIdIsValidAndNameLessThen3", async () => {
    const res1 = await testServer.put("/cities/1").send({ name: "Sã" });

    expect(res1.status).toEqual(StatusCodes.UNPROCESSABLE_ENTITY);
    expect(res1.body).toHaveProperty("errors.body.name");
    expect(res1.body.errors.body.name).toEqual(
      "Deve ter pelo menos 3 caracteres"
    );
  });

  test("ShouldReturnStatus422WhenIdIsZeroAndValidName", async () => {
    const res1 = await testServer.put("/cities/0").send({ name: "São" });

    expect(res1.status).toEqual(StatusCodes.UNPROCESSABLE_ENTITY);
    expect(res1.body).toHaveProperty("errors.params.id");
    expect(res1.body.errors.params.id).toEqual("Deve ser maior que 0");
  });

  test("ShouldReturnStatus422WhenIdIsZeroAndInvalidName", async () => {
    const res1 = await testServer.put("/cities/0").send({ name: "Sã" });

    expect(res1.status).toEqual(StatusCodes.UNPROCESSABLE_ENTITY);
    expect(res1.body).toHaveProperty("errors.params.id");
    expect(res1.body).toHaveProperty("errors.body.name");
    expect(res1.body.errors.params.id).toEqual("Deve ser maior que 0");
    expect(res1.body.errors.body.name).toEqual(
      "Deve ter pelo menos 3 caracteres"
    );
  });
});
