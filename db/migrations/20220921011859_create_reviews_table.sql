-- migrate:up
CREATE TABLE reviews(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    comment VARCHAR(1000) NOT NULL,
    image_url VARCHAR(2000) NULL,
    create_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT review_user_fkey FOREIGN KEY (user_id) REFERENCES users (id),
    CONSTRAINT review_product_fkey FOREIGN KEY (product_id) REFERENCES products (id)
)
-- migrate:down
DROP TABLE reviews
