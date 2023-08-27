import dotenv from "dotenv";

dotenv.config();

const baseUrl = "https://u596h.erprev.com/api/1.0/";

const config = {
  method: "get",
  maxBodyLength: Infinity,
  headers: {
    Authorization: `${process.env.ERPREV_PRIVATE}`,
  },
};

export { baseUrl, config };
