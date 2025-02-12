import express from "express";
import cors from "cors";
import { searchProducts } from "./api/vector-db.js";

const app = express();
app.use(cors());
app.use(express.json());

// API-endepunkt for å søke i produktdatabasen
app.post("/api/search", async (req, res) => {
  const { query } = req.body;
  if (!query) {
    return res.status(400).json({ error: "Søketekst mangler" });
  }

  const results = await searchProducts(query);
  res.json({ results });
});

// Start serveren
const PORT = 3001;
app.listen(PORT, () => console.log(`Server kjører på http://localhost:${PORT}`));