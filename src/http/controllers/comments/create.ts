import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeCommentar } from "@/use-cases/factories/make-commentar";

export async function comment(req: FastifyRequest, reply: FastifyReply) {
  const commentBodySchema = z.object({
    content: z.string().min(1),
    postsId: z.number(),
  });

  try {
    const { content, postsId } = commentBodySchema.parse(req.body);
    const userId = Number(req.user.sub)


    const  usecase =  makeCommentar();

    const { comment } = await usecase.execute({
      content,
      postsId,
      userId
    });

    return reply.status(201).send({ comment });
  } catch (error) {
    console.error(error);
    return reply.status(400).send({
      message: "Erro ao criar comentário",
      error: error instanceof Error ? error.message : String(error),
    });
  }
}
