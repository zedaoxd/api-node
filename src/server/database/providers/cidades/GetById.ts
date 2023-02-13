import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";

export const getById = async (id: number) => {
  try {
    const result = await Knex(ETableNames.cidade).where("id", id).first();
    return result;
  } catch (error) {
    console.log(error);
    return new Error("Erro ao buscar o registro");
  }
};
