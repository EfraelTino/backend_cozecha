const jwt = require('jsonwebtoken');

// Función middleware para verificar la validez del token
const verificarToken = (req, res, next) => {
    const token = req.headers.authorization; // Obtener el token del encabezado de autorización
    
    if (!token) {
        return res.status(401).json({ message: 'No se proporcionó un token' });
    }

    // Verificar el token
    jwt.verify(token, 'secret', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token inválido o expirado' });
        } else {
            req.decoded = decoded; // Guardar la información decodificada del token en el objeto req para usarla en las rutas protegidas
            next(); // Pasar al siguiente middleware o controlador
        }
    });
};


module.exports = verificarToken;