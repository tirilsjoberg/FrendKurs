import express from "express";
import cors from "cors";
import { loadCSVData, getProducts } from "./data/csv.js";

const app = express();
app.use(cors());
app.use(express.json());

// 🔄 Last CSV-data ved oppstart
loadCSVData();

// 📌 API-endepunkt for å hente produkter fra CSV
app.get("/api/products", async (req, res) => {
  const products = getProducts();
  res.json(products);
});

// Start serveren
const PORT = 3001;
app.listen(PORT, () => console.log(`🚀 Server kjører på http://localhost:${PORT}`));