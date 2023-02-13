import * as create from "./Create";
import * as getAll from "./GetAll";
import * as getById from "./GetById";
import * as update from "./Update";
import * as deleteById from "./Delete";
import * as count from "./Count";

export const CityProvider = {
  ...create,
  ...getById,
  ...deleteById,
  ...update,
  ...getAll,
  ...count,
};
