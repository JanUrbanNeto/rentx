import { ICreateCarDTO } from "../../dtos/ICreateCarDTO";
import { Car } from "../../infra/typeorm-folder/entities/Car";
import { ICarsRepository } from "../ICarsRepository";


class CarsRepositoryInMemory implements ICarsRepository {

   cars: Car[] = [];

   async create({ id, name, description, daily_rate, license_plate, fine_amount, brand, category_id }: ICreateCarDTO): Promise<Car> {
      const car = await new Car();

      Object.assign(car, {
         id,
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

   async findById(id: string): Promise<Car> {
      return this.cars.find((car) => car.id === id);
   }

   async findByLicensePlate(license_plate: string): Promise<Car> {
      return this.cars.find((car) => car.license_plate === license_plate);
   }

   async findAvailable(brand?: string, category_id?: string, name?: string): Promise<Car[]> {
      const availableCars = this.cars.filter(
         (car) => {
            if (car.available === true ||
               (brand && car.brand === brand) ||
               (category_id && car.category_id === category_id) ||
               (name && car.name === name)) {
               return car;
            }
            return null;
         }
      )
      return availableCars;
   }
}

export { CarsRepositoryInMemory }