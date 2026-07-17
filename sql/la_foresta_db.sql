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

INSERT INTO precios_producto (id_producto, tamano, precio) VALUES

-- Tortas
(1, 'Pequeño', 35.00),
(1, 'Mediano', 50.00),
(1, 'Grande', 70.00),

(2, 'Pequeño', 38.00),
(2, 'Mediano', 55.00),
(2, 'Grande', 75.00),

(3, 'Pequeño', 35.00),
(3, 'Mediano', 50.00),
(3, 'Grande', 70.00),

-- Tortas personalizadas
(4, 'Pequeño', 50.00),
(4, 'Mediano', 70.00),
(4, 'Grande', 95.00),
(4, 'Pisos múltiples', 150.00),

(5, 'Pequeño', 55.00),
(5, 'Mediano', 75.00),
(5, 'Grande', 100.00),
(5, 'Pisos múltiples', 160.00),

(6, 'Pequeño', 60.00),
(6, 'Mediano', 85.00),
(6, 'Grande', 120.00),
(6, 'Pisos múltiples', 180.00),

-- Bocaditos
(7, 'Por docena', 20.00),
(7, 'Dos Docenas', 38.00),
(7, 'Medio ciento', 75.00),

(8, 'Por docena', 24.00),
(8, 'Dos Docenas', 45.00),
(8, 'Medio ciento', 85.00),

-- Desayunos
(9, 'Personal', 25.00),
(10, 'Personal', 40.00),
(11, 'Personal', 18.00),

-- Queques
(12, 'Porción', 6.00),
(12, 'Media porción', 18.00),
(12, 'Entero', 35.00),

(13, 'Porción', 6.00),
(13, 'Media porción', 18.00),
(13, 'Entero', 35.00),

-- Postres
(14, 'Personal', 12.00),
(14, 'Entero', 55.00),

(15, 'Personal', 10.00),
(15, 'Entero', 45.00),

(16, 'Personal', 10.00),
(16, 'Entero', 45.00),

-- Helados artesanales
(17, 'Medio Litro', 15.00),
(17, '1 Litro', 28.00),

(18, 'Medio Litro', 15.00),
(18, '1 Litro', 28.00);

ALTER TABLE detalle_pedido
ADD COLUMN precio_unitario DECIMAL(10,2) NOT NULL DEFAULT 0.00
AFTER cantidad,
ADD COLUMN subtotal DECIMAL(10,2) NOT NULL DEFAULT 0.00
AFTER precio_unitario;

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
