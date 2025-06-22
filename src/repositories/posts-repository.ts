
import { Posts, Prisma,User } from "@prisma/client";


export interface postssRepository {
    delete(id:number):Promise<null>
    Create(data : Prisma.PostsCreateInput) : Promise<Posts>
    react(userId:number, postId:number, react:number):Promise<null>
    fetchPosts(name?:string):Promise<Posts[]>
}
