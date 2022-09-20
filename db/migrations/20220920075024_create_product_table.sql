-- migrate:up
CREATE TABLE products(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(2000) NULL,
    category INT NOT NULL,
    color INT NOT NULL,
    price DECIMAL NOT NULL,
    new BOOLEAN NOT NULL DEFAULT 0,
    create_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
-- migrate:down
DROP TABLE products
