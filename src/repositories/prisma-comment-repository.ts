import { Comment } from "@prisma/client";



export interface commenRepository{
      create(content:string, postsId:number,userId:number):Promise<Comment>
}