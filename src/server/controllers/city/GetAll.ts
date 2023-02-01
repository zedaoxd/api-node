import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middleware";

type QueryProps = {
  page?: number;
  size?: number;
  filter?: string;
};

export const getAllValidation = validation((getShema) => ({
  query: getShema<QueryProps>(
    yup.object().shape({
      page: yup.number().notRequired().moreThan(0),
      size: yup.number().notRequired().moreThan(0),
      filter: yup.string().notRequired(),
    })
  ),
}));

export const getAll = async (
  req: Request<any, any, any, QueryProps>,
  res: Response
) => {
  console.log(req.query);
  return res.status(StatusCodes.NOT_IMPLEMENTED).send("Não implementado");
};
