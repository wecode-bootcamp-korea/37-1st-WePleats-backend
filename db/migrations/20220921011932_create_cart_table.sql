-- migrate:up
CREATE TABLE carts(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    CONSTRAINT cart_user_fkey FOREIGN KEY (user_id) REFERENCES users (id),
    CONSTRAINT cart_product_fkey FOREIGN KEY (product_id) REFERENCES products (id),
    CONSTRAINT cart_user_pro_ukey UNIQUE (user_id, product_id)
)
-- migrate:down
DROP TABLE carts