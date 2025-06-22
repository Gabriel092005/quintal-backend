import { FastifyInstance } from "fastify";
import { send } from "./send";
import { verifyJWT } from "../middleware/verify-jwt";
import { list } from "./list";


export async function MessagesRoutes(app:FastifyInstance) {
    app.post('/send',{onRequest:[verifyJWT]} , send)
    app.get('/list',{onRequest:[verifyJWT]} , list)
    
}