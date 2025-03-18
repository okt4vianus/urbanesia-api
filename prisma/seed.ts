import { citiesSeed } from "../src/data/cities";

import { prisma } from "../src/lib/prisma";

async function main() {
  for (const citySeed of citiesSeed) {
    const city = await prisma.city.upsert({
      where: { slug: citySeed.slug },
      update: citySeed,
      create: citySeed,
    });

    console.log(`🏙️ City: ${city.name}`);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
