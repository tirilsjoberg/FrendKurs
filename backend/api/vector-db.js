import weaviate from "weaviate-ts-client";
import dotenv from "dotenv";

dotenv.config();

// Sett opp Weaviate-klienten
const client = weaviate.client({
  scheme: "https",
  host: "atlefruxq9spq9c64mtlq.c0.europe-west3.gcp.weaviate.cloud",
  apiKey: process.env.WEAVIATE_API_KEY || "kbyDJzpwms2K9VDTKhpL51aFxV6iV242XqfT",
});

// Funksjon for å hente produktdata fra Weaviate
export const searchProducts = async (query) => {
  try {
    const result = await client.graphql
      .get()
      .withClassName("Abakus") // Collection navn
      .withFields("name description price") // Hvilke felter vi vil hente
      .withNearText({ concepts: [query] }) // Søker etter lignende produkter
      .withLimit(5)
      .do();

    return result.data.Get.Abakus;
  } catch (error) {
    console.error("Feil ved henting av Weaviate-data:", error);
    return [];
  }
};