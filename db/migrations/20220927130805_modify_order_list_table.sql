-- migrate:up
ALTER TABLE order_list ADD price INT NOT NULL;
ALTER TABLE order_list ADD address VARCHAR(300) NOT NULL;

-- migrate:down

