import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

type City = {
  name: string;
};

const bodyValidation: yup.SchemaOf<City> = yup.object().shape({
  name: yup.string().required().min(3),
});

export const create = async (req: Request<{}, {}, City>, res: Response) => {
  try {
    const validateData = await bodyValidation.validate(req.body, {
      abortEarly: false,
    });
    console.log(validateData);
    return res.status(StatusCodes.CREATED).send("created");
  } catch (error) {
    const yupError = error as yup.ValidationError;
    const errors: Record<string, string> = {};

    yupError.inner.forEach((e) => {
      if (e.path) errors[e.path] = e.message;
    });

    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors });
  }
};
