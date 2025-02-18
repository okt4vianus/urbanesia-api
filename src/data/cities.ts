export type City = {
  id: number; // 1, 2, 3
  slug: string; // kota-manado
  name: string; // Kota Manado
  areaSize: number; // in km2 = 162.29
  description?: string; // ? optional field
};

export type CreateCity = {
  name: string; // Kota Manado
  areaSize: number; // in km2 = 162.29
  description?: string; // ? optional field
};

// single data
export const exampleCity: City = {
  id: 1,
  slug: "kota-manado",
  name: "Kota Manado",
  areaSize: 162.29,
  description:
    "Ibu kota provinsi Sulawesi Utara, terkenal dengan keindahan laut Bunaken.",
};

// multiple data
export const cities: City[] = [
  {
    id: 1,
    slug: "kota-manado",
    name: "Kota Manado",
    areaSize: 162.29,
    description:
      "Ibu kota provinsi Sulawesi Utara, terkenal dengan keindahan laut Bunaken.",
  },
  {
    id: 2,
    slug: "kabupaten-minahasa",
    name: "Kabupaten Minahasa",
    areaSize: 1128.47,
    description:
      "Wilayah dengan budaya Minahasa yang kuat dan danau Tondano yang indah.",
  },
  {
    id: 3,
    slug: "kota-tomohon",
    name: "Kota Tomohon",
    areaSize: 169.06,
    description: "Dikenal sebagai kota bunga dengan pemandangan Gunung Lokon.",
  },
  {
    id: 4,
    slug: "kota-bitung",
    name: "Kota Bitung",
    areaSize: 329.72,
    description:
      "Pelabuhan internasional utama dengan kawasan konservasi Tangkoko.",
  },
  {
    id: 5,
    slug: "kota-kotamobagu",
    name: "Kota Kotamobagu",
    areaSize: 108.89,
    description: "Kota yang berkembang pesat di Sulawesi Utara bagian selatan.",
  },
];
