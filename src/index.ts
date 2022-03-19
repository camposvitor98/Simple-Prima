import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // ... you will write your Prisma Client queries here

  // await prisma.user.create({
  //   data: {
  //     name: "vitu",
  //     email: "vitu@prisma.io",
  //     password: "vitu123",
  //     profile: {
  //       create: { bio: "I am trying to learn this shit" },
  //     },
  //   },
  // });
  await prisma.user.deleteMany();
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
