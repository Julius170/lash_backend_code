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

    // Filter items with class "chair"
    const chairProducts = allProducts.filter(product => product.class === "chair");

    // Randomly shuffle "chair" items for rendering
    const randomChairProducts = shuffleArray(chairProducts);

    res.json(randomChairProducts);
  } catch (error) {
    console.error("Error fetching products:", error);
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

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
