-- migrate:up
CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(200) NOT NULL,
    birthday DATE NOT NULL,
    phone_number VARCHAR(50) NOT NULL,
    address VARCHAR(1000) NOT NULL,
    gender VARCHAR(10) NOT NULL,
    profile_image VARCHAR(1000) NULL,
    grade INT NOT NULL DEFAULT 1,
    point INT NULL,
    create_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT users_email_ukey UNIQUE (email)
)

-- migrate:down
DROP TABLE users
