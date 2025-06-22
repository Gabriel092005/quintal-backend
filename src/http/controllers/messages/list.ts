import { makeListMessages } from "@/use-cases/factories/make-list-messages";
import { FastifyReply, FastifyRequest } from "fastify";

export  async function list(req:FastifyRequest, reply:FastifyReply){
    try {

          const usecase = makeListMessages()
          const {message} = await usecase.execute()
          return reply.status(201).send(message)

    } catch (error) {
        throw error
    }
    
}