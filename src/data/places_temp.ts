export type PlaceSeed = {
  slug: string; // bunaken
  name: string; // Bunaken
  latitude: number; // latitude coordinate
  longitude: number; // longitude coordinate
  description?: string | null; // ? optional field
  citySlug: string; // related city slug
};

export type CreatePlace = {
  name: string;
  latitude: number;
  longitude: number;
  description?: string;
  citySlug: string;
};

export type UpdatePlace = {
  slug: string;
  name: string;
  latitude: number;
  longitude: number;
  description?: string;
  citySlug: string;
};

// single data
export const examplePlace: PlaceSeed = {
  slug: "bunaken",
  name: "Bunaken",
  latitude: 1.6224,
  longitude: 124.7614,
  description:
    "Taman Laut Nasional terkenal dengan keanekaragaman biota laut dan kegiatan menyelam.",
  citySlug: "kota-manado",
};

// multiple data
export const placesSeed: PlaceSeed[] = [
  {
    slug: "bunaken",
    name: "Bunaken",
    latitude: 1.6224,
    longitude: 124.7614,
    description:
      "Taman Laut Nasional terkenal dengan keanekaragaman biota laut dan kegiatan menyelam.",
    citySlug: "kota-manado",
  },
  {
    slug: "danau-tondano",
    name: "Danau Tondano",
    latitude: 1.2433,
    longitude: 124.8361,
    description:
      "Danau terbesar di Sulawesi Utara yang menawarkan pemandangan alam indah dan tempat wisata kuliner.",
    citySlug: "kabupaten-minahasa",
  },
  {
    slug: "gunung-lokon",
    name: "Gunung Lokon",
    latitude: 1.3586,
    longitude: 124.7924,
    description:
      "Gunung berapi aktif yang menjadi ikon Kota Tomohon dan tujuan pendakian populer.",
    citySlug: "kota-tomohon",
  },
  {
    slug: "tangkoko",
    name: "Taman Nasional Tangkoko",
    latitude: 1.5274,
    longitude: 125.2047,
    description:
      "Kawasan konservasi terkenal dengan primata Tarsius, monyet hitam Sulawesi, dan flora unik.",
    citySlug: "kota-bitung",
  },
  {
    slug: "pulau-lembeh",
    name: "Pulau Lembeh",
    latitude: 1.4536,
    longitude: 125.1885,
    description:
      "Pulau yang terkenal dengan penyelaman muck diving dan keanekaragaman makhluk laut kecil.",
    citySlug: "kota-bitung",
  },
];
