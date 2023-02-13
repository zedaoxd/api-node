import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { CityProvider } from "../../database/providers/cidades";
import { validation } from "../../shared/middleware";

type QueryProps = {
  page?: number;
  size?: number;
  filter?: string;
  id?: number;
};

export const getAllValidation = validation((getShema) => ({
  query: getShema<QueryProps>(
    yup.object().shape({
      page: yup.number().notRequired().moreThan(0),
      size: yup.number().notRequired().moreThan(0),
      filter: yup.string().notRequired(),
      id: yup.number().integer().notRequired().default(0),
    })
  ),
}));

export const getAll = async (
  req: Request<any, any, any, QueryProps>,
  res: Response
) => {
  const query = req.query;

  const result = await CityProvider.getAll(
    query.page!,
    query.size!,
    query.filter!,
    query.id!
  );

  const size = await CityProvider.count(query.filter!);

  return res.status(StatusCodes.OK).json({ result, size });
};
