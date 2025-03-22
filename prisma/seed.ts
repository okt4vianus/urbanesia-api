import { citiesSeed } from "../src/data/cities";
import { placesSeed } from "../src/data/places";
import { prisma } from "../src/lib/prisma";

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
        description: placeSeed.description,
        city: { connect: { slug: placeSeed.citySlug } },
      },
      create: {
        slug: placeSeed.slug,
        name: placeSeed.name,
        description: placeSeed.description,
        city: { connect: { slug: placeSeed.citySlug } },
      },
    });

    console.info(`🏛️ Place: ${place.name}`);
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
