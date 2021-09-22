import { CarImage } from "../infra/typeorm-folder/entities/CarImage";

interface ICarImageRepository {
   create(car_id: string, image_name: string): Promise<CarImage>;
}

export { ICarImageRepository }