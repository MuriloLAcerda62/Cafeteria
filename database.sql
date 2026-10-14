CREATE DATABASE IF NOT EXISTS cafeteria
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE cafeteria;

DROP TABLE IF EXISTS produto;

CREATE TABLE produto (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  categoria VARCHAR(50) NOT NULL,
  preco DECIMAL(10,2) NOT NULL
);

INSERT INTO produto (nome, categoria, preco) VALUES
  ('Espresso', 'Bebida quente', 6.50),
  ('Cappuccino', 'Bebida quente', 9.90),
  ('Pao de queijo', 'Salgado', 5.00);