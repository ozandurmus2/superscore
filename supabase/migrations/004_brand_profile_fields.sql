-- Brand profile extra fields
ALTER TABLE brands
  ADD COLUMN IF NOT EXISTS contact_email TEXT,
  ADD COLUMN IF NOT EXISTS phone        TEXT,
  ADD COLUMN IF NOT EXISTS address      TEXT,
  ADD COLUMN IF NOT EXISTS city         TEXT,
  ADD COLUMN IF NOT EXISTS country      TEXT DEFAULT 'Türkiye',
  ADD COLUMN IF NOT EXISTS postcode     TEXT,
  ADD COLUMN IF NOT EXISTS founded_year TEXT,
  ADD COLUMN IF NOT EXISTS employees    TEXT,
  ADD COLUMN IF NOT EXISTS categories   TEXT[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS sub_category TEXT,
  ADD COLUMN IF NOT EXISTS category_tag TEXT;
