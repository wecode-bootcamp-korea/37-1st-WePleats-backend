-- migrate:up
CREATE TABLE colors(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    color VARCHAR(20) NOT NULL
)
-- migrate:down
DROP TABLE colors