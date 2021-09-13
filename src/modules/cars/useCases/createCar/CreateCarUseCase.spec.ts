import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;

describe("Create Car", () => {

   beforeEach(() => {
      createCarUseCase = new CreateCarUseCase()
   })

   it("Should be able to create a car", async () => {
      await createCarUseCase.execute();
   })
})