-- migrate:up
CREATE TABLE order_statuses(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    status VARCHAR(30)
)
-- migrate:down
DROP TABLE order_statuses
