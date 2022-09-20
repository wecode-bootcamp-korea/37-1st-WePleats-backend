-- migrate:up
ALTER TABLE usecoupons ADD CONSTRAINT usecoupon_coupon_fkey FOREIGN KEY (coupon_id) REFERENCES coupons (id)
-- migrate:down

