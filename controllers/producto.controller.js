const { pool } = require("../db");
const multer = require("multer");
const moment = require("moment");
const fechaActual = moment();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Directorio donde se almacenarán los archivos
  },
  filename: (req, file, cb) => {
    console.log(file);
    // extension del archivo
    const ext = file.originalname.split(".").pop(); //ME RETORNA LA EXTENSION DE UNA IMAGEN POR EJEMPLO .png
    cb(null, `${Date.now()}.${ext}`);
  },
});
const upload = multer({ storage: storage });
const mostrarProductos = async (req, res) => {
  try {
    // const query = "SELECT * FROM productos P JOIN sub_categoria S ON p.id_subcategoria = S.id JOIN categoria C on S.add .id_categoria = C.id";

    const query =
      "SELECT * FROM productos P JOIN sub_categoria S ON P.id_subcategoria = S.id JOIN categoria C ON S.id_categoria = C.id";
    const [rows, fields] = await pool.query(query);
    console.log(rows);
    if (rows.length === 0) {
      return res
        .status(400)
        .json({ message: "No se han encontrador productos" });
    }
    return res.status(200).json(rows);
  } catch (error) {
    console.log("ERROR: ", error);
    return res.status(500).json({ error: error.message });
  }
};

const getProductos = async (req, res) => {
  try {
    const { categoria, subcategoria, nombre } = req.body;
    const query = `
        SELECT ps.id AS id_producto, ps.imagen, ps.nombre, ps.descripcion, ps.calidad, ps.unidad_medida, ps.id_proveedor, ps.id_subcategoria, ps.fecha_creacion, CONCAT( '[', GROUP_CONCAT( JSON_OBJECT( 'precio', pr.precio, 'contiene', pr.contiene, 'desde_cantidad', pr.desde_cantidad, 'hasta_candidad', pr.hasta_candidad ) ORDER BY pr.id ), ']' ) AS precios FROM productos ps INNER JOIN precios pr ON ps.id = pr.id_producto GROUP BY ps.id LIMIT 0, 25`;
    const [rows, fields] = await pool.query(query);
    console.log(rows);
    if (rows.length === 0) {
      return res
        .status(400)
        .json({ message: "No se han encontrador productos" });
    }
    return res.status(200).json(rows);
  } catch (error) {
    console.log("ERROR: ", error);
    return res.status(500).json({ error: error.message });
  }
};
const getCategorias = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM categoria");
    const rows = result[0];
    if (!rows || rows.length === 0) {
      return res.status(404).json({ message: "No se encontraron categorías" });
    }
    return res.status(200).json(rows);
  } catch (error) {
    console.log("ERROR: ", error);
    return res.status(500).json({ error: error.message });
  }
};
getSubcategorias = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM sub_categoria");
    const rows = result[0];
    if (!rows || rows.length === 0) {
      return res
        .status(404)
        .json({ message: "No se encontraron subcategorías" });
    }
    return res.status(200).json(rows);
  } catch (error) {
    console.log("ERROR: ", error);
    return res.status(500).json({ error: error.message });
  }
};
// obtenemos productos de una categoria
const getProductosCaterogia = async (req, res) => {
  const categoria = req.params.categoria;
  console.log("CATEGORIA :", categoria);
  try {
    const result = await pool.query(
      `SELECT * FROM productos JOIN sub_categoria ON productos.id_subcategoria = sub_categoria.id JOIN categoria ON sub_categoria.id_categoria = categoria.id  WHERE categoria.nombre_cat  = ?`,
      [categoria]
    );
    const productos = result[0];
    console.log(productos);
    if (!productos || productos.length === 0) {
      return res.status(404).json({
        message: `No se encontraron productos para la categoría: ${categoria}`,
      });
    }
    return res.status(200).json(productos);
  } catch (error) {
    console.log("ERROR: ", error);
    return res.status(500).json({ error: error.message });
  }
};
const getProductosSubCategoria = async (req, res) => {
  const subcategoria = req.params.subcategoria;
  try {
    const result = await pool.query(
      `SELECT productos.*, sub_categoria.*, categoria.* FROM productos JOIN sub_categoria ON productos.id_subcategoria = sub_categoria.id JOIN categoria ON categoria.id = sub_categoria.id_categoria WHERE sub_categoria.nombre_subcat = ?`,
      [subcategoria]
    );
    const productos = result[0];
    if (!productos || productos.length === 0) {
      return res.status(404).json({
        message: `No se encontraron productos de la subcategoría: ${subcategoria}`,
      });
    }
    return res.status(200).json(productos);
  } catch (error) {
    console.log("ERROR: ", error);
    return res.status(500).json({ error: error.message });
  }
};
const getProductoPorNombre = async (req, res) => {
  const { categoria, subcategoria, nombre } = req.params;

  try {
    const result = await pool.query(
      `SELECT 
        ps.id AS id_producto, 
        ps.imagen, 
        ps.nombre, 
        ps.descripcion, 
        ps.calidad, 
        ps.unidad_medida, 
        ps.id_proveedor, 
        ps.id_subcategoria,
        ps.precio_base, 
        ps.fecha_creacion,
        ps.contacto,
        CONCAT('[', 
            (SELECT 
                GROUP_CONCAT(
                    JSON_OBJECT(
                        'precio', pr.precio, 
                        'contiene', pr.contiene, 
                        'desde_cantidad', pr.desde_cantidad, 
                        'hasta_candidad', pr.hasta_candidad
                    )
                ) 
            FROM precios pr 
            WHERE ps.id = pr.id_producto 
            ORDER BY pr.id
            ), 
            ']'
        ) AS precios
    FROM 
        productos ps
    JOIN 
        sub_categoria sc ON ps.id_subcategoria = sc.id
    JOIN 
        categoria c ON sc.id_categoria = c.id
    WHERE 
        c.nombre_cat = ? AND 
        sc.nombre_subcat = ? AND 
        ps.nombre = ?;`,
      [categoria, subcategoria, nombre]
    );
    const producto = result[0];
    console.log("ROWS: ", producto);
    if (!producto || producto.length === 0) {
      return res
        .status(404)
        .json({ message: `No se a encontrado este producto ${nombre}` });
    }
    return res.status(200).json(producto);
  } catch (error) {
    console.log("ERROR: ", error);
    return res.status(500).json({ error: error.message });
  }
};
const mostrarProductoUsuario = async (req, res) => {
  try {
    const { idProveedor } = req.body;
    console.log("ID PRODOVEEDOR: ", req.body);
    const query = await pool.query(
      "SELECT * from productos where id_proveedor = ?",
      [idProveedor]
    );
    console.log("QUERY:", query)
    const productos = query[0];
    console.log("ROWS: ", productos);
    if (!productos || productos.length === 0) {
      return res.status(404).json({ message: `No tienes productos cargados, sube tus productos y empieza a vender` });
  }
    return res.status(200).json(productos)
  } catch (error) {
    console.log("ERROR: ", error);
    return res.status(500).json({ error: error.message });
  }
};
const crearCategoria = async (req, res) => {
  try {
    upload.single("foto")(req, res, async function (error) {
      if (error instanceof multer.MulterError) {
        // Si hay un error en la carga de archivos
        console.log("Error al cargar el archivo:", error);
        return res.status(400).json({ error: error.message });
      } else if (error) {
        console.log("ERROR: ", error);
        return res.status(500).json({ error: "Error interno del servidor" });
      }

      const file_cargado = req.file;
      // console.log("ARCHIVO CARGADO: ", file_cargado);
      // console.log("BODY: ", req.body)
      const { nombre, estado } = req.body;
      const fecha = fechaActual.format("DD/MM/YY");
      // console.log("NOMBRE: ", nombre);
      // console.log("ESTADO: ", estado);
      // console.log("FECHA: ", fecha);
      if (!nombre) {
        return res
          .status(400)
          .json({ error: "El nombre de  la categoría es obligatorio" });
      }
      const result = await pool.query(
        "INSERT INTO categoria (nombre_cat, foto_cat, fecha_creacion, cat_estado) VALUES (?, ?, ?, ?)",
        [nombre, file_cargado.filename, fecha, estado]
      );
      res
        .status(200)
        .json({ message: "Categoría creado de manera exitosa", result });
    });
  } catch (error) {
    console.log("ERROR: ", error);
    return res.status(500).json({ error: error.message });
  }
};
const createSubCategoria = async (req, res) => {
  try {
    upload.single("foto")(req, res, async function (error) {
      if (error instanceof multer.MulterError) {
        console.log("Error al cargar el archivo:", error);
        return res.status(400).json({ error: error.message });
      } else if (error) {
        console.log("ERROR: ", error);
        return res.status(500).json({ error: "Error interno del servidor" });
      }
      const file_Cargado = req.file;
      if (!file_Cargado) {
        return res
          .status(500)
          .json({ error: "Ocurrió un error intent más tarde" });
      }
      const { nombre, estado, id_categoria } = req.body;
      const fecha = fechaActual.format("DD/MMM/YY");
      if (!nombre) {
        return res
          .status(400)
          .json({ error: "El nombre de  la subcateogira es obligatorio" });
      }

      // Verificar en la base de datos que la categoría exista
      const obtenerCategoria = await pool.query(
        "SELECT * FROM categoria WHERE id = ?",
        [id_categoria]
      );
      if (obtenerCategoria.length === 0) {
        return res.status(400).json({
          error: `La categoría con ID ${id_categoria} no existe, intente con uno válido`,
        });
      }

      // Inserción
      const result = await pool.query(
        "INSERT INTO sub_categoria (nombre_subcat, foto_subcat, fecha_creacion, id_categoria, estado) VALUES (?, ?, ?, ?, ?)",
        [nombre, file_Cargado.filename, fecha, id_categoria, estado]
      );
      res
        .status(200)
        .json({ message: "Sub categoría creada de manera exitosa", result });
    });
  } catch (error) {
    console.log("ERROR: ", error);
    return res.status(500).json({ error: error.message });
  }
};
const crearProduct = async (req, res) => {
  try {
    console.log("body sms:", req.body);
    const {
      foto,
      nombre_producto,
      descripcion,
      calidad,
      id_usuario,
      clasificacion,
      precios,
      medidas,
      precio_base,
    } = req.body;
    const fecha = fechaActual.format("DD/MMM/YY");
    // obtenemos la subcategoria
    const obtenerSubCat = await pool.query(
      "SELECT * FROM sub_categoria WHERE id = ?",
      [clasificacion]
    );
    if (!foto) {
      return res.status(400).json({
        error: `La foto del producto es necesario!`,
      });
    }
    if (!obtenerSubCat.length) {
      return res.status(400).json({
        error: `La subcategoría con identificador ${clasificacion} no existe, intente con uno válido`,
      });
    }
    const obtenerUsuario = await pool.query(
      "SELECT * FROM proveedor WHERE id = ?",
      [id_usuario]
    );
    if (obtenerUsuario.length <= 0) {
      return res.status(400).json({
        error: `El usuario no existe, intente con uno válido`,
      });
    }
    if (!obtenerUsuario) {
      return res.status(400).json({
        error: `El usuario con ID ${id_usuario} no existe, intente con uno válido`,
      });
    }
    if (precios === undefined || precios.length === 0) {
      return res.status(400).json({ error: `Los precios son necesarios` });
    }
    const insertProducto = await pool.query(
      "INSERT INTO productos (imagen, nombre, descripcion,  calidad, id_proveedor, id_subcategoria , fecha_creacion, unidad_medida, precio_base) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        foto,
        nombre_producto,
        descripcion,
        calidad,
        id_usuario,
        clasificacion,
        fecha,
        medidas,
        precio_base,
      ]
    );
    const productoID = insertProducto[0].insertId;
    if (!productoID) {
      return res.status(400).json({ error: "Error al insertar el producto" });
    }

    for (const precio of precios) {
      try {
        const { preciosoles, contiene, preciodesde, preciohasta } = precio;

        await pool.query(
          "INSERT INTO precios (precio, contiene, desde_cantidad, hasta_candidad, id_producto) VALUES (?, ?, ?, ?, ?)",
          [preciosoles, contiene, preciodesde, preciohasta, productoID]
        );
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    }
    return res
      .status(200)
      .json({ message: "Producto creado de manera exitosa" });
  } catch (error) {
    console.log("ERROR: ", error);
    return res
      .status(500)
      .json({
        message:
          "No se pudo crear el producto. Hubo un error al insertar el producto.",
      });
  }
};

module.exports = {
  getProductos,
  getCategorias,
  getSubcategorias,
  getProductoPorNombre,
  getProductosCaterogia,
  getProductosSubCategoria,
  crearCategoria,
  createSubCategoria,
  crearProduct,
  mostrarProductos,
  mostrarProductoUsuario
};
