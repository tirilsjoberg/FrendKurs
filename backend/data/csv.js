const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

const csvFilePath = path.join(__dirname, "products.csv");
let products = [];

// 🚀 Funksjon for å lese CSV-fil
const loadCSVData = async () => {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(csvFilePath)
      .pipe(csv({ separator: ";" })) // Parser CSV-filen
      .on("data", (row) => results.push(row)) // Lagrer hver rad
      .on("end", () => {
        products = results;
        console.log(`✅ CSV-data lastet inn: ${products.length} produkter`);
        resolve(products);
      })
      .on("error", (err) => reject(err));
  });
};

// 📌 Funksjon for å hente produktdata
const getProducts = () => products;

// 🚀 TEST: Kjør denne filen direkte
if (require.main === module) {
  loadCSVData().then(() => console.log(products.slice(0, 5))); // Skriver ut de første 5 produktene
}

module.exports = { loadCSVData, getProducts };
