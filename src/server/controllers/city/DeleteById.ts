import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { CityProvider } from "../../database/providers/cidades";
import { validation } from "../../shared/middleware";

type ParamProps = {
  id?: number;
};

export const deleteByIdValidation = validation((getShema) => ({
  params: getShema<ParamProps>(
    yup.object().shape({
      id: yup.number().integer().required().moreThan(0),
    })
  ),
}));

export const deleteById = async (req: Request<ParamProps>, res: Response) => {
  const result = await CityProvider.deleteById(req.params.id!);

  if (!result) {
    return res.status(StatusCodes.NOT_FOUND).json({
      errors: {
        default: "Registro não encontrado",
      },
    });
  }

  return res.status(StatusCodes.NO_CONTENT).send();
};
