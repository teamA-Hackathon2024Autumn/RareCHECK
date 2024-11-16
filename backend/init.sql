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

CREATE TABLE questions (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    step INTEGER,
    question VARCHAR(1000) NOT NULL,
    question_image VARCHAR(255),
    correct_option VARCHAR(255) NOT NULL,
    wrong_option_1 VARCHAR(255) NOT NULL,
    wrong_option_2 VARCHAR(255) NOT NULL,
    explanation VARCHAR(1000) NOT NULL,
    explanation_image VARCHAR(255),
    is_accept BOOLEAN NOT NULL DEFAULT FALSE,
    difficulty INTEGER, -- 1が易しい、2が普通、3が難しい
    comment VARCHAR(500),
    has_comment BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    user_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- 疎通確認用
-- CREATE TABLE IF NOT EXISTS item (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     name VARCHAR(50) NOT NULL
-- );

-- INSERT INTO item (name) VALUES ('Item 1'), ('Item 2'), ('Item 3');