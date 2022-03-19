import { PrismaClient } from "@prisma/client";
import express from "express";
import { routes } from "./routes";

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3333, () =>
  console.log(`
🚀 Server ready at: http://localhost:3333
`)
);

export const prisma = new PrismaClient();
