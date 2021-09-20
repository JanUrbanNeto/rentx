import { Specification } from "../../infra/typeorm-folder/entities/Specification";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "../ISpecificationsRepository";

class SpecificationRepositoryInMemory implements ISpecificationsRepository {

   private specifications: Specification[] = []

   async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
      const specification = new Specification();

      Object.assign(specification, {
         description,
         name
      })

      this.specifications.push(specification);
      
      return specification;
   }

   async findByName(name: string): Promise<Specification> {
      return this.specifications.find((specification) => specification.name === name)
   }

   async list(): Promise<Specification[]> {
      return this.specifications;
   }

   async findByIds(ids: string[]): Promise<Specification[]> {
      const selectedSpecifications = this.specifications.filter(
         (specification) => ids.includes(specification.id)
      );

      return selectedSpecifications;
   }  
}

export { SpecificationRepositoryInMemory }