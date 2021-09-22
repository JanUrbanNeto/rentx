import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { Car } from "../../infra/typeorm-folder/entities/Car";
import { CarsRepository } from "../../infra/typeorm-folder/repositories/CarsRepository";
import { SpecificationsRepository } from "../../infra/typeorm-folder/repositories/SpecificationsRepository";
import { ICarsRepository } from "../../repositories/ICarsRepository";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

interface IRequest {
   car_id: string;
   specifications_id: string[];
}

@injectable()
class CreateCarSpecificationUseCase {

   constructor(
      @inject(CarsRepository)
      private carsRepository: ICarsRepository,
      
      @inject(SpecificationsRepository)
      private specificationRepository: ISpecificationsRepository
   ) {}

   async execute({ car_id, specifications_id }: IRequest): Promise<Car> {

      const carExists = await this.carsRepository.findById(car_id);

      if(!carExists) {
         throw new AppError("Car does not exist!")
      }

      const allSpecifications = await this.specificationRepository.findByIds(specifications_id)

      carExists.specifications = allSpecifications;

      await this.carsRepository.create(carExists)

      return carExists;
   }
}

export { CreateCarSpecificationUseCase }