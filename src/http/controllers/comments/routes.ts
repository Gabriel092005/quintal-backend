import { FastifyInstance } from "fastify";
import { comment } from "./create";
import { verifyJWT } from "../middleware/verify-jwt";


export async function CommentsRoutes(app:FastifyInstance) {
    app.post('/comentar',{onRequest:[verifyJWT]} ,comment)    
}