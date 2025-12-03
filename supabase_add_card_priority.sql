-- Add priority column to cards table for admin sorting
ALTER TABLE cards ADD COLUMN IF NOT EXISTS priority INTEGER DEFAULT 100;
ALTER TABLE cards ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT FALSE;

-- Create index for faster sorting
CREATE INDEX IF NOT EXISTS idx_cards_priority ON cards(priority ASC);
CREATE INDEX IF NOT EXISTS idx_cards_featured ON cards(featured) WHERE featured = TRUE;

-- Update existing cards with default priority
UPDATE cards SET priority = 100 WHERE priority IS NULL;

