import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { Cidade } from "../../database/models";
import { CityProvider } from "../../database/providers/cidades";
import { validation } from "../../shared/middleware";

type ParamProps = {
  id?: number;
};

type BodyProps = Omit<Cidade, "id">;

export const updateByIdValidation = validation((getShema) => ({
  params: getShema<ParamProps>(
    yup.object().shape({
      id: yup.number().integer().required().moreThan(0),
    })
  ),
  body: getShema<BodyProps>(
    yup.object().shape({
      nome: yup.string().required().min(3).max(150),
    })
  ),
}));

export const updateById = async (
  req: Request<ParamProps, any, BodyProps>,
  res: Response
) => {
  const result = await CityProvider.update(req.params.id!, req.body as Cidade);

  if (!result) {
    return res.status(StatusCodes.NOT_FOUND).json({
      errors: {
        default: "Registro não encontrado",
      },
    });
  }

  return res.status(StatusCodes.OK).json("cidade atualizada com sucesso");
};
