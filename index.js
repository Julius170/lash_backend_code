import express from "express";
import axios from "axios";
import logger from "./config/logger.js";
import config from "./config/config.js";
import shuffleArray from "./shuffleArray.js";
// import fetchAndStoreProducts from "./randomness.js";
const app = express();

const PORT = process.env.PORT || 3000;

// let lastRandomProductsUpdate = Date.now(); // Initialize with the current time
// let currentProducts = []; // Initialize with an empty array

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
    // const currentTime = Date.now();
    // const timeSinceLastUpdate = currentTime - lastRandomProductsUpdate;
    // const oneWeekInMillis = 7 * 24 * 60 * 60 * 1000; // One week in milliseconds

    // if (timeSinceLastUpdate >= oneWeekInMillis) {
    // Update the last update time
    // lastRandomProductsUpdate = currentTime;

    const response = await axios.request(config);
    const allProducts = response.data.records;

    logger.info(`Total products: ${allProducts.length}`); // Log total products

    // Filter items with class "chair"
    const chairProducts = allProducts.filter(
      (product) => product.Class === "Chair"
    );

    logger.info(`Chair products: ${chairProducts.length}`); // Log chair products

    // Randomly shuffle "chair" items for rendering
    // currentProducts = shuffleArray(chairProducts);
    // }

    res.json(chairProducts);
  } catch (error) {
    logger.error(`Error fetching products: ${error}`);
    res.status(500).json({ error: "An error occurred" });
  }
});

// Initial data fetching and update
// fetchAndStoreProducts();

// async function fetchAndStoreProducts() {
//   try {
//     const response = await axios.request(config);
//     const allProducts = response.data.records;

//     logger.info(`Total products: ${allProducts.length}`); // Log total products

//     // Filter items with class "chair"
//     const chairProducts = allProducts.filter(
//       (product) => product.Class === "Chair"
//     );

//     logger.info(`Chair products: ${chairProducts.length}`); // Log chair products

//     // Randomly shuffle "chair" items for rendering
//     currentProducts = shuffleArray(chairProducts);
//   } catch (error) {
//     logger.error(`Error fetching products: ${error}`);
//   }
// }

// Schedule data fetching and update every week
// const updateInterval = 7 * 24 * 60 * 60 * 1000; // One week in milliseconds
// setInterval(fetchAndStoreProducts, updateInterval);

app.listen(PORT, () => logger.info(`Server running on PORT ${PORT}`));
