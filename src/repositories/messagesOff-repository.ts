// import { prisma } from "@/lib/prisma";
// import { MessagesOffRepository } from "./prisma/prisma-messagesOff";


// export class PrismaMessagesRepository implements MessagesOffRepository {
//    async DeleteMessages(Id: string){
//        await prisma.messages.delete({
//          where:{
//             id:Number(Id)
//          }
//        })
//        return null
//    }



 
//    async sendMessage(content: string,receiverId: number, senderId: number){
//       console.log("senderId:",senderId)

//       const senderExists = await prisma.user.findFirst({ where: { id: senderId } });
//       const receiverExists = await prisma.user.findFirst({ where: { id: receiverId } });
    
//       if (!senderExists) {
//         throw new Error('Sender ID does not exist');
//       }
    
//       if (!receiverExists) {
//         throw new Error('Receiver ID does not exist');
//       }
    
//         const messages = await prisma.messagesOff.create({
//            data:{
//             content:content,
//             receiverId:receiverId,
//             senderId:senderId
//            }
//         }) 
//         return messages
//     }

// }