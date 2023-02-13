import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("ControllerCity - UpdateById", () => {
  beforeEach(async () => {
    await testServer.post("/cities").send({
      nome: "Test",
    });
  });

  test("ShouldReturnStatus200WhenIdIsValidAndValidBody", async () => {
    const res1 = await testServer.put("/cities/1").send({ nome: "São Paulo" });

    expect(res1.status).toEqual(StatusCodes.OK);
  });

  test("ShouldReturnStatus422WhenIdIsValidAndInvalidNameEmpty", async () => {
    const res1 = await testServer.put("/cities/1").send({ namee: "São Paulo" });

    expect(res1.status).toEqual(StatusCodes.UNPROCESSABLE_ENTITY);
    expect(res1.body).toHaveProperty("errors.body.nome");
    expect(res1.body.errors.body.nome).toEqual("Este campo é obrigatório");
  });

  test("ShouldReturnStatus422WhenIdIsValidAndNameLessThen3", async () => {
    const res1 = await testServer.put("/cities/1").send({ nome: "Sã" });

    expect(res1.status).toEqual(StatusCodes.UNPROCESSABLE_ENTITY);
    expect(res1.body).toHaveProperty("errors.body.nome");
    expect(res1.body.errors.body.nome).toEqual(
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
    const res1 = await testServer.put("/cities/0").send({ nome: "Sã" });

    expect(res1.status).toEqual(StatusCodes.UNPROCESSABLE_ENTITY);
    expect(res1.body).toHaveProperty("errors.params.id");
    expect(res1.body).toHaveProperty("errors.body.nome");
    expect(res1.body.errors.params.id).toEqual("Deve ser maior que 0");
    expect(res1.body.errors.body.nome).toEqual(
      "Deve ter pelo menos 3 caracteres"
    );
  });
});
