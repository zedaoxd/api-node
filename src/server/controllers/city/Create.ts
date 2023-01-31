import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

type City = {
  name: string;
};

export const create = (req: Request<{}, {}, City>, res: Response) => {
  console.log(req.body.name);
  return res.status(StatusCodes.CREATED).send("created");
};
