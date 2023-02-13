import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { Cidade } from "../../models";

export const update = async (id: number, cidade: Omit<Cidade, "id">) => {
  try {
    const result = await Knex(ETableNames.cidade)
      .where("id", id)
      .update(cidade)
      .returning("*");

    return result[0];
  } catch (error) {
    console.log(error);
    return false;
  }
};
