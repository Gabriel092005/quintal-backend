import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository"
import { RegisterUseCase } from "../register"



export function makeRegisterUserCase (){
    
    const usersRepository = new PrismaUserRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    return registerUseCase
}