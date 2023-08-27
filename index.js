import express from "express";
import axios from "axios";
import logger from "./config/logger.js";
import { baseUrl, config } from "./config/config.js";
import shuffleArray from "./shuffleArray.js";
const app = express();

const PORT = process.env.PORT || 3000;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/api/", (req, res) => {
  res.json("Welcome to Lash Interior Data");
});

app.get("/api/products", async (req, res) => {
  const requestEndpoint = "get-products-list"; // Endpoint for fetching products
  try {
    const response = await axios.request({
      ...config,
      url: `${baseUrl}${requestEndpoint}/json`,
    });
    const allProducts = response.data.records;

    logger.info(`Total products: ${allProducts.length}`); // Log total products

    // Filter items with class "chair"
    const chairProducts = allProducts.filter(
      (product) => product.Class === "Chair"
    );

    logger.info(`Chair products: ${chairProducts.length}`); // Log chair products

    res.json(chairProducts);
  } catch (error) {
    logger.error(`Error fetching products: ${error}`);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.listen(PORT, () => logger.info(`Server running on PORT ${PORT}`));
