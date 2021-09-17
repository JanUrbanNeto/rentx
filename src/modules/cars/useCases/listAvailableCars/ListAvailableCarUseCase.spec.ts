import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarUseCase"

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {

   beforeEach(() => {
      carsRepositoryInMemory = new CarsRepositoryInMemory();
      listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
   })

   it("Shold be able to list all available cars", async () => {

      const car = await carsRepositoryInMemory.create({
         name: "Car 1",
         description: "Top de linha",
         daily_rate: 180.00,
         license_plate: "IIJ-1111",
         fine_amount: 110.00,
         brand: "Car 1",
         category_id: "category_id",
      })

      const cars = await listAvailableCarsUseCase.execute({})

      expect(cars).toEqual([car])
   })

   it("Should be able to list all available cars by brand", async () => {

      const car1 = await carsRepositoryInMemory.create({
         name: "Car 1",
         description: "Top de linha",
         daily_rate: 180.00,
         license_plate: "IIJ-1111",
         fine_amount: 110.00,
         brand: "Car brand 1",
         category_id: "category_id",
      })
/*
      const car2 = await carsRepositoryInMemory.create({
         name: "Car 2",
         description: "Top de linha",
         daily_rate: 180.00,
         license_plate: "IIJ-2222",
         fine_amount: 110.00,
         brand: "Car brand 2",
         category_id: "category_id",
      })
*/
      const cars = await listAvailableCarsUseCase.execute({ brand: "Car brand 1"})

      console.log(cars)
      expect(cars).toEqual([car1])
   })
})