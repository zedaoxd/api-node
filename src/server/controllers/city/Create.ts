import { Request, Response } from "express";
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
  return res.send("Create: " + JSON.stringify(req.body));
};
