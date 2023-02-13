import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";

export const deleteById = async (id: number) => {
  try {
    const result = await Knex(ETableNames.cidade).where("id", id).del();

    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};
