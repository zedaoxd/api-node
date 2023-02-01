import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middleware";

type City = {
  name: string;
};

export const createValidation = validation((getShema) => ({
  body: getShema<City>(
    yup.object().shape({
      name: yup.string().required().min(3),
    })
  ),
}));

export const create = async (req: Request<any, any, City>, res: Response) => {
  return res.status(StatusCodes.NOT_IMPLEMENTED).send("Não implementado");
};
