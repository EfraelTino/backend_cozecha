const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "cocecha",

  /**
     *     host: "srv1198.hstgr.io",
    user: "u495112148_efrael_backend",
    password: "@Web2024",
    database: "u495112148_efrael_backend"
     */
});

pool.getConnection((err, con) => {
  if (err) {
    console.error("Error en la conexión a la base de datos: ", err);
  } else {
    console.log("Conexión exitosa");
  }
});

module.exports = { pool };
