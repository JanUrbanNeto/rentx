import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListAvailableCarsUseCase } from "./ListAvailableCarUseCase";


class ListAvailableCarsController {

   async handle(request: Request, response: Response): Promise<Response> {
      const { brand, name, category_id } = request.query;

      const listAvailableCarsController = container.resolve(ListAvailableCarsUseCase);

      const cars = await listAvailableCarsController.execute({
         brand: brand as string,
         name: name as string,
         category_id: category_id as string
      })
      
      return response.status(200).json(cars);
   }
}

export { ListAvailableCarsController }