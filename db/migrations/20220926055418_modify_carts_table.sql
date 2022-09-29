-- migrate:up
ALTER TABLE carts ADD check_in BOOLEAN NOT NULL DEFAULT 1;

-- migrate:down

