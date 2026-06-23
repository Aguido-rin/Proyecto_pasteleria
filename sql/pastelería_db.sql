CREATE DATABASE IF NOT EXISTS la_foresta_db;
USE la_foresta_db;

-- Tabla de Clientes
CREATE TABLE customer (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(150) NOT NULL
);

-- Tabla de Categorías
CREATE TABLE category (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- Tabla de Productos del catálogo
CREATE TABLE product (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    base_price DECIMAL(10,2),
    FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE CASCADE
);

-- Tabla de Cabecera del Pedido
CREATE TABLE customer_order (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    delivery_date DATE NOT NULL,
    design_description TEXT NOT NULL,
    additional_comments TEXT,
    order_status ENUM('Pending', 'In Process', 'Ready', 'Delivered', 'Canceled') DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customer(id) ON DELETE RESTRICT
);

-- Tabla de Detalles del Pedido
CREATE TABLE order_detail (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_order_id INT NOT NULL,
    product_id INT NOT NULL,
    size VARCHAR(50) NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (customer_order_id) REFERENCES customer_order(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE RESTRICT
);

-- ==========================================
-- INSERCIÓN DE DATOS INICIALES
-- ==========================================

INSERT INTO category (name) VALUES 
('Torta'), ('Torta personalizada'), ('Bocaditos'), 
('Desayuno'), ('Queque'), ('Postre'), ('Helado artesanal');

INSERT INTO product (category_id, name) VALUES 
(1, 'Torta de chocolate'), (1, 'Torta tres leches'), (1, 'Torta de fresa'),
(2, 'Torta de cumpleaños'), (2, 'Torta infantil'), (2, 'Torta para eventos'),
(3, 'Bocaditos dulces'), (3, 'Bocaditos salados');