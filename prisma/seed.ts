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
    posts: {
      create: [...Array(10)].map(() => {
        return {
          title: randCatchPhrase(),
          content: randLines(),
          published: randBoolean(),
        };
      }),
    },
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
