CREATE DATABASE IF NOT EXISTS la_foresta_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_general_ci;

USE la_foresta_db;

CREATE TABLE IF NOT EXISTS clientes (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    correo VARCHAR(150) NOT NULL
);

CREATE TABLE IF NOT EXISTS categorias (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS productos (
    id_producto INT AUTO_INCREMENT PRIMARY KEY,
    id_categoria INT NOT NULL,
    nombre VARCHAR(120) NOT NULL,
    FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria)
);

CREATE TABLE IF NOT EXISTS pedidos (
    id_pedido INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT NOT NULL,
    fecha_entrega DATE NOT NULL,
    descripcion TEXT NOT NULL,
    comentarios TEXT,
    estado ENUM('Pendiente', 'En proceso', 'Listo', 'Entregado', 'Cancelado') DEFAULT 'Pendiente',
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente)
);

CREATE TABLE IF NOT EXISTS detalle_pedido (
    id_detalle INT AUTO_INCREMENT PRIMARY KEY,
    id_pedido INT NOT NULL,
    id_producto INT NOT NULL,
    tamano VARCHAR(50) NOT NULL,
    cantidad INT NOT NULL,
    FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido) ON DELETE CASCADE,
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
);

CREATE TABLE IF NOT EXISTS precios_producto (
    id_precio INT AUTO_INCREMENT PRIMARY KEY,
    id_producto INT NOT NULL,
    tamano VARCHAR(50) NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    
    CONSTRAINT fk_precio_producto
        FOREIGN KEY (id_producto)
        REFERENCES productos(id_producto)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT uk_producto_tamano
        UNIQUE (id_producto, tamano)
);

INSERT IGNORE INTO categorias (id_categoria, nombre) VALUES
(1, 'Torta'),
(2, 'Torta personalizada'),
(3, 'Bocaditos'),
(4, 'Desayuno'),
(5, 'Queque'),
(6, 'Postre'),
(7, 'Helado artesanal');

INSERT IGNORE INTO productos (id_producto, id_categoria, nombre) VALUES
(1, 1, 'Torta de chocolate'),
(2, 1, 'Torta tres leches'),
(3, 1, 'Torta de fresa'),
(4, 2, 'Torta de cumpleaños'),
(5, 2, 'Torta infantil'),
(6, 2, 'Torta para eventos'),
(7, 3, 'Bocaditos dulces'),
(8, 3, 'Bocaditos salados'),
(9, 4, 'Desayuno clásico'),
(10, 4, 'Desayuno sorpresa'),
(11, 4, 'Empanadas'),
(12, 5, 'Queque de vainilla'),
(13, 5, 'Queque de naranja'),
(14, 6, 'Cheesecake'),
(15, 6, 'Tres leches en vaso'),
(16, 6, 'Pie de limón'),
(17, 7, 'Helado de fresa'),
(18, 7, 'Helado de chocolate');
