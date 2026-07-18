CREATE DATABASE electromart;
USE electromart;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    image_url VARCHAR(255) NOT NULL
);

CREATE TABLE cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    product_id INT,
    quantity INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    total DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    product_id INT,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Insert sample products
INSERT INTO products (name, price, image_url) VALUES
('Smartphone', 599.00, 'https://via.placeholder.com/150'),
('Laptop', 999.00, 'https://via.placeholder.com/150'),
('Headphones', 99.00, 'https://via.placeholder.com/150'),
('Smartwatch', 199.00, 'https://via.placeholder.com/150'),
('Tablet', 399.00, 'https://via.placeholder.com/150'),
('Gaming Console', 499.00, 'https://via.placeholder.com/150'),
('Bluetooth Speaker', 79.00, 'https://via.placeholder.com/150'),
('Camera', 699.00, 'https://via.placeholder.com/150'),
('Monitor', 249.00, 'https://via.placeholder.com/150'),
('Keyboard', 49.00, 'https://via.placeholder.com/150');