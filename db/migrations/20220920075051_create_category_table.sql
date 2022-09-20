-- migrate:up
CREATE TABLE categorys(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    main_category VARCHAR(100) NOT NULL,
    category VARCHAR(100) NOT NULL
)
-- migrate:down
DROP TABLE categorys
