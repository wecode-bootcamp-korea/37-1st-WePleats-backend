-- migrate:up
CREATE TABLE thumbnail_images(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    thumbnail_url VARCHAR(1000) NOT NULL,
    thumbnail_main BOOLEAN NOT NULL DEFAULT 0,
    create_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT thumnail_product_fkey FOREIGN KEY (product_id) REFERENCES products (id)
)
-- migrate:down
DROP TABLE thumnail_images