import { Specification } from "../../../infra/typeorm-folder/entities/Specification";
import { getRepository, Repository } from "typeorm";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "../../../repositories/ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationsRepository {

   private repository: Repository<Specification>

   constructor() {
      this.repository = getRepository(Specification);
   }

   async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
      const specification = this.repository.create({
         name,
         description
      });

      await this.repository.save(specification);
      return specification;
   }

   async list(): Promise<Specification[]> {
      const specifications = await this.repository.find();
      return specifications;
   }

   async findByName(name: string): Promise<Specification> {
      const specification = await this.repository.findOne({ name });
      return specification;
   }

   async findByIds(ids: string[]): Promise<Specification[]> {
      const specifications = await this.repository.findByIds(ids)
      return specifications;
   }
}

export { SpecificationsRepository }