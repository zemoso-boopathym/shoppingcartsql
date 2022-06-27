import mysql from "mysql2";
import { config } from "./config";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "node-shopcart",
  password: config.DB_PWD,
});

export default pool.promise();
