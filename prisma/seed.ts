import { citiesSeed } from "../src/data/cities";
import { prisma } from "../src/lib/prisma";

async function main() {
  //   await prisma.city.deleteMany();

  for (const citySeed of citiesSeed) {
    // const city = await prisma.city.create({
    //     data: citySeed,
    // });

    const city = await prisma.city.upsert({
      where: { slug: citySeed.slug },
      update: citySeed,
      create: citySeed,
    });

    console.log(`🏙️ City: ${city.name}`);
  }
}

try {
  await main();
} catch (error) {
  console.error(error);
  process.exit(1);
}

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (error) => {
//     console.error(error);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
