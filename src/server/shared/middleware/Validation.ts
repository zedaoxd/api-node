import { RequestHandler } from "express";
import { SchemaOf, ValidationError } from "yup";
import { StatusCodes } from "http-status-codes";

type TProperty = "body" | "header" | "params" | "query";

type TGetSchema = <T>(shema: SchemaOf<T>) => SchemaOf<T>;

type TAllSchemas = Record<TProperty, SchemaOf<any>>;

type TGetAllSchemas = (getShema: TGetSchema) => Partial<TAllSchemas>;

type Validation = (getAllSchemas: TGetAllSchemas) => RequestHandler;

export const validation: Validation = (getAllSchemas) => {
  return async (req, res, next) => {
    const schemas = getAllSchemas((schema) => schema);
    const errorsResult: Record<string, Record<string, string>> = {};

    Object.entries(schemas).forEach(([key, schema]) => {
      try {
        schema.validateSync(req[key as TProperty], { abortEarly: false });
      } catch (error) {
        const yupError = error as ValidationError;
        const errors: Record<string, string> = {};

        yupError.inner.forEach((e) => {
          if (e.path) errors[e.path] = e.message;
        });

        errorsResult[key] = errors;
      }
    });

    return Object.entries(errorsResult).length > 0
      ? res
          .status(StatusCodes.UNPROCESSABLE_ENTITY)
          .json({ errors: errorsResult })
      : next();
  };
};
