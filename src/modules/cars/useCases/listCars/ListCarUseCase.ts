import { Car } from "../../infra/typeorm-folder/entities/car";
import { ICarsRepository } from "../../repositories/ICarsRepository";

class ListCarsUseCase {

   constructor(
      private carsRepository: ICarsRepository
   ) {}

   async execute(): Promise<Car[]> {
      const cars = await this.carsRepository.findAvailable();

      return cars;
   }
}

export { ListCarsUseCase }