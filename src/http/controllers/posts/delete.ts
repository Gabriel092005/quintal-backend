import { makeDeletePostRepository } from "@/use-cases/factories/make-delete-posts";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";


export async function Delete(req:FastifyRequest, reply:FastifyReply) {
    try {
          const PostarBodySchema  = z.object({
             id:z.number()
          })
          const {id} = PostarBodySchema.parse(req.body)
          const userId = req.user.sub
          const usecase = makeDeletePostRepository()

          await usecase.execute({
            postId:id,
            userId:Number(userId)
          })
        
          return reply.status(204).send()
    } catch (error) {
        
          throw error
    }
    
}