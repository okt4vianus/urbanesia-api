import { City } from "@prisma/client";

export type CitySeed = {
  slug: string; // kota-manado
  name: string; // Kota Manado
  areaSize: number; // in km2 = 162.29
  description?: string | null; // ? optional field
};

export type CreateCity = {
  name: string;
  areaSize: number;
  description?: string;
};

// export type UpdateCity = CreateCity;
export type UpdateCity = {
  slug: string;
  name: string;
  areaSize: number;
  description?: string;
};

// single data
export const exampleCity: CitySeed = {
  slug: "kota-manado",
  name: "Kota Manado",
  areaSize: 162.29,
  description:
    "Ibu kota provinsi Sulawesi Utara, terkenal dengan keindahan laut Bunaken.",
};

// multiple data
export const citiesSeed: CitySeed[] = [
  {
    slug: "kota-manado",
    name: "Kota Manado",
    areaSize: 162.29,
    description:
      "Ibu kota provinsi Sulawesi Utara, terkenal dengan keindahan laut Bunaken.",
  },
  {
    slug: "kabupaten-minahasa",
    name: "Kabupaten Minahasa",
    areaSize: 1128.47,
    description:
      "Wilayah dengan budaya Minahasa yang kuat dan danau Tondano yang indah.",
  },
  {
    slug: "kota-tomohon",
    name: "Kota Tomohon",
    areaSize: 169.06,
    description: "Dikenal sebagai kota bunga dengan pemandangan Gunung Lokon.",
  },
  {
    slug: "kota-bitung",
    name: "Kota Bitung",
    areaSize: 329.72,
    description:
      "Pelabuhan internasional utama dengan kawasan konservasi Tangkoko.",
  },
  {
    slug: "kota-kotamobagu",
    name: "Kota Kotamobagu",
    areaSize: 108.89,
    description: "Kota yang berkembang pesat di Sulawesi Utara bagian selatan.",
  },
];
