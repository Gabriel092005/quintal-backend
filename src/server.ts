import Fastify, { FastifyRequest, FastifyReply } from "fastify";
import { Server } from "socket.io";
import { UsersRoutes } from "./http/controllers/users/routes";
import { env } from "./Env";
import OpenAI from 'openai'
import cors  from'@fastify/cors'
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";
import multipart from '@fastify/multipart'
import path from 'path'
import { postsRoutes } from "./http/controllers/posts/routes";
import fastifyStatic from '@fastify/static'
import { MessagesRoutes } from "./http/controllers/messages/routes";
import { CommentsRoutes } from "./http/controllers/comments/routes";




const app = Fastify();
const server = app.server;

app.register(multipart)

app.register(fastifyStatic, {
  root: path.join(__dirname, "./http/controllers/uploads"), 
  prefix: "/uploads/",
}); 



app.register(fastifyJwt,{
    secret : env.JWT_SECRET,
    cookie:{
        cookieName:'refreshToken',
        signed:false,
    },
    sign:{
        expiresIn : '10m'
    },

    
}) 



export const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Permite conexões do frontend
    methods: ["GET", "POST"],
  },
});

app.register(cors, {
  origin: 'http://localhost:5173', // Permite apenas o frontend (React)
  methods: ['GET', 'POST', 'PUT', 'DELETE ','PATCH'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
  credentials:true
});


// app.register(SensorRoutes)
app.register(UsersRoutes)
app.register(postsRoutes)
app.register(MessagesRoutes)
app.register(CommentsRoutes)
app.register(fastifyCookie)

io.on("connection", (socket) => {
  console.log("Cliente conectado:", socket.id);
   socket.on("register", (userId) => {
    socket.join(userId); // Associa o socket a uma "sala" com o ID do usuário
  });
  
  socket.on("disconnect", () => {
    console.log("Cliente desconectado:", socket.id);
  });
});


// Iniciar o servidor
const start = async () => {
  try {
    await app.listen(
      { port: env.PORT ,
        host:'0.0.0.0'

      }); // Usar await para garantir que o servidor esteja rodando
    console.log("Servidor rodando 🐱‍🏍");
  } catch (err) {
    console.error("Erro ao iniciar o servidor:", err);
    process.exit(1);
  }
};

start();