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

app.get("/api/stocks", async (req, res) => {
  const requestEndpoint = "get-stock-list"; // Endpoint for fetching products
  try {
    const response = await axios.request({
      ...config,
      url: `${baseUrl}${requestEndpoint}/json`,
    });
    const allProducts = response.data.records;

    logger.info(`Total products: ${allProducts.length}`); // Log total products

    // Filter items with class "chair"
    const chairProducts = allProducts.filter(
      (product) =>
        product.Class === "Chair" &&
        product.OfficeLocation === "LASH INTERIORS" &&
        product.Product !== "."
    );

    logger.info(`Chair products: ${chairProducts.length}`); // Log chair products

    res.json(chairProducts);
  } catch (error) {
    logger.error(`Error fetching products: ${error}`);
    res.status(500).json({ error: "An error occurred" });
  }
});

// New POST request endpoint for writing an invoice
app.post("/api/write-invoice", async (req, res) => {
  try {
    // Extract the required parameters from the request body
    const { currency, transdata, customerid, total } = req.body;

    // Create the invoice data object using the extracted parameters
    const invoiceData = {
      currency,
      transdata,
      customerid,
      total,
      // Add any other properties required for the invoice
    };

    // Send a POST request to the API
    const response = await axios.post(
      "https://u596h.erprev.com/api/1.0/write-invoice",
      invoiceData,
      {
        headers: {
          Authorization:
            "Basic ZDFkMjA3OGQtMjVkYi00MzNiLWI2Y2ItZTkxZGM5Zjg3OWUxOjQ3MWZiMGJhYTY2MDc1Y2FjNjczMTM3ZjliN2ViNjFlZTZhOTc1MzA=",
        },
      }
    );

    // Return the response from the API to the client
    res.json(response.data);
  } catch (error) {
    // Handle any errors that might occur
    console.error("Error writing invoice:", error);
    res
      .status(500)
      .json({ error: "An error occurred while writing the invoice." });
  }
});

app.listen(PORT, () => logger.info(`Server running on PORT ${PORT}`));
