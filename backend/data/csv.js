import fs from "fs";
import path from "path";
import Papa from "papaparse";
import client from "../api/vector-db.js";

const csvFilePath = path.join(process.cwd(), "backend/data/products.csv");
const csvData = fs.readFileSync(csvFilePath, "utf8");

Papa.parse(csvData, {
  header: true,
  skipEmptyLines: true,
  complete: async (result) => {
    for (const row of result.data) {
      await client.data.creator()
        .withClassName("Abakus")
        .withProperties({
          name: row["Produkt"],
          category: row["Kategori"],
          price: row["Pris (NOK)"],
          description: row["Beskrivelse"],
          imageUrl: row["URL til bilde (.jpg)"],
        })
        .do();
      console.log(`✅ Lagt til: ${row["Produkt"]}`);
    }
    console.log("🚀 Alle produkter er lastet opp!");
  },
});
