import { inject, injectable } from "tsyringe";

import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { AppError } from "@errors/AppError";

interface IRequest {
   name: string;
   description: string;
}

@injectable()
class CreateSpecificationUseCase {

   constructor(
      @inject("SpecificationsRepository")
      private specificationsRespository: ISpecificationsRepository
   ) {}

   async execute({ name, description }: IRequest): Promise<void> {
      const specificationAlreadyExists = await this.specificationsRespository.findByName(name);

      if(specificationAlreadyExists) {
         throw new AppError("Specification already exists");
      }

      await this.specificationsRespository.create({ name, description });
   }
}

export { CreateSpecificationUseCase }