-- migrate:up
CREATE TABLE coupons(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    coupon_money INT NOT NULL
)
-- migrate:down
DROP TABLE coupons