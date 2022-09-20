-- migrate:up
CREATE TABLE orderstatus(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    status VARCHAR(100)
)
-- migrate:down
DROP TABLE orderstatus
