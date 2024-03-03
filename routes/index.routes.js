const {Router}  = require("express");
const {pool} =require("../db.js");

const router = Router();

router.get("/ping", async (req, res) =>{

    const {rows} = await pool.query('SELECT 1 + 1 as result');

    // extraer datos

    console.log(rows)
   res.json('ping') 
    res.send("Hola desde ping");
})


module.exports = router;