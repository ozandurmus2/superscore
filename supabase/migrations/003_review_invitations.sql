-- Review Invitations Table
-- Tracks email invitations sent to customers to leave reviews

CREATE TYPE invitation_status AS ENUM (
  'pending', 'sent', 'opened', 'clicked', 'reviewed', 'bounced', 'unsubscribed'
);

CREATE TYPE invitation_type AS ENUM (
  'email', 'widget', 'manual'
);

CREATE TABLE IF NOT EXISTS review_invitations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  brand_id UUID NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  reference VARCHAR(255),          -- order/invoice/customer reference number
  type invitation_type DEFAULT 'email',
  status invitation_status DEFAULT 'pending',
  template_id VARCHAR(100),        -- which email template was used
  sent_at TIMESTAMPTZ,
  opened_at TIMESTAMPTZ,
  clicked_at TIMESTAMPTZ,
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS
ALTER TABLE review_invitations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "brand_members_can_manage_invitations"
  ON review_invitations
  FOR ALL
  USING (
    brand_id IN (
      SELECT brand_id FROM brand_members WHERE user_id = auth.uid()
    )
  );

-- Index for performance
CREATE INDEX idx_review_invitations_brand_id ON review_invitations(brand_id);
CREATE INDEX idx_review_invitations_email ON review_invitations(email);
CREATE INDEX idx_review_invitations_status ON review_invitations(status);
CREATE INDEX idx_review_invitations_created_at ON review_invitations(created_at DESC);
