-- migrate:up
CREATE TABLE product_images(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    image_url VARCHAR(1000) NULL,
    create_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT productimage_product_fkey FOREIGN KEY (product_id) REFERENCES products (id)
)
-- migrate:down
DROP TABLE product_images
