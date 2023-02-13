import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";

export const getAll = async (
  page: number = 1,
  limit: number = 10,
  filter: string = "",
  id: number = 0
) => {
  try {
    const result = await Knex(ETableNames.cidade)
      .where("id", Number(id))
      .orWhere("nome", "like", `%${filter}%`)
      .offset((page - 1) * limit)
      .limit(limit);

    if (id > 0 && result.every((item) => item.id !== id)) {
      const resultById = await Knex(ETableNames.cidade)
        .where("id", Number(id))
        .first();

      if (result) {
        return [...result, resultById];
      }
    }

    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};
