import { PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.get("/get-data", async (req, res) => {
  const t1 = new Date().getTime();
  const result = await prisma.post.findMany({
    include: {
      author: true,
    },
  });
  const t2 = new Date().getTime();
  return res.json({ timeTaken: `${t2 - t1}ms`, data: result });
});

const server = app.listen(3000, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000`)
);
