const dotenv = require("dotenv");
dotenv.config();
export const config = {
  PORT: process.env.PORT,
  JWT_KEY: process.env.JWT_KEY,
};
