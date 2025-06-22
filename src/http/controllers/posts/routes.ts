import { FastifyInstance } from "fastify";
import { Postar } from "./postar";
import { verifyJWT } from "../middleware/verify-jwt";
import { Fetch } from "./fetch-posts";
import { Delete } from "./delete";
import { React } from "./react";
import { upload } from "@/utills/multer";


export async function postsRoutes(app:FastifyInstance) {
       app.post('/postar',{
        onRequest:[verifyJWT],
        
    
    },async(request,reply)=>{
       
            await new Promise<void>((resolve, reject) => {
              const uploadMiddleware = upload.single('image')
              uploadMiddleware(request.raw as any, reply.raw as any, (err) => {
                if (err) {
                  return reject(err)
                }
                resolve()
              })
            })
        
            // Copia as propriedades para o objeto Fastify
            request.body = (request.raw as any).body
            ;(request as any).file = (request.raw as any).file
        
            return Postar(request, reply)
    
       })
       app.get('/search/:query',{onRequest:[verifyJWT]}, Fetch)
       app.delete('/apagar-post', {onRequest:[verifyJWT]},Delete)
       app.post('/react', {onRequest:[verifyJWT]},React)
}