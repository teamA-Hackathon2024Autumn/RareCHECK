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

-- usersのサンプルデータ
INSERT INTO users (username, email, password, is_admin) VALUES ('testuser1', 'test1@email.com', 'testtest1', TRUE);
INSERT INTO users (username, email, password, is_admin) VALUES ('testuser2', 'test2@email.com', 'testtest2', TRUE);
INSERT INTO users (username, email, password, is_admin) VALUES ('testuser3', 'test3@email.com', 'testtest3', TRUE);

-- categoriesのサンプルデータ
INSERT INTO categories (category_name) VALUES ('インフラ'),('プログラミング'),('ウェブシステム'),('アーキテクティング'),('セキュリティ'),('AI/データサイエンス'),('UI/UX'),('ビジネススキル'),('その他');

-- questionsのサンプルデータ
-- コメントありデータ is_acceptがTrue
-- INSERT INTO questions (step, question, correct_option, wrong_option_1, wrong_option_2, explanation, is_accept, difficulty, comment, has_comment, user_id, category_id) VALUES (1, 'IPアドレスv4は何bitでしょうか', '32', '64', '1024', 'IPアドレスv4は32bitです', TRUE, 1, "goodです", TRUE, 1, 1);
-- -- コメントありデータ is_acceptがFalse
-- INSERT INTO questions (step, question, correct_option, wrong_option_1, wrong_option_2, explanation, is_accept, difficulty, comment, has_comment, user_id, category_id) VALUES (2, 'IPアドレスv4は何bitでしょうか', '32', '64', '1024', 'IPアドレスv4は32bitです', FALSE, 1, "niceです", TRUE, 2, 1);
-- -- コメントなしデータ is_acceptがTrue
-- INSERT INTO questions (step, question, correct_option, wrong_option_1, wrong_option_2, explanation, is_accept, difficulty, user_id, category_id) VALUES (3, 'IPアドレスv4は何bitでしょうか', '32', '64', '1024', 'IPアドレスv4は32bitです', TRUE, 1, 1, 1);
-- -- コメントなしデータ is_acceptがFalse
-- INSERT INTO questions (step, question, correct_option, wrong_option_1, wrong_option_2, explanation, is_accept, difficulty, user_id, category_id) VALUES (4, 'IPアドレスv4は何bitでしょうか', '32', '64', '1024', 'IPアドレスv4は32bitです', FALSE, 1, 1, 1);

-- 問題絞り込みようquestionsのテストデータ
-- INSERT INTO questions (step, question, correct_option, wrong_option_1, wrong_option_2, explanation, is_accept, difficulty, user_id, category_id) VALUES (1, 'IPアドレスv4は何bitでしょうか', '32', '64', '1024', 'IPアドレスv4は32bitです', TRUE, 1, 1, 1);
-- INSERT INTO questions (step, question, correct_option, wrong_option_1, wrong_option_2, explanation, is_accept, difficulty, user_id, category_id) VALUES (10, 'IPアドレスv4は何bitでしょうか', '32', '64', '1024', 'IPアドレスv4は32bitです', TRUE, 2, 1, 1);
-- INSERT INTO questions (step, question, correct_option, wrong_option_1, wrong_option_2, explanation, is_accept, difficulty, user_id, category_id) VALUES (50, 'IPアドレスv4は何bitでしょうか', '32', '64', '1024', 'IPアドレスv4は32bitです', TRUE, 3, 1, 1);
-- INSERT INTO questions (step, question, correct_option, wrong_option_1, wrong_option_2, explanation, is_accept, difficulty, user_id, category_id) VALUES (100, 'MACアドレスは何bitでしょうか', '48', '64', '1024', 'IPアドレスv4は32bitです', TRUE, 1, 1, 1);
-- INSERT INTO questions (step, question, correct_option, wrong_option_1, wrong_option_2, explanation, is_accept, difficulty, user_id, category_id) VALUES (150, 'MACアドレスは何bitでしょうか', '48', '64', '1024', 'IPアドレスv4は32bitです', TRUE, 2, 1, 1);
-- INSERT INTO questions (step, question, correct_option, wrong_option_1, wrong_option_2, explanation, is_accept, difficulty, user_id, category_id) VALUES (300, 'MACアドレス何bitでしょうか', '48', '64', '1024', 'IPアドレスv4は32bitです', TRUE, 3, 1, 1);

-- 問題一覧取得用のquestionsのテストデータ
-- user_id 1の人のデータ
INSERT INTO questions (step, question, correct_option, wrong_option_1, wrong_option_2, explanation, is_accept, difficulty, user_id, category_id) VALUES (1, 'What is the capital of France?', 'Paris', 'London', 'Berlin', 'Paris is the capital city of France.', TRUE, 1, 1, 1);
INSERT INTO questions (step, question, correct_option, wrong_option_1, wrong_option_2, explanation, is_accept, difficulty, user_id, category_id) VALUES (2, 'What is 2 + 2?', '4', '3', '5', '2 + 2 equals 4.', TRUE, 1, 1, 2);
INSERT INTO questions (step, question, correct_option, wrong_option_1, wrong_option_2, explanation, is_accept, difficulty, user_id, category_id) VALUES (3, 'Which is the largest planet in our Solar System?', 'Jupiter', 'Earth', 'Mars', 'Jupiter is the largest planet.', TRUE, 2, 1, 3);

-- user_id 2の人のデータ
INSERT INTO questions (step, question, correct_option, wrong_option_1, wrong_option_2, explanation, is_accept, difficulty, user_id, category_id) VALUES (1, 'Who wrote Hamlet?', 'Shakespeare', 'Hemingway', 'Dickens', 'Shakespeare wrote Hamlet.', TRUE, 1, 2, 1);
INSERT INTO questions (step, question, correct_option, wrong_option_1, wrong_option_2, explanation, is_accept, difficulty, user_id, category_id) VALUES (2, 'What is the boiling point of water in Celsius?', '100', '90', '110', 'Water boils at 100°C.', TRUE, 1, 2, 2);
INSERT INTO questions (step, question, correct_option, wrong_option_1, wrong_option_2, explanation, is_accept, difficulty, user_id, category_id) VALUES (3, 'Which element has the chemical symbol O?', 'Oxygen', 'Gold', 'Iron', 'Oxygen has the symbol O.', TRUE, 1, 2, 3);

-- user_id 3の人のデータ
INSERT INTO questions (step, question, correct_option, wrong_option_1, wrong_option_2, explanation, is_accept, difficulty, user_id, category_id) VALUES (1, 'What is the speed of light in vacuum?', '299,792 km/s', '300,000 km/s', '280,000 km/s', 'The speed of light is approximately 299,792 km/s.', TRUE, 1, 3, 1);
INSERT INTO questions (step, question, correct_option, wrong_option_1, wrong_option_2, explanation, is_accept, difficulty, user_id, category_id) VALUES (2, 'What is the currency of Japan?', 'Yen', 'Dollar', 'Won', 'Yen is the currency used in Japan.', TRUE, 1, 3, 2);
INSERT INTO questions (step, question, correct_option, wrong_option_1, wrong_option_2, explanation, is_accept, difficulty, user_id, category_id) VALUES (3, 'What is the largest desert in the world?', 'Sahara', 'Gobi', 'Antarctica', 'The Sahara is the largest hot desert, but Antarctica is the largest desert overall.', TRUE, 1, 3, 3);

-- 疎通確認用
-- CREATE TABLE IF NOT EXISTS item (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     name VARCHAR(50) NOT NULL
-- );

-- INSERT INTO item (name) VALUES ('Item 1'), ('Item 2'), ('Item 3');