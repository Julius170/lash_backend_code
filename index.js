const PORT = process.env.PORT || 3000;

const express = require("express");
const axios = require("axios");
const https = require("https");
const cheerio = require("cheerio");
const { response } = require("express");

const app = express();

const config = {
  method: "get",
  maxBodyLength: Infinity,
  url: "https://u596h.erprev.com/api/1.0/get-products-list/json",
  headers: {
    // "Access-control-allow-origin": "http://localhost:3000",
    // "Content-Type": "application/json",
    Authorization:
      "Basic ZDFkMjA3OGQtMjVkYi00MzNiLWI2Y2ItZTkxZGM5Zjg3OWUxOjQ3MWZiMGJhYTY2MDc1Y2FjNjczMTM3ZjliN2ViNjFlZTZhOTc1MzA=",
  },
};

products = [];

http: app.get("/api/", (req, res) => {
  res.json("Welcome to Lash Interior Data");
  // console.log("Welcome to Lash Interior Data");
});

app.get("/api/products", (req, res) => {
  axios.request(config).then(async (response) => {
    products = await response.data;
    console.log("running...");
    console.log(response);
    res.json(products.records);
  });
});
app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));
