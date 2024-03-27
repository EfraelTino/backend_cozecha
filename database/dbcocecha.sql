-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 04-03-2024 a las 06:14:14
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `cocecha`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `id` int(11) NOT NULL,
  `nombre_cat` varchar(120) NOT NULL,
  `foto_cat` varchar(80) NOT NULL,
  `fecha_creacion` varchar(20) NOT NULL,
  `cat_estado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`id`, `nombre_cat`, `foto_cat`, `fecha_creacion`, `cat_estado`) VALUES
(1, 'frutas', '1708848058128-fontanero.webp', '25/Feb/24', 1),
(2, 'verduras', '1708840672034-construccion.webp', '25/Feb/24', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comprador`
--

CREATE TABLE `comprador` (
  `id_u` int(11) NOT NULL,
  `nombre` varchar(140) NOT NULL,
  `apellido` varchar(120) NOT NULL,
  `tel` int(11) NOT NULL,
  `email` varchar(120) NOT NULL,
  `password` varchar(120) NOT NULL,
  `repeat_password` varchar(120) NOT NULL,
  `id_tipo_usuario` int(11) NOT NULL,
  `feacha_creacion` datetime NOT NULL,
  `is_admin` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `comprador`
--

INSERT INTO `comprador` (`id_u`, `nombre`, `apellido`, `tel`, `email`, `password`, `repeat_password`, `id_tipo_usuario`, `feacha_creacion`, `is_admin`) VALUES
(1, 'Usuario', 'Comprador', 9512201, 'comprador@gmail.com', '123456', '', 1, '0000-00-00 00:00:00', 0),
(2, '', '', 0, '', '', '', 1, '2024-02-27 00:19:44', 0),
(3, 'Efrael', 'Villanueva', 2147483647, 'efrael2001@gmail.com', '$2b$10$YcNViQ0FZ8kE9inJw821hOxv1xKfkhKa3Rpa6E96rra6VhCpSwH8u', '$2b$10$36VjeoLhfK1qZXh0Re/9M.5RjnvmjSOTAiOkvx64znWr9XMnZSDR6', 1, '2026-02-24 00:00:00', 0),
(4, 'Efrael', 'Villanueva', 2147483647, 'efrael2001s@gmail.com', '$2b$10$IapI0Tkqhs8WRBBgyyyFV.NX5Qky1ZPwTmAPVcEw6nTAnL0k0vcE6', '$2b$10$.l7IllZXzufBIHLLcMqcce0jT9Ub51bCoaaqLC2vHZJ51tVlJ1URy', 1, '2026-02-24 00:00:00', 0),
(5, 'Usuario', 'Cuatro', 2147483647, 'urusario4@gmail.com', '$2b$10$PSHwfah8ja9Oa3dBQR9hgum.EmMIKr7feXdX7Q/e6EzUgG9/M3dw6', '$2b$10$zyKcN/YR68nK3Kr0x98o0uf1CEn4HnE1u9ZCuDnG0e3mPOsAoVR4q', 1, '2026-02-24 00:00:00', 0),
(6, 'Usuario', 'Cuatro', 2147483647, 'urusario4@gmail.com', '$2b$10$J6m1UB8ofFUh9ZoEq3xN/eoCXRR5oN6g7ldZns4SBef0l1MZVohe.', '$2b$10$8Ov8s9vcLrTpHC.MIwK.UuYFjZo0p8Sm0o7MG4Hm.h8tdPXsiufji', 1, '2026-02-24 00:00:00', 0),
(7, 'Usuario', 'Cuatro', 2147483647, 'urusario4@gmail.com', '$2b$10$R1iX1F0Znz/aGOHfmgl0cuMMMQ1Tb0zoiJ5upim8i.zzzM2U8o70W', '$2b$10$8kGX6w3zQxr5XsvgNyOZ7OZvx7xlM5LhXECWfBMShzWjiJGjAtO2S', 1, '2026-02-24 00:00:00', 0),
(8, 'Efrael', 'Villanueva', 915068001, 'efrael200asdasd1@gmail.com', '$2b$10$k7Vs7K.6Worez2s2s9K/vOW8E72lrazOFs7fKzImktyS1A7VYQAVG', '$2b$10$KF72TiSvNvqjOTY/emBb4Oqqj9vrc0bdqfAB3ZKSLdZ14C0P3iEBi', 1, '2024-02-29 01:05:28', 0),
(9, 'Efrael', 'Villanueva', 915068001, 'efrael200asdaasdasdsd1@gmail.com', '$2b$10$uPuyFiboOzOUZGiWXhf.wOcIzAHecyq.MovWWNRSNBzLWzMokESHe', '$2b$10$Uiz9BrvTWU3rs59ligKHBuPJ2Ldh4CANZ97YBmhJvsYsSfDY2cGd2', 1, '2024-02-29 01:05:28', 0),
(10, 'Efrael', 'Villanueva', 915068001, 'efrael200asdaasdaasdsd1@gmail.com', '$2b$10$5q2BWUZkeQBMHs7/1Tj0i.EmhdodxutPmexiXFaYqOJhMKcv8fJdS', '$2b$10$lZVrHO4emyfYoftfvlDTT.JGr6yX/UzGQksQGLWCqo3NruoBD0Gyq', 1, '2024-02-29 01:05:28', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `precios`
--

CREATE TABLE `precios` (
  `id` int(11) NOT NULL,
  `precio` varchar(15) NOT NULL,
  `contiene` varchar(120) NOT NULL,
  `desde_cantidad` varchar(10) NOT NULL,
  `hasta_candidad` varchar(10) NOT NULL,
  `id_producto` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `precios`
--

INSERT INTO `precios` (`id`, `precio`, `contiene`, `desde_cantidad`, `hasta_candidad`, `id_producto`) VALUES
(1, '10', '10', '1', '5', 14),
(2, '120', 'lo que contenga', '10', '10', 14),
(3, '120', 'asdasdasd', '10', '20', 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `imagen` varchar(120) NOT NULL,
  `nombre` varchar(120) NOT NULL,
  `descripcion` text NOT NULL,
  `calidad` varchar(100) NOT NULL,
  `unidad_medida` varchar(20) NOT NULL,
  `id_proveedor` int(11) NOT NULL,
  `id_subcategoria` int(11) NOT NULL,
  `fecha_creacion` varchar(20) NOT NULL,
  `precio_base` varchar(20) NOT NULL,
  `contacto` varchar(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `imagen`, `nombre`, `descripcion`, `calidad`, `unidad_medida`, `id_proveedor`, `id_subcategoria`, `fecha_creacion`, `precio_base`, `contacto`) VALUES
(6, '1708848191558-fontanero.webp', 'Bananas A1 de la selva central', 'Descripcion de producto 1', 'estandar', 'Kg', 1, 2, '25/Feb/24', '120', '915068001'),
(14, '1708848058128-fontanero.webp', 'producto2', 'Descripcion de producto 2', 'estandar', 'Kg', 1, 5, '25/Feb/24', '80', '915068001');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedor`
--

CREATE TABLE `proveedor` (
  `id` int(11) NOT NULL,
  `nombre` varchar(140) NOT NULL,
  `apellido` varchar(120) NOT NULL,
  `tel` int(11) NOT NULL,
  `email` varchar(120) NOT NULL,
  `password` varchar(120) NOT NULL,
  `repeat_password` varchar(120) NOT NULL,
  `id_tipo_usuario` int(11) NOT NULL,
  `fecha_creacion` datetime NOT NULL,
  `is_admin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `proveedor`
--

INSERT INTO `proveedor` (`id`, `nombre`, `apellido`, `tel`, `email`, `password`, `repeat_password`, `id_tipo_usuario`, `fecha_creacion`, `is_admin`) VALUES
(1, 'Efrael', 'Villanueva', 0, 'efrael2001@gmail.com', '123456', '', 0, '0000-00-00 00:00:00', 0),
(3, 'Usuario ', 'Dos', 9512201, 'usuario2@gmail.com', '123456', '', 0, '0000-00-00 00:00:00', 0),
(4, 'Efrael', 'Villanueva', 2147483647, 'efrael2002@gmail.com', '$2b$10$IIXWYwccZdCIw73x7jiANe7qfy4cIeSiWBgkYubv2Wm41GsTo1kxe', '$2b$10$c.lAnQfAiH716k.psPCD/uesWgTV9mLDOPIltFXAsdcUikO/ctU06', 0, '2026-02-24 00:00:00', 0),
(5, 'Usuario', 'Cuatro', 2147483647, 'efrael2002s@gmail.com', '$2b$10$hr/KNJav/jkH71Z11.mHieT1H51S4DVlyL/3jdiJc41JgC.EdvsEa', '$2b$10$H2mtO8CsOS7jWhp0WpR0lOSfaftQxGSI7hbM2cikatOqLChwcETDK', 0, '2026-02-24 00:00:00', 0),
(6, 'Efrael', 'Villanueva', 915068001, 'efrael2001s@gmail.com', '$2b$10$IHgwyZheGNEMSdsTpbIN7eHD8DULXMH3zhn.8ONruXyX2M//tT3Si', '$2b$10$gcMjSxLcRPXtTWWC2EkCuulkY76dREguAER4k95e9ch3r9/1aHyQ.', 0, '0000-00-00 00:00:00', 0),
(7, 'Efrael', 'Villanueva', 915068001, 'efrael200asdasd1@gmail.com', '$2b$10$v3xjC8TCDyo/4WNLZNRAn.VwdeWumm051TfjoO91OfG/AYjZjJYyK', '$2b$10$Hzeb88PgGprVCSNr7sYCc.AA3RPxkom3WiihGX6Kl1DtSc8biGvwe', 0, '2024-02-29 01:05:28', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sub_categoria`
--

CREATE TABLE `sub_categoria` (
  `id` int(11) NOT NULL,
  `nombre_subcat` varchar(120) NOT NULL,
  `foto_subcat` varchar(50) NOT NULL,
  `fecha_creacion` varchar(100) NOT NULL,
  `id_categoria` int(11) NOT NULL,
  `estado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `sub_categoria`
--

INSERT INTO `sub_categoria` (`id`, `nombre_subcat`, `foto_subcat`, `fecha_creacion`, `id_categoria`, `estado`) VALUES
(2, 'bananas', '1708842694600-construccion.webp', '25/Feb/24', 1, 4),
(5, 'potatos', '1708842789292-construccion.webp', '25/Feb/24', 2, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_usuario`
--

CREATE TABLE `tipo_usuario` (
  `id` int(11) NOT NULL,
  `tipo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipo_usuario`
--

INSERT INTO `tipo_usuario` (`id`, `tipo`) VALUES
(1, 0),
(3, 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `comprador`
--
ALTER TABLE `comprador`
  ADD PRIMARY KEY (`id_u`),
  ADD KEY `id_tipo_usuario` (`id_tipo_usuario`);

--
-- Indices de la tabla `precios`
--
ALTER TABLE `precios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_precio_producto` (`id_producto`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_producto_sucategoria` (`id_subcategoria`),
  ADD KEY `fk_productos_proveedores` (`id_proveedor`);

--
-- Indices de la tabla `proveedor`
--
ALTER TABLE `proveedor`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_tipo_usuario` (`id_tipo_usuario`);

--
-- Indices de la tabla `sub_categoria`
--
ALTER TABLE `sub_categoria`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_subcategorias_categoria` (`id_categoria`);

--
-- Indices de la tabla `tipo_usuario`
--
ALTER TABLE `tipo_usuario`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `comprador`
--
ALTER TABLE `comprador`
  MODIFY `id_u` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `precios`
--
ALTER TABLE `precios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `proveedor`
--
ALTER TABLE `proveedor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `sub_categoria`
--
ALTER TABLE `sub_categoria`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `precios`
--
ALTER TABLE `precios`
  ADD CONSTRAINT `fk_precio_producto` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id`);

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `fk_producto_sucategoria` FOREIGN KEY (`id_subcategoria`) REFERENCES `sub_categoria` (`id`),
  ADD CONSTRAINT `fk_productos_proveedores` FOREIGN KEY (`id_proveedor`) REFERENCES `proveedor` (`id`);

--
-- Filtros para la tabla `sub_categoria`
--
ALTER TABLE `sub_categoria`
  ADD CONSTRAINT `fk_subcategorias_categoria` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
