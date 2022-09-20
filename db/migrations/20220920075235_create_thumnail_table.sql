-- migrate:up
CREATE TABLE thumnail_images(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    thumnail_url VARCHAR(1000) NOT NULL,
    thumnail_main BOOLEAN NOT NULL DEFAULT 0,
    create_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT thumnail_product_fkey FOREIGN KEY (product_id) REFERENCES products (id)
)
-- migrate:down
DROP TABLE thumnail_images