import express from "express";
import axios from "axios";
import logger from "./config/logger.js";
import config from "./config/config.js";

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
  try {
    const response = await axios.request(config);
    const allProducts = response.data.records;

    logger.info(`Total products:, ${allProducts.length}`); // Log total products

    // Filter items with class "chair"
    const chairProducts = allProducts.filter(
      (product) => product.Class === "Chair"
    );

    logger.info(`Chair products: ${chairProducts.length}`); // Log chair products

    // Randomly shuffle "chair" items for rendering
    const randomChairProducts = shuffleArray(chairProducts);

    res.json(randomChairProducts);
  } catch (error) {
    logger.error(`Error fetching products: ${error}`);
    res.status(500).json({ error: "An error occurred" });
  }
});

function shuffleArray(array) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

app.listen(PORT, () => logger.info(`Server running on PORT ${PORT}`));
