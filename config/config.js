import dotenv from "dotenv";

dotenv.config();

const config = {
  method: "get",
  maxBodyLength: Infinity,
  url: "https://u596h.erprev.com/api/1.0/get-products-list/json",
  headers: {
    Authorization: `${process.env.ERPREV_PRIVATE}`,
  },
};

export default config;
