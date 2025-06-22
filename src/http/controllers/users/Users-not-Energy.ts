import { io } from "@/server";
import { makeGetUserClients } from "@/use-cases/factories/make-Get-user-Clients";
import { makeFetchNotEnergyUserCase } from "@/use-cases/factories/makeFetchusersNotEnergy";
import { FastifyReply, FastifyRequest } from "fastify";

export async function GetClientsNotEnergy(req:FastifyRequest, reply:FastifyReply){
       try {
         const usecase  = makeFetchNotEnergyUserCase()

         const {users} = await usecase.execute()
         io.emit("users",users)
   
         return reply.status(200).send(users)

       } catch (error) {
          return reply.send({error})
       }

}