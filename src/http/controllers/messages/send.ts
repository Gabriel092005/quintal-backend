import { makeSendMessages } from "@/use-cases/factories/make-send-messages";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export  async function send(req:FastifyRequest, reply:FastifyReply){
    try {
          const  SendMessageBodySchema  = z.object({
               content:z.string()
          })

          const {content} = SendMessageBodySchema.parse(req.body)
          const userId = req.user.sub

          const usecase = makeSendMessages()
          
          const {message} = await usecase.execute({content:content, userId:Number(userId)})

          return reply.status(201).send(message)


    } catch (error) {
        throw error
    }
    
}