-- migrate:up
CREATE TABLE colors(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    color VARCHAR(100) NOT NULL
)
-- migrate:down
DROP TABLE colors