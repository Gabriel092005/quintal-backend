import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import { Server } from "socket.io";
import { UsersRoutes } from "./http/controllers/users/routes";
import { env } from "./Env";
import cors  from'@fastify/cors'
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";
import multipart from '@fastify/multipart'
import path from 'path'
import { postsRoutes } from "./http/controllers/posts/routes";
import fastifyStatic from '@fastify/static'
import { MessagesRoutes } from "./http/controllers/messages/routes";
import { CommentsRoutes } from "./http/controllers/comments/routes";




// ... (imports permanecem iguais)

const app = Fastify();
const server = app.server;

// Configurações essenciais
app.register(multipart);
// app.register(fastifyStatic, {
//   root: path.join(__dirname, "./http/controllers/uploads"),
//   prefix: "/uploads/",
// });local

app.register(fastifyStatic, {
  root: path.join(__dirname,"uploads"),
  prefix: "/uploads/",
});

app.register(fastifyStatic, {
  root: path.join(__dirname, '..', 'dist'),
  prefix: "/",
});

app.setNotFoundHandler((req, reply) => {
  reply.type("text/html").sendFile("index.html");
});

// Segurança e Autenticação
  app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: { cookieName: 'refreshToken', signed: false },
  sign: { expiresIn: '10m' }
});

app.register(fastifyCookie);

// CORS Aprimorado
app.register(cors, {
  origin: [
    'https://quintal.onrender.com',
    'http://localhost:5173'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  credentials: true,
  exposedHeaders: ['Authorization']
});

// Socket.IO
export const io = new Server(server, {
  cors: {
    origin: [
      'https://quintal.onrender.com',
      'http://localhost:5173'
    ],
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Rotas
app.register(UsersRoutes);
app.register(postsRoutes);
app.register(MessagesRoutes);
app.register(CommentsRoutes);

// Socket Events
io.on("connection", (socket) => {
  console.log("Cliente conectado:", socket.id);
  socket.on("register", (userId) => {
    socket.join(userId);
  });
  socket.on("disconnect", () => {
    console.log("Cliente desconectado:", socket.id);
  });
});

// Inicialização
const start = async () => {
  try {
    await app.listen({
      port: env.PORT,
      host: '0.0.0.0'
    });
    console.log("Servidor rodando 🐱‍🏍");
  } catch (err) {
    console.error("Erro ao iniciar o servidor:", err);
    process.exit(1);
  }
};

start();