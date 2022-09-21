-- migrate:up
CREATE TABLE categorys(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    main_category INT NOT NULL,
    sub_category VARCHAR(50) NOT NULL,
    CONSTRAINT category_main_fkey FOREIGN KEY (main_category) REFERENCES main_categorys (id)
)
-- migrate:down
DROP TABLE categorys

