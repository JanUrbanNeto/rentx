import { container } from "tsyringe";
import { ICategoriesRepository } from "../../modules/cars/repositories/ICategoriesRepository";
import { CategoriesRepository } from "../../modules/cars/infra/typeorm-folder/repositories/CategoriesRepository";
import { ISpecificationsRepository } from "../../modules/cars/repositories/ISpecificationsRepository";
import { SpecificationsRepository } from "../../modules/cars/infra/typeorm-folder/repositories/SpecificationsRepository";
import { IUsersRepository } from "../../modules/accounts/repositories/IUsersRepository";
import { UsersRepository } from "../../modules/accounts/infra/typeorm-folder/repositories/UsersRepository";
import { ICarsRepository } from "../../modules/cars/repositories/ICarsRepository";
import { CarsRepository } from "../../modules/cars/infra/typeorm-folder/repositories/CarsRepository";

container.registerSingleton<ICategoriesRepository>(
   "CategoriesRepository",
   CategoriesRepository
);

container.registerSingleton<ISpecificationsRepository>(
   "SpecificationsRepository",
   SpecificationsRepository
);

container.registerSingleton<IUsersRepository>(
   "UsersRepository",
   UsersRepository
);

container.registerSingleton<ICarsRepository>(
   "CarsRepository",
   CarsRepository
);