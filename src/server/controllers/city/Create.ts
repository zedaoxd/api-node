import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { Cidade } from "../../database/models";
import { CityProvider } from "../../database/providers/cidades";
import { validation } from "../../shared/middleware";

type BodyProps = Omit<Cidade, "id">;

export const createValidation = validation((getShema) => ({
  body: getShema<BodyProps>(
    yup.object().shape({
      nome: yup.string().required().min(3).max(150),
    })
  ),
}));

export const create = async (
  req: Request<any, any, BodyProps>,
  res: Response
) => {
  const result = await CityProvider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.CREATED).json(result);
};
