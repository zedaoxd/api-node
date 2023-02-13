import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";

export const count = async (filter: string = "") => {
  try {
    const [{ total }] = await Knex(ETableNames.cidade)
      .where("nome", "like", `%${filter}%`)
      .count<[{ total: number }]>("* as total");

    return total;
  } catch (error) {
    console.log(error);
    return 0;
  }
};
