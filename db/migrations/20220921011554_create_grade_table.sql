-- migrate:up
CREATE TABLE grades(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    grade VARCHAR(20)
)
-- migrate:down
DROP TABLE grades