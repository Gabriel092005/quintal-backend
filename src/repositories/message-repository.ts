import { messages } from "@prisma/client";

export interface messageRepository {
    send(content:string, userId:number):Promise<messages>
    list():Promise<messages[]>
}