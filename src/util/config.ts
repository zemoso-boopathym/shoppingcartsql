const dotenv = require("dotenv");
dotenv.config();
export const config = {
  PORT: process.env.PORT,
  JWT_KEY: process.env.JWT_KEY,
  USER_TOKEN: process.env.USER_TOKEN,
  ADMIN_TOKEN: process.env.ADMIN_TOKEN,
  INVALID_TOKEN: "SOME_TOKEN",
};
