-- Add rating column to complaints table
ALTER TABLE complaints ADD COLUMN IF NOT EXISTS rating INT DEFAULT NULL CHECK (rating IS NULL OR (rating >= 1 AND rating <= 5));

-- Backfill existing complaints with ratings from reviews
UPDATE complaints c
SET rating = r.rating
FROM reviews r
WHERE r.complaint_id = c.id
AND c.rating IS NULL;
