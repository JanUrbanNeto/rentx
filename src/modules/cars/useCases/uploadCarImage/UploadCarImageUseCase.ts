import { inject, injectable } from "tsyringe";
import { ICarImageRepository } from "../../repositories/ICarImageRepository";

interface IRequest {
   car_id: string;
   images_names: string[];
}

@injectable()
class UploadCarImageUseCase {

   constructor(
      @inject("CarImageRepository")
      private carImageRepository: ICarImageRepository
   ) {}

   async execute({ car_id, images_names }: IRequest): Promise<void> {

      images_names.map(async (image) => {
         await this.carImageRepository.create(car_id, image);
      })
   }
}

export { UploadCarImageUseCase }