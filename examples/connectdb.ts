import * as pg from "pg";

const client = new pg.Client({
  connectionString: process.env.DATABASE_URL,
});

await client.connect();

type City = {
  id: number;
  slug: string;
  name: string;
  areaSize: number;
  description?: string | null; // ? optional field
};

async function createTableCities() {
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS cities (
        id SERIAL PRIMARY KEY,
        slug VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        area_size DECIMAL NOT NULL,
        description TEXT
      )
    `);
    console.log("Table cities created successfully");
  } catch (error) {
    console.error("Failed to create table cities", error);
  }
}

async function insertCities() {
  try {
    await client.query(`
      INSERT INTO cities (slug, name, area_size, description)
      VALUES
        ('kota-manado', 'Kota Manado', 162.29, 'Ibu kota provinsi Sulawesi Utara, terkenal dengan keindahan laut Bunaken.'),
        ('kabupaten-minahasa', 'Kabupaten Minahasa', 1128.47, 'Wilayah dengan budaya Minahasa yang kuat dan danau Tondano yang indah.'),
        ('kota-tomohon', 'Kota Tomohon', 169.06, 'Dikenal sebagai kota bunga dengan pemandangan Gunung Lokon.'),
        ('kota-bitung', 'Kota Bitung', 303.29, 'Kota pelabuhan yang terkenal dengan industri perikanan dan laut yang indah.');
    `);
    console.log("Data cities inserted successfully");
  } catch (error) {
    console.error("Failed to insert data cities", error);
  }
}

async function getCities() {
  try {
    const result = await client.query("SELECT * FROM cities");
    const cities: City[] = result.rows;
    console.log({ cities });
  } catch (error) {
    console.error("Failed to insert data cities", error);
  }
}

try {
  await createTableCities();
  await insertCities();
  await getCities();
} catch (error) {
  console.error("Failed to connect to the database", error);
} finally {
  await client.end();
}
