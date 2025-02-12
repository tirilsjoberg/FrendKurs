const express = require("express");
const cors = require("cors");
const csv = require("csv-parser");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

let products = [];

// Les CSV-fil og lagre produktdata
fs.createReadStream("./data/products.csv")
  .pipe(csv())
  .on("data", (row) => products.push(row))
  .on("end", () =>
    console.log("CSV-data lastet inn:", products.length, "rader")
  );

// API-endepunkt for å hente produktdata
app.get("/api/products", (req, res) => {
  res.json(products);
});

// Start server
const PORT = 3001;
app.listen(PORT, () =>
  console.log(`Server kjører på http://localhost:${PORT}`)
);
