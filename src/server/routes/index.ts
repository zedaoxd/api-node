import { Router } from "express";
import { CityController } from "../controllers";

const router = Router();

router.get("/", (req, res) => res.send("Olá, DEV!"));

router.get("/cities", CityController.getAllValidation, CityController.getAll);
router.get(
  "/cities/:id",
  CityController.getByIdValidation,
  CityController.getById
);
router.post("/cities", CityController.createValidation, CityController.create);
router.put(
  "/cities/:id",
  CityController.updateByIdValidation,
  CityController.updateById
);
router.delete(
  "/cities/:id",
  CityController.deleteByIdValidation,
  CityController.deleteById
);

export { router };
