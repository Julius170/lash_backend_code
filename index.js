// const PORT = process.env.PORT || 3000;

// const express = require("express");
// const axios = require("axios");
// const https = require("https");
// const cheerio = require("cheerio");
// const { response } = require("express");

// const app = express();

// const config = {
//   method: "get",
//   maxBodyLength: Infinity,
//   url: "https://u596h.erprev.com/api/1.0/get-products-list/json",
//   headers: {
//     // "Access-control-allow-origin": "http://localhost:3000",
//     // "Content-Type": "application/json",
//     Authorization:
//       "Basic ZDFkMjA3OGQtMjVkYi00MzNiLWI2Y2ItZTkxZGM5Zjg3OWUxOjQ3MWZiMGJhYTY2MDc1Y2FjNjczMTM3ZjliN2ViNjFlZTZhOTc1MzA=",
//   },
// };

// products = [];

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

// http: app.get("/api/", (req, res) => {
//   res.json("Welcome to Lash Interior Data");
//   // console.log("Welcome to Lash Interior Data");
// });

// app.get("/api/products", (req, res) => {
//   axios.request(config).then(async (response) => {
//     products = await response.data;
//     console.log("running...");
//     // console.log(response);
//     res.json(products.records);
//   });
// });
// app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));

const PORT = process.env.PORT || 3000;
const express = require("express");
const axios = require("axios");
const app = express();

const config = {
  method: "get",
  maxBodyLength: Infinity,
  url: "https://u596h.erprev.com/api/1.0/get-products-list/json",
  headers: {
    Authorization:
      "Basic ZDFkMjA3OGQtMjVkYi00MzNiLWI2Y2ItZTkxZGM5Zjg3OWUxOjQ3MWZiMGJhYTY2MDc1Y2FjNjczMTM3ZjliN2ViNjFlZTZhOTc1MzA=",
  },
};

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

    // Generate a random list of products
    const randomProducts = getRandomProducts(allProducts, 5); // Change '5' to the desired number of random products

    // Filter products based on a class or other parameter
    const filteredProducts = filterProductsByClass(randomProducts, "class"); // Change 'classA' to the desired class

    res.json(filteredProducts);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

function getRandomProducts(products, count) {
  const shuffledProducts = products.sort(() => 0.5 - Math.random());
  return shuffledProducts.slice(0, count);
}

function filterProductsByClass(products, targetClass) {
  return products.filter(product => product.class === targetClass);
}

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
