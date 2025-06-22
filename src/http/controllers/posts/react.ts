import { makeReactPostRepository } from "@/use-cases/factories/make-react-posts";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";


export async function React(req:FastifyRequest, reply:FastifyReply) {
    try {
          const PostarBodySchema  = z.object({
             postId:z.number(),
             react:z.number()
          })
          const {react,postId} = PostarBodySchema.parse(req.body)
          console.log(req.body)
          const userId = req.user.sub
          const usecase = makeReactPostRepository()

          await usecase.execute({
            postId,
            react:react,
            userId:Number(userId)
          })
        
          return reply.status(204).send()
    } catch (error) {
          throw error
    }
    
}