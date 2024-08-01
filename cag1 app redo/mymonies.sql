CREATE DATABASE mymonies;
USE mymonies;

CREATE TABLE transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    amount FLOAT NOT NULL,
    type TEXT NOT NULL,
    entity VARCHAR(255) NOT NULL,
    remarks TEXT,
    date DATETIME DEFAULT CURRENT_TIMESTAMP
);
