import Fastify from "fastify";
import fastifyCookie from "@fastify/cookie";
import fastifySession from "@fastify/session";
import { Redis } from "ioredis";
import RedisStore from "connect-redis";
import dotenv from "dotenv";
import fastifyCors from "@fastify/cors";
import homeRouter from "./routes/home.routes.js";
import userRoutes from "./routes/user.routes.js";
import timerRouter from "./routes/timer.routes.js";
import taskRoutes from "./routes/task.routes.js";

dotenv.config();

if (!process.env.SECRET_SESSION) {
  throw new Error("A variável de ambiente SECRET_SESSION não está definida!");
}

const fastify = Fastify({ pluginTimeout: 30000 });

// Habilitar CORS
fastify.register(fastifyCors, {
  origin: "https://kairoz.onrender.com",
  methods: ["GET", "POST", "PUT", "DELETE"],
});

const store = new RedisStore.default({
  client: new Redis({
    enableAutoPipelining: true,
  }),
});

fastify.register(fastifyCookie, {});
fastify.register(fastifySession, {
  secret: process.env.SECRET_SESSION,
  cookie: { secure: false },
  store,
});

fastify.get("/", (request, reply) => {
  reply.send(request.cookies.sessionId);
});

const response = fastify.inject("/");
response.then((v) =>
  console.log(`

autocannon -p 10 -H "Cookie=${decodeURIComponent(
    v.headers["set-cookie"]
  )}" http://127.0.0.1:3000`)
);

// Registro das rotas
fastify.register(homeRouter);
fastify.register(userRoutes);
fastify.register(timerRouter);
fastify.register(taskRoutes);

export default fastify;
