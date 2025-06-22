
import { makeFetchUsersRepository } from "@/use-cases/factories/make-fetch-users";
import { FastifyReply, FastifyRequest } from "fastify";

export async function FetchUsers(req:FastifyRequest, reply:FastifyReply){
       try {
         const usecase  = makeFetchUsersRepository()
         const users  =await usecase.execute()

         return reply.status(200).send(users)

       } catch (error) {
          return reply.send({error})
        
       }

}