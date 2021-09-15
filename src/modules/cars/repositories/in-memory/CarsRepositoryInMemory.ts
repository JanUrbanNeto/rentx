import { ICreateCarDTO } from "../../dtos/ICreateCarDTO";
import { Car } from "../../infra/typeorm-folder/entities/car";
import { ICarsRepository } from "../ICarsRepository";


class CarsRepositoryInMemory implements ICarsRepository {

   cars: Car[] = [];

   async create({ name, description, daily_rate, license_plate, fine_amount, brand, category_id }: ICreateCarDTO): Promise<Car> {
      const car = await new Car();

      Object.assign(car, {
         name,
         description,
         daily_rate,
         license_plate,
         fine_amount,
         brand,
         category_id
      });

      this.cars.push(car);

      return car;
   }

   async findByLicensePlate(license_plate: string): Promise<Car> {
      return this.cars.find((car) => car.license_plate === license_plate);
   }
}

export { CarsRepositoryInMemory }