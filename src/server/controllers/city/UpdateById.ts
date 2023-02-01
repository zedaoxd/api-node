import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middleware";

type ParamProps = {
  id?: number;
};

type BodyProps = {
  name: string;
};

export const updateByIdValidation = validation((getShema) => ({
  params: getShema<ParamProps>(
    yup.object().shape({
      id: yup.number().integer().required().moreThan(0),
    })
  ),
  body: getShema<BodyProps>(
    yup.object().shape({
      name: yup.string().required().min(3),
    })
  ),
}));

export const updateById = async (
  req: Request<ParamProps, any, BodyProps>,
  res: Response
) => {
  console.log(req.params);
  console.log(req.body);

  return res.status(StatusCodes.OK).send("Não implementado");
};
