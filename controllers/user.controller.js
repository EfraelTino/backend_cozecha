const { pool } = require('../db');
const moment = require('moment');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("./utilidades");

const fechaActual = moment();
const validarEmail = (email) => {
    // Expresión regular para validar el formato del correo electrónico
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}
const validarCampos = (params) => {
    if (!params || Object.values(params).some(value => value === undefined || value === '' || (typeof value === 'number' && isNaN(value)))) {
        return false;
    }
    return true;
}

const crearUsuario = async (req, res) => {
    // TIPO 0 --- PROVEEDOR
    // TIPO 1 --- COMPRADOR

    // console.log(req.params);
    try {
        const { nombre, apellido, email, password, password_repeat, tipo, telefono, fecha } = req.body;

        console.log(req.body)
        if (!validarCampos({ nombre, apellido, telefono, tipo })) {
            console.log("NOMBRE:", nombre, " APELLIDO: ", apellido, " TEL: ", telefono, " TIPO: ", tipo);
            return res.status(500).json({ error: "Por favor, complete todos los campos." });

        }
        const tipoConvertido = parseInt(tipo);
        const fechaFormateada = moment(fecha).format('YYYY-MM-DD HH:mm:ss');
        if (!validarEmail(email)) {
            return res.status(400).json({ error: `El email ${email} no es válido, intente de nuevo.` });
        }
        const comparar = password_repeat === password;

        console.log(comparar)
  
        if (comparar == false) {
            return res.status(400).json({ error: "Las contraseñas no coinciden, intente de nuevo." });
        }

        // const hashfirstPass = await bcrypt.hash(password, 10);
        console.log("PASS 1:", password)
        console.log("PASS 2:", password_repeat)
        const saltRounds = 10;

        // Generación del hash para la contraseña
        const hashfirstPass = await bcrypt.hash(password, saltRounds);
        const hashfirstRepeat = await bcrypt.hash(password_repeat, saltRounds);
        
        // Luego de obtener los hashes, puedes continuar con el resto de tu lógica
        console.log("REQUEST BODY", req.body);
        console.log("hash1: ", hashfirstPass, "hash2: ", hashfirstRepeat);
        // console.log("TIPO", typeof tipoConvertido);
        if (tipoConvertido === 0) {
            const getProveedor = await pool.query("SELECT * FROM proveedor WHERE email = ?", [email]);
            const letPro = getProveedor[0];
            console.log("LET PRO:", letPro)
            if (letPro.length > 0) {
                return res.status(400).json({error: `Tu usuario ${email} ya se encuentra registrado, si perdiste tu contraseña lo puedes recuperar`});
            } else {
                const insertProveedor = await pool.query("INSERT INTO proveedor (nombre, apellido,  tel, email, password, repeat_password, id_tipo_usuario, fecha_creacion) VALUES(?, ?, ?, ?, ?, ?, ?, ?)", [nombre, apellido, telefono, email, hashfirstPass, hashfirstRepeat, 0, fechaFormateada]);
                res.status(200).json({message: "Bienvenido(a) a la plataforma"});
            }
        } else if (tipoConvertido === 1) {
            const getComprador = await pool.query("SELECT * FROM comprador WHERE email = ?", [email]);
            const letPro = getComprador[0];
            console.log(letPro)
            if (letPro.length > 0) {
                return res.status(400).json({error: `Tu usuario ${email} ya se encuentra registrado, si perdiste tu contraseña lo puedes recuperar`});
            } else {
                const insertComprador = await pool.query("INSERT INTO comprador (nombre, apellido, tel, email, password, repeat_password, id_tipo_usuario, feacha_creacion ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [nombre, apellido, telefono, email, hashfirstPass, hashfirstRepeat, 1, fechaFormateada])
                console.log("INSERT COMPRADRO: ", insertComprador);
               
                res.status(200).json({message: "Bienvenido(a) a la plataforma"});
            }
        }
    } catch (error) {
        console.log("ERROR: ", error);
        return res.status(500).json({ error: error.message });
    }

}
const getUser = async (req, res) => {
    try {
        const query = "SELECT * FROM proveedor";
        const [rows, fields] = await pool.query(query);
        console.log(rows);
        if (rows.length === 0) {
            return res.status(400).json({ message: "No se han encontrador productos" });
        }
        return res.status(200).json(rows);
    } catch (error) {
        console.log("ERROR: ", error);
        return res.status(500).json({ error: error.message })
    }
}

const getUserConId = async (req, res) => {

}
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!validarEmail(email)) {
            return res.status(400).json(`El email ${email} no es válido, intente de nuevo o ingrese otro`)
        }
        if (!password) {
            return res.status(400).json(`Ingrese una contraseña para continuar`)
        }
        // Consultar proveedores
        const queryProveedor = await pool.query("SELECT * FROM proveedor WHERE email = ?", [email]);
        const resProveedor = queryProveedor[0];
        // Consultar compradores si no se encontraron proveedores
        if (resProveedor.length === 0) {
            const queryComprador = await pool.query("SELECT * FROM comprador WHERE email = ?", [email]);
            const resComprador = queryComprador[0];
            // Verificar si se encontró un comprador
            if (resComprador.length === 0) {
                return res.status(400).json("Usuario no encontrado");
            } else {
                const storedPasswordHash = resComprador[0].password;
                const passwordMatch = await bcrypt.compare(password, storedPasswordHash);
                if (!passwordMatch) {
                    return res.status(401).json("Credenciales incorrectas");
                }
                const nombreUsuario = resComprador[0].nombre;
                const apellidoUsuario = resComprador[0].apellido;
                const emailUsuario = resComprador[0].email;
                const idtipo = resComprador[0].id_tipo_usuario;

                try {
                    const token = await jwt.sign({
                        exp: Math.floor(Date.now() / 1000) + (60 * 60), // Expira después de 1 minuto
                        data: 'foobar'
                    }, 'secret');
                    res.status(200).json(({ token: token, email: emailUsuario, nombre: nombreUsuario, apellido: apellidoUsuario, tipo: idtipo }));
                } catch (error) {
                    console.error('Error al generar el token:', error);
                }
            }
        } else {
            const storedPasswordHash = resProveedor[0].password;
            const passwordMatch = await bcrypt.compare(password, storedPasswordHash);

            if (!passwordMatch) {
                return res.status(401).json("Credenciales incorrectas");
            }
            const nombreUsuario = resProveedor[0].nombre;
            const apellidoUsuario = resProveedor[0].apellido;
            const emailUsuario = resProveedor[0].email;
            const idtipo = resProveedor[0].id_tipo_usuario;
            try {
                const token = await jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60), // Expira después de 1 minuto
                    data: 'foobar'
                }, 'secret');
                console.log({ token: token, email: emailUsuario, nombre: nombreUsuario, apellido: apellidoUsuario, tipo: idtipo })

                res.status(200).json(({ token: token, email: emailUsuario, nombre: nombreUsuario, apellido: apellidoUsuario, tipo: idtipo }));
            } catch (error) {
                console.error('Error al generar el token:', error);
            }

        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message });
    }
}

const getDashboard = async (req, res) => {
    res.send("hola");
}
module.exports = { getUser, crearUsuario, loginUser }