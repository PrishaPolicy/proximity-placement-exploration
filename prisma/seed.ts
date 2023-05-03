import { PrismaClient, Prisma } from "@prisma/client";
import {
  randUser,
  randCatchPhrase,
  randLines,
  randBoolean,
} from "@ngneat/falso";
const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [...Array(100)].map((_, i) => {
  const data = randUser();
  return {
    name: data.username,
    email: data.email,
  };
});

const postData: Prisma.PostCreateManyInput[] = [...Array(1000)].map((_, i) => {
  return {
    title: randCatchPhrase(),
    published: randBoolean(),
    content: randLines(),
    authorId: Math.floor(Math.random() * 11) + 1,
  };
});
async function main() {
  console.log(`Start seeding ...`);

  const user = await prisma.user.createMany({
    data: userData,
  });

  await prisma.post.createMany({
    data: postData,
  });
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
