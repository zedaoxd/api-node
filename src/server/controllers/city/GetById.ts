import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { CityProvider } from "../../database/providers/cidades";
import { validation } from "../../shared/middleware";

type ParamProps = {
  id?: number;
};

export const getByIdValidation = validation((getShema) => ({
  params: getShema<ParamProps>(
    yup.object().shape({
      id: yup.number().integer().required().moreThan(0),
    })
  ),
}));

export const getById = async (req: Request<ParamProps>, res: Response) => {
  const result = await CityProvider.getById(req.params.id!);

  if (result === undefined) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: "Registro não encontrado",
      },
    });
  }

  return res.status(StatusCodes.OK).json(result);
};
