-- migrate:up
CREATE TABLE chats(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    user_comment VARCHAR(300),
    admin_comment VARCHAR(300),
    create_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chat_user_fkey FOREIGN KEY (user_id) REFERENCES users (id)
)
-- migrate:down
DROP TABLE chats
