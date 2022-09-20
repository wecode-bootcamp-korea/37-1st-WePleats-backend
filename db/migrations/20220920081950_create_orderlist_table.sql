-- migrate:up
CREATE TABLE orderlist(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    order_number INT NOT NULL,
    order_status INT NOT NULL,
    CONSTRAINT orderlist_status_fkey FOREIGN KEY (order_status) REFERENCES orderstatus (id)
)

-- migrate:down
DROP TABLE orderlist