import { citiesSeed } from "../src/modules/city/data";
import { placesSeed } from "../src/modules/place/data";

import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();

async function main() {
  for (const citySeed of citiesSeed) {
    const city = await prisma.city.upsert({
      where: { slug: citySeed.slug },
      update: citySeed,
      create: citySeed,
    });

    console.info(`🏙️ City: ${city.name}`);
  }

  for (const placeSeed of placesSeed) {
    const place = await prisma.place.upsert({
      where: { slug: placeSeed.slug },
      update: {
        name: placeSeed.name,
        latitude: placeSeed.latitude,
        longitude: placeSeed.longitude,
        description: placeSeed.description,
        city: { connect: { slug: placeSeed.citySlug } },
      },
      create: {
        name: placeSeed.name,
        slug: placeSeed.slug,
        latitude: placeSeed.latitude,
        longitude: placeSeed.longitude,
        description: placeSeed.description,
        city: { connect: { slug: placeSeed.citySlug } },
      },
    });

    console.info(`🏘️ Place: ${place.name}`);
  }
}

// try {
//   await main();
// } catch (error) {
//   console.error(error);
//   process.exit(1);
// }

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
