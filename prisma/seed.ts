import { PrismaClient, Prisma } from "@prisma/client";
import {
  randUser,
  randCatchPhrase,
  randLines,
  randBoolean,
} from "@ngneat/falso";
const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [...Array(1000)].map((_, i) => {
  const data = randUser();
  return {
    name: data.username,
    email: data.email,
  };
});

const postData: Prisma.PostCreateInput[] = [...Array(1000000)].map((_, i) => {
  const data = randCatchPhrase();
  return {
    title: data,
    published: randBoolean(),
    content: randLines(),
  };
});
async function main() {
  console.log(`Start seeding ...`);

  await Promise.all(
    userData.map(async (u) => {
      const user = await prisma.user.create({
        data: u,
      });
      console.log(`Created user with id: ${user.id}`);
    })
  );
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
