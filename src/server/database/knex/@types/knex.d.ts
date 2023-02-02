import { Cidade } from "../../models";

declare module "knex/types/tables" {
  interface Tables {
    cidade: Cidade;
    //pessoa: IPessoa
    //usuario: IUsuario
  }
}
