-- migrate:up
CREATE TABLE order_list(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    order_status INT NOT NULL,
    CONSTRAINT orderlist_status_fkey FOREIGN KEY (order_status) REFERENCES order_statuses (id)
)

-- migrate:down
DROP TABLE order_list