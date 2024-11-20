DROP DATABASE rarecheck;

CREATE DATABASE rarecheck;
USE rarecheck;

CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
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

CREATE TABLE rankings (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    date TIMESTAMP NOT NULL,
    _1st VARCHAR(255),
    _2nd VARCHAR(255),
    _3rd VARCHAR(255),
    _4th VARCHAR(255),
    _5th VARCHAR(255),
    _6th VARCHAR(255),
    _7th VARCHAR(255),
    _8th VARCHAR(255),
    _9th VARCHAR(255),
    _10th VARCHAR(255)
);

CREATE TABLE learning_records (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    is_solved BOOLEAN DEFAULT FALSE,
    user_id INTEGER NOT NULL,
    question_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
);

INSERT INTO users (username, email, password, is_admin) VALUES ('testuser', 'test@email.com', 'testtest', TRUE);
INSERT INTO categories (category_name) VALUES ('インフラ'),('プログラミング'),('ウェブシステム'),('アーキテクティング'),('セキュリティ'),('AI/データサイエンス'),('UI/UX'),('ビジネススキル'),('その他');
INSERT INTO questions (step, question, correct_option, wrong_option_1, wrong_option_2, explanation, difficulty, user_id, category_id) VALUES (1, 'IPアドレスv4は何bitでしょうか', '32', '64', '1024', 'IPアドレスv4は32bitです', 1, 1, 1);
INSERT INTO questions (step, question, correct_option, wrong_option_1, wrong_option_2, explanation, difficulty, user_id, category_id) VALUES (2, 'IPアドレスv4は何bitでしょうか', '32', '64', '1024', 'IPアドレスv4は32bitです', 1, 1, 1);

-- 疎通確認用
-- CREATE TABLE IF NOT EXISTS item (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     name VARCHAR(50) NOT NULL
-- );

-- INSERT INTO item (name) VALUES ('Item 1'), ('Item 2'), ('Item 3');