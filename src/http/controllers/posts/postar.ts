import { io } from "@/server";
import { makeCreatePostRepository } from "@/use-cases/factories/make-create-post";
import { makeFetchPostRepository } from "@/use-cases/factories/make-fetch-posts";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";


export async function Postar(req:FastifyRequest, reply:FastifyReply) {
    try {
          const PostarBodySchema  = z.object({
             content:z.string()
          })
          const {content} = PostarBodySchema.parse(req.body)
          const userId = req.user.sub

          const usecase = makeCreatePostRepository()
            
                 console.log(req.body)

 const file = (req as any).file as { filename: string } | undefined

 const image_path = file ? file.filename : null


          const {Post} =await usecase.execute({
            content,
            userId:Number(userId),
            image_path:image_path
          })

          return reply.status(201).send(Post)
    } catch (error) {
        throw error
        
    }
    
}