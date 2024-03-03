const {Router} = require("express");
const router= Router();
const {getUser,crearUsuario, loginUser} = require('../controllers/user.controller');


router.get("/usuario/users", getUser);
router.post("/usuario/login", loginUser)
router.post("/usuario/crear-user", crearUsuario);


module.exports = router;