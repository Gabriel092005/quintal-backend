import { fastify } from "fastify";
import { ZodError } from "zod";
import { error } from "console";
import { env } from "./Env";


export const app = fastify()

app.setErrorHandler((Error,request,reply)=>{

    if(Error instanceof ZodError){

        return reply.status(400)
        .send( {
            message : 'validation error' , 
            issues:Error.format()
        })
    }
    
    if(env.NODE_ENV!=='production'){
        console.error(error)
        
    }

    return reply
  
    .status(500)
    .send(
        {message : 'internal server error'}
    ) 
})