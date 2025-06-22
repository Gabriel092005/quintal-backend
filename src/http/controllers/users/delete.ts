import { io } from "@/server";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function DeleteClients(req:FastifyRequest, reply:FastifyReply){
      const DeleteUserSchemaBody = z.object({
         userId:z.string()
      })
      
      const {userId} = DeleteUserSchemaBody.parse(req.body)
      try {
         //  const usecase  = makeDeleteUserRepository()
          
         //  await usecase.execute({
         //     id:userId
         //    })
            
       
          
    
                      
                   
         
   
         return reply.status(204).send()

       } catch (error:any) {
       
          throw error
       }

}