import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { Cidade } from "../../database/models";
import { validation } from "../../shared/middleware";

type BodyProps = Omit<Cidade, "id">;

export const createValidation = validation((getShema) => ({
  body: getShema<BodyProps>(
    yup.object().shape({
      nome: yup.string().required().min(3),
    })
  ),
}));

export const create = async (
  req: Request<any, any, BodyProps>,
  res: Response
) => {
  return res.status(StatusCodes.CREATED).send("Não implementado");
};
