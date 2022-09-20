-- migrate:up
CREATE TABLE grade(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    grade VARCHAR(50)
)
-- migrate:down
DROP TABLE grade