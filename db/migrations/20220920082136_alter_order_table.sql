-- migrate:up
ALTER TABLE orders ADD CONSTRAINT order_number_fkey FOREIGN KEY (order_number) REFERENCES orderlist (id);
ALTER TABLE orders ADD CONSTRAINT order_status_fkey FOREIGN KEY (order_status) REFERENCES orderstatus (id)

-- migrate:down

