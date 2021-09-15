import { AppError } from "../../../../errors/AppError";
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {

   beforeEach(() => {
      carsRepositoryInMemory = new CarsRepositoryInMemory()
      createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory)
   });

   it("Should be able to create a car", async () => {
      const car = await createCarUseCase.execute({
         name: "nameCar",
         description: "descriptionCar",
         daily_rate: 100,
         license_plate: "ABC-1234",
         fine_amount: 60,
         brand: "brandCar",
         category_id: "categoryCar"
      });

      expect(car).toHaveProperty("id");
   });

   it("Should not be able to register a car with an existing license plate.", async () => {
      
      expect(async () => {

         await createCarUseCase.execute({
            name: "nameCar1",
            description: "descriptionCar1",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 60,
            brand: "brandCar",
            category_id: "categoryCar"
         });

         await createCarUseCase.execute({
            name: "nameCar2",
            description: "descriptionCar",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 60,
            brand: "brandCar",
            category_id: "categoryCar"
         });

      }).rejects.toBeInstanceOf(AppError);
   });

   it("Should be able to create a car wich is default available", async () => {
      const car = await createCarUseCase.execute({
         name: "nameCarAvaileble",
         description: "descriptionCar",
         daily_rate: 100,
         license_plate: "ABC-4321",
         fine_amount: 60,
         brand: "brandCar",
         category_id: "categoryCar"
      });
   });
})