-- migrate:up
ALTER TABLE products ADD CONSTRAINT product_category_fkey FOREIGN KEY (category) REFERENCES categorys(id);
ALTER TABLE products ADD CONSTRAINT product_color_fkey FOREIGN KEY (color) REFERENCES colors (id)

-- migrate:down

