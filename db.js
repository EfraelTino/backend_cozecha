const mysql = require("mysql2/promise");

const pool = mysql.createPool({
    host: "localhost",
    user: "embolpe1_efrael",
    password: "@Web2024",
    database: "embolpe1_efrael"
});

pool.getConnection((err,con)=>{
    if(err){
        console.error("Error en la conexión a la base de datos: ", err)
    }else{
        console.log("Conexión exitosa")
    }
})

module.exports = {pool};