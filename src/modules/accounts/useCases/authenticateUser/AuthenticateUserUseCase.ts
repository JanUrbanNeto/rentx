import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "../../repositories/IUsersRepository";
import { AppError } from "../../../../errors/AppError";


interface IRequest {
   email: string;
   password: string;
}

interface IResponse {
   user: {
      name: string;
      email:string
   },
   token: string;
}

@injectable()
class AuthenticateUserUseCase {

   constructor(
      @inject("UsersRepository")
      private usersRepository: IUsersRepository
   ) {}

   async execute({ email, password }: IRequest): Promise<IResponse> {
      const user = await this.usersRepository.findByEmail(email);

      if(!user) {
         throw new AppError("E-mail or password incorrect");
      }

      const passwordMatch = await compare(password, user.password);

      if(!passwordMatch) {
         throw new AppError("E-mail or password incorrect");
      }

      const token = sign({}, "1def80079470a49e2379eb0aac289ad46db7e0ad", {
         subject: user.id,
         expiresIn: "1d"
      });

      const tokenReturn: IResponse = {
         token,
         user: {
            name: user.name,
            email: user.email
         }
      }

      return tokenReturn;
   }
}

export {  AuthenticateUserUseCase }

   