DROP DATABASE rarecheck;

CREATE DATABASE rarecheck;
USE rarecheck;

CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE
);

CREATE TABLE categories (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    category_name VARCHAR(255) UNIQUE NOT NULL
);

-- 疎通確認用
-- CREATE TABLE IF NOT EXISTS item (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     name VARCHAR(50) NOT NULL
-- );

-- INSERT INTO item (name) VALUES ('Item 1'), ('Item 2'), ('Item 3');