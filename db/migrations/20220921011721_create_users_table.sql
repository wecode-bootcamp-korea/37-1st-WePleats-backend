-- migrate:up
CREATE TABLE users(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(10) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(1000) NOT NULL,
    birthday DATE NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    address VARCHAR(300) NOT NULL,
    gender VARCHAR(10) NOT NULL,
    profile_image VARCHAR(1000) NULL,
    grade INT NOT NULL DEFAULT 1,
    point INT NULL,
    create_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT users_email_ukey UNIQUE (email),
    CONSTRAINT user_grade_fkey FOREIGN KEY (grade) REFERENCES grades (id)
)
-- migrate:down
DROP TABLE users
