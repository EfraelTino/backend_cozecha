const {Router} = require("express");
const router = Router();

const {getProductos, 
    getProductoPorNombre, 
    getCategorias, 
    getProductosCaterogia, 
    getProductosSubCategoria, 
    crearCategoria,
    createSubCategoria,
    getSubcategorias,
    crearProduct, mostrarProductos, mostrarProductoUsuario} = require('../controllers/producto.controller');

/**
 * METODOS GET PARA PRODUCTOS
 */
// PRODUCTOS GENÉRICOS

// todos los productos
router.get("/productos", mostrarProductos);
// MOSTRAR PRODUCTOS SIN PRECIO
router.get("/producto/detalle", getProductos);

router.get("/producto/:categoria", getProductosCaterogia);
router.get("/producto/:categoria/:subcategoria", getProductosSubCategoria);
router.get("/producto/:categoria/:subcategoria/:nombre",getProductoPorNombre)



// PRODUCTO CON CATEGORIA
router.get("/categorias", getCategorias)


router.get("/categorias/subcategoria", getSubcategorias)


router.post('/productousuario', mostrarProductoUsuario)






// PRODUCTO CON ID

// PRODUCTO POR NOMBRE
// router.get("/producto/:categoria/:subcategoria/nombre/:nombre", getProductoPorNombre);

/**
 * MÉTODOS POST PARA PRODUCTOS
 */
// CREAR UNA CATEGORÍA
router.post("/crear-cat", crearCategoria)
router.post("/crear-subcategoria", createSubCategoria);
router.post("/crear-producto", crearProduct);


module.exports = router;