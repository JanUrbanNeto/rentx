import { Category } from "../../infra/typeorm-folder/entities/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "../ICategoriesRepository";


class CategoriesRepositoryInMemory implements ICategoriesRepository {

   categories: Category[] = [];

   async findByName(name: string): Promise<Category> {
      const category = await this.categories.find((category) => category.name === name);
      return category;
   }

   async list(): Promise<Category[]> {
      const listCategories = this.categories;
      return listCategories;
   }

   async create({ name, description }: ICreateCategoryDTO): Promise<void> {
      const category = new Category();

      Object.assign(category, {
         name,
         description,
      });

      this.categories.push(category);

   }
}

export { CategoriesRepositoryInMemory }