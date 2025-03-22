export type PlaceSeed = {
  slug: string; // bunaken
  name: string; // Bunaken
  description?: string | null;
  citySlug: string;
};

export type CreatePlace = {
  name: string;
  description?: string;
  citySlug: string;
};

export type UpdatePlace = {
  slug: string;
  name: string;
  description?: string;
  citySlug: string;
};

export const examplePlace: PlaceSeed = {
  slug: "bunaken",
  name: "Bunaken",
  description:
    "Taman Nasional Laut dengan keanekaragaman biota laut yang menakjubkan.",
  citySlug: "kota-manado", // This would be the actual city ID in production
};

export const placesSeed: PlaceSeed[] = [
  {
    slug: "bunaken",
    name: "Bunaken",
    description:
      "Taman Nasional Laut dengan keanekaragaman biota laut yang menakjubkan.",
    citySlug: "kota-manado",
  },
  {
    slug: "boulevard",
    name: "Boulevard",
    description:
      "Kawasan kuliner dan hiburan malam yang terkenal di tepi pantai Manado.",
    citySlug: "kota-manado",
  },
  {
    slug: "danau-tondano",
    name: "Danau Tondano",
    description:
      "Danau terbesar di Sulawesi Utara dengan pemandangan alam yang indah.",
    citySlug: "kabupaten-minahasa",
  },
  {
    slug: "bukit-kasih",
    name: "Bukit Kasih",
    description:
      "Simbol toleransi beragama dengan lima tempat ibadah berbeda dalam satu area.",
    citySlug: "kota-tomohon",
  },
  {
    slug: "taman-tangkoko",
    name: "Taman Tangkoko",
    description:
      "Cagar alam yang menjadi habitat tarsius, monyet hitam sulawesi, dan berbagai satwa endemik.",
    citySlug: "kota-bitung",
  },
];
