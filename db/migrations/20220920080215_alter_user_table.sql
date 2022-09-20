-- migrate:up
ALTER TABLE users ADD CONSTRAINT user_grade_fkey FOREIGN KEY (grade) REFERENCES grade (id)

-- migrate:down

