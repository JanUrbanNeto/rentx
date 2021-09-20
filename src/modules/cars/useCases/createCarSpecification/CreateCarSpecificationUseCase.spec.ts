import { AppError } from "../../../../errors/AppError";
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationRepositoryInMemory } from "../../repositories/in-memory/SpecificationRepositoryInMemory";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase"

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory:CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationRepositoryInMemory

describe("Create Car specification", () => {

   beforeEach(() => {
      carsRepositoryInMemory = new CarsRepositoryInMemory();
      specificationsRepositoryInMemory = new SpecificationRepositoryInMemory();
      createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepositoryInMemory, specificationsRepositoryInMemory);
   })

   it("Should be able to add a new specification to the car", async () => {

      const car = await carsRepositoryInMemory.create({
         name: "name car",
         description: "description car",
         daily_rate: 150,
         license_plate: "FFF-0000",
         fine_amount: 60,
         brand: "Brand car",
         category_id: "category"
      });

      const specification = await specificationsRepositoryInMemory.create({
         description: "specification test",
         name: "test"
      })

      const specifications_id = [specification.id];

      const specificationsCar = await createCarSpecificationUseCase.execute({ car_id: car.id, specifications_id });

      expect(specificationsCar).toHaveProperty("specifications");
      expect(specificationsCar.specifications.length).toBe(1);
   })

   it("should not be able to add a new specification to a non-existent car", async () => {
      expect(async () => {
         const car_id = "1234"
         const specifications_id = ["33", "12"]

         await createCarSpecificationUseCase.execute({ car_id, specifications_id })

      }).rejects.toBeInstanceOf(AppError);
   })
})