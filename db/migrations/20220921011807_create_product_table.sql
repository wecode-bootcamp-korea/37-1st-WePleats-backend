-- migrate:up
CREATE TABLE products(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(2000) NULL,
    category INT NOT NULL,
    color INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    new BOOLEAN NOT NULL DEFAULT 0,
    create_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT product_category_fkey FOREIGN KEY (category) REFERENCES categorys (id),
    CONSTRAINT product_color_fkey FOREIGN KEY (color) REFERENCES colors (id)
);
-- migrate:down
DROP TABLE products
