import mysql from "mysql2";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "node-shopcart",
  password: "password",
});

export default pool.promise();
