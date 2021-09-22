import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { Car } from "../infra/typeorm-folder/entities/Car";

interface ICarsRepository {
   findById(id: string): Promise<Car>;
   create(data: ICreateCarDTO): Promise<Car>;
   findByLicensePlate(license_plate: string): Promise<Car>;
   findAvailable(brand?:string, category_id?: string, name?: string): Promise<Car[]>;
}

export { ICarsRepository }