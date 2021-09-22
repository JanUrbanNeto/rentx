import { Router } from "express";
import multer from "multer";
import { CreateCarController } from "../../../../modules/cars/useCases/createCar/CreateCarController";
import { ListAvailableCarsController } from "../../../../modules/cars/useCases/listAvailableCars/ListAvailableCarController";
import { UploadCarImageController } from "../../../../modules/cars/useCases/uploadCarImage/UploadCarImageController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import uploadConfig from "../../../../config/upload";
import { CreateCarSpecificationController } from "../../../../modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";

const carsRoutes = Router();

const createCarController = new CreateCarController()
const listAvailableCarsController = new ListAvailableCarsController()
const createCarSpecificationController = new CreateCarSpecificationController()
const uploadCarImageController = new UploadCarImageController()

const uploadCarImage = multer(uploadConfig.upload("./tmp/cars"));

carsRoutes.post("/", ensureAuthenticated, ensureAdmin, createCarController.handle)
carsRoutes.get("/available", listAvailableCarsController.handle)
carsRoutes.post("/specifications/:id", ensureAuthenticated, ensureAdmin, createCarSpecificationController.handle)
carsRoutes.post("/images/:id", ensureAuthenticated, ensureAdmin, uploadCarImage.array("images"), uploadCarImageController.handle)

export { carsRoutes }