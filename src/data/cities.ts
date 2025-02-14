type City = {
  id: number; // 1, 2, 3
  slug: string; // kota-manado
  name: string; // Kota Manado
  areaSize: number; // in km2 = 162
};

export const cities: City[] = [
  {
    id: 1,
    slug: "kota-manado",
    name: "Kota Manado",
    areaSize: 162.29,
  },
  {
    id: 2,
    slug: "kabupaten-minahasa",
    name: "Kabupaten Minahasa",
    areaSize: 1128.47,
  },
  {
    id: 3,
    slug: "kota-tomohon",
    name: "Kota Tomohon",
    areaSize: 169.06,
  },
  {
    id: 4,
    slug: "kota-bitung",
    name: "Kota Bitung",
    areaSize: 329.72,
  },
  {
    id: 5,
    slug: "kota-kotamobagu",
    name: "Kota Kotamobagu",
    areaSize: 108.89,
  },
];
