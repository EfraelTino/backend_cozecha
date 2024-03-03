require("dotenv").config();
const express= require("express");
const cors = require("cors");
const productoRoutes =require('./routes/producto.routes.js');
const userRoutes = require('./routes/user.routes.js');
const indexRoutes = require('./routes/index.routes.js')
const app = express();
const multer = require('multer');
const upload = multer();
const path = require('path');

app.use(express.urlencoded({extended:true}))
// Usa multer como middleware para todas las solicitudes
app.use(upload.any());
app.use(
	cors()
);
app.use('/uploads', express.static(path.join(__dirname, './uploads/')));
app.use(express.json());
app.use(indexRoutes)
app.use("/api", productoRoutes);
app.use("/api", userRoutes);

const PORT = process.env.PORT || 4000;

app.listen( PORT, () =>{
    console.log(`El servidor está usando el  http://localhost:${PORT}`)
})