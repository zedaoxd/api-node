import { Router } from "express";
import { CityController } from "../controllers";

const router = Router();

router.get("/", (req, res) => res.send("Olá, DEV!"));

router.post("/cities", CityController.createValidation, CityController.create);

export { router };
