import { io } from "@/server";
import { makeFetchPostRepository } from "@/use-cases/factories/make-fetch-posts";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";


export async function Fetch(req:FastifyRequest, reply:FastifyReply) {
    try {
          const PostarBodySchema  = z.object({
             query:z.string().optional()
          })
       
          const {query} = PostarBodySchema.parse(req.query)

          const usecase = makeFetchPostRepository()
          const {Posts} =await usecase.execute({
              query:query
          })

          
       

          return reply.status(201).send(Posts)
    } catch (error) {
        throw error
    }
    
}