-- migrate:up
CREATE TABLE main_categorys(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    main_category VARCHAR(30) NOT NULL
)
-- migrate:down
DROP TABLE main_categorys
