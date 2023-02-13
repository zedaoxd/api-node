import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { CityProvider } from "../../database/providers/cidades";
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
  const query = req.query;

  const result = await CityProvider.getAll(
    query.page!,
    query.size!,
    query.filter!
  );

  const totalElements = await CityProvider.count(query.filter!);

  // res.setHeader("access-control-expose-headers", "x-total-count");
  // res.setHeader(
  //   "x-total-count",
  //   (await CityProvider.count(query.filter!)).toString()
  // );

  return res.status(StatusCodes.OK).json({ result, totalElements });
};
