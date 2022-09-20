-- migrate:up
CREATE TABLE usecoupons(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    coupon_id INT NOT NULL,
    quantity INT NOT NULL,
    CONSTRAINT coupon_user_fkey FOREIGN KEY (user_id) REFERENCES users (id),
    CONSTRAINT coupon_user_ukey UNIQUE (user_id, coupon_id)
)
-- migrate:down
DROP TABLE usecoupons