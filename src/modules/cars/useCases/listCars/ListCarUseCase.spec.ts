import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { ListCarsUseCase } from "./ListCarUseCase"

let listCarsUseCase: ListCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {

   beforeEach(() => {
      carsRepositoryInMemory = new CarsRepositoryInMemory();
      listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
   })

   it("Shold be able to list all available cars", async () => {

      const car = await carsRepositoryInMemory.create({
            name: "Car 1",
            description: "Top de linha",
            daily_rate: 180.00,
            license_plate: "IIJ-1111",
            fine_amount: 110.00,
            brand: "Car 1",
            category_id: "category_if",
      })

      const cars = await listCarsUseCase.execute()
      
      expect(cars).toEqual([car])
   })
})