-- Superscore Database Schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- ENUMS
-- ============================================

CREATE TYPE user_role AS ENUM ('customer', 'brand_admin', 'super_admin');
CREATE TYPE brand_member_role AS ENUM ('owner', 'admin', 'agent');
CREATE TYPE subscription_plan AS ENUM ('free_trial', 'starter', 'pro', 'enterprise');
CREATE TYPE complaint_category AS ENUM (
  'refund', 'defective_product', 'late_delivery', 'wrong_product',
  'customer_service', 'warranty', 'price_dispute', 'other'
);
CREATE TYPE complaint_status AS ENUM (
  'pending', 'in_review', 'brand_responded', 'awaiting_customer',
  'resolved', 'closed', 'escalated'
);
CREATE TYPE complaint_priority AS ENUM ('low', 'medium', 'high', 'urgent');
CREATE TYPE response_type AS ENUM ('brand_response', 'customer_reply', 'system_note', 'admin_note');
CREATE TYPE document_type AS ENUM (
  'invoice', 'receipt', 'refund_proof', 'shipping_proof',
  'warranty_card', 'screenshot', 'other'
);
CREATE TYPE notification_type AS ENUM (
  'new_complaint', 'brand_response', 'complaint_resolved', 'review_received', 'system'
);

-- ============================================
-- TABLES
-- ============================================

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT,
  avatar_url TEXT,
  role user_role NOT NULL DEFAULT 'customer',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Brands table
CREATE TABLE brands (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  logo_url TEXT,
  website TEXT,
  description TEXT,
  category TEXT NOT NULL DEFAULT 'diğer',
  is_verified BOOLEAN NOT NULL DEFAULT FALSE,
  is_subscribed BOOLEAN NOT NULL DEFAULT FALSE,
  subscription_plan subscription_plan,
  trial_ends_at TIMESTAMPTZ,
  superscore DECIMAL(5,2) NOT NULL DEFAULT 0,
  total_complaints INT NOT NULL DEFAULT 0,
  resolved_complaints INT NOT NULL DEFAULT 0,
  avg_response_time_hours DECIMAL(10,2),
  avg_rating DECIMAL(3,2),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Brand members table
CREATE TABLE brand_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  brand_id UUID NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role brand_member_role NOT NULL DEFAULT 'agent',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(brand_id, user_id)
);

-- Complaints table
CREATE TABLE complaints (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  complaint_number TEXT NOT NULL UNIQUE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  brand_id UUID NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category complaint_category NOT NULL DEFAULT 'other',
  status complaint_status NOT NULL DEFAULT 'pending',
  priority complaint_priority NOT NULL DEFAULT 'medium',
  order_number TEXT,
  purchase_date DATE,
  desired_resolution TEXT NOT NULL,
  is_public BOOLEAN NOT NULL DEFAULT TRUE,
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Complaint responses table
CREATE TABLE complaint_responses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  complaint_id UUID NOT NULL REFERENCES complaints(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  response_type response_type NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Complaint documents table
CREATE TABLE complaint_documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  complaint_id UUID NOT NULL REFERENCES complaints(id) ON DELETE CASCADE,
  uploaded_by UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  file_url TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_type TEXT NOT NULL,
  document_type document_type NOT NULL DEFAULT 'other',
  ai_analysis JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Reviews table
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  brand_id UUID NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
  complaint_id UUID REFERENCES complaints(id) ON DELETE SET NULL,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT,
  comment TEXT NOT NULL,
  is_verified_purchase BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Notifications table
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type notification_type NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT FALSE,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================

CREATE INDEX idx_brands_slug ON brands(slug);
CREATE INDEX idx_brands_category ON brands(category);
CREATE INDEX idx_brands_superscore ON brands(superscore DESC);
CREATE INDEX idx_complaints_user ON complaints(user_id);
CREATE INDEX idx_complaints_brand ON complaints(brand_id);
CREATE INDEX idx_complaints_status ON complaints(status);
CREATE INDEX idx_complaints_number ON complaints(complaint_number);
CREATE INDEX idx_complaint_responses_complaint ON complaint_responses(complaint_id);
CREATE INDEX idx_complaint_documents_complaint ON complaint_documents(complaint_id);
CREATE INDEX idx_reviews_brand ON reviews(brand_id);
CREATE INDEX idx_reviews_user ON reviews(user_id);
CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_unread ON notifications(user_id, is_read) WHERE NOT is_read;

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE brand_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE complaints ENABLE ROW LEVEL SECURITY;
ALTER TABLE complaint_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE complaint_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view their own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Public can view user names" ON users FOR SELECT USING (true);
CREATE POLICY "Service role can insert users" ON users FOR INSERT WITH CHECK (true);

-- Brands policies
CREATE POLICY "Anyone can view brands" ON brands FOR SELECT USING (true);
CREATE POLICY "Brand admins can update their brand" ON brands FOR UPDATE USING (
  EXISTS (SELECT 1 FROM brand_members WHERE brand_id = brands.id AND user_id = auth.uid() AND role IN ('owner', 'admin'))
);
CREATE POLICY "Authenticated users can create brands" ON brands FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Brand members policies
CREATE POLICY "Anyone can view brand members" ON brand_members FOR SELECT USING (true);
CREATE POLICY "Brand owners can manage members" ON brand_members FOR ALL USING (
  EXISTS (SELECT 1 FROM brand_members bm WHERE bm.brand_id = brand_members.brand_id AND bm.user_id = auth.uid() AND bm.role = 'owner')
);
CREATE POLICY "Users can see their own memberships" ON brand_members FOR SELECT USING (user_id = auth.uid());

-- Complaints policies
CREATE POLICY "Public complaints are viewable by anyone" ON complaints FOR SELECT USING (is_public = true);
CREATE POLICY "Users can view their own complaints" ON complaints FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Brand members can view brand complaints" ON complaints FOR SELECT USING (
  EXISTS (SELECT 1 FROM brand_members WHERE brand_id = complaints.brand_id AND user_id = auth.uid())
);
CREATE POLICY "Authenticated users can create complaints" ON complaints FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own complaints" ON complaints FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "Brand members can update complaints" ON complaints FOR UPDATE USING (
  EXISTS (SELECT 1 FROM brand_members WHERE brand_id = complaints.brand_id AND user_id = auth.uid())
);

-- Complaint responses policies
CREATE POLICY "Anyone can view responses on public complaints" ON complaint_responses FOR SELECT USING (
  EXISTS (SELECT 1 FROM complaints WHERE id = complaint_id AND is_public = true)
);
CREATE POLICY "Complaint participants can view responses" ON complaint_responses FOR SELECT USING (
  EXISTS (SELECT 1 FROM complaints WHERE id = complaint_id AND (user_id = auth.uid() OR EXISTS (SELECT 1 FROM brand_members WHERE brand_id = complaints.brand_id AND user_id = auth.uid())))
);
CREATE POLICY "Participants can create responses" ON complaint_responses FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Complaint documents policies
CREATE POLICY "Anyone can view documents of public complaints" ON complaint_documents FOR SELECT USING (
  EXISTS (SELECT 1 FROM complaints WHERE id = complaint_id AND is_public = true)
);
CREATE POLICY "Participants can view documents" ON complaint_documents FOR SELECT USING (
  EXISTS (SELECT 1 FROM complaints WHERE id = complaint_id AND (user_id = auth.uid() OR EXISTS (SELECT 1 FROM brand_members WHERE brand_id = complaints.brand_id AND user_id = auth.uid())))
);
CREATE POLICY "Participants can upload documents" ON complaint_documents FOR INSERT WITH CHECK (auth.uid() = uploaded_by);

-- Reviews policies
CREATE POLICY "Anyone can view reviews" ON reviews FOR SELECT USING (true);
CREATE POLICY "Users can create reviews" ON reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own reviews" ON reviews FOR UPDATE USING (user_id = auth.uid());

-- Notifications policies
CREATE POLICY "Users can view their own notifications" ON notifications FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can update their own notifications" ON notifications FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "System can create notifications" ON notifications FOR INSERT WITH CHECK (true);

-- ============================================
-- FUNCTIONS
-- ============================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER brands_updated_at BEFORE UPDATE ON brands FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER complaints_updated_at BEFORE UPDATE ON complaints FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER reviews_updated_at BEFORE UPDATE ON reviews FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Auto-generate complaint number
CREATE OR REPLACE FUNCTION generate_complaint_number()
RETURNS TRIGGER AS $$
DECLARE
  next_num INT;
BEGIN
  SELECT COALESCE(MAX(CAST(SUBSTRING(complaint_number FROM 9) AS INT)), 0) + 1
  INTO next_num
  FROM complaints
  WHERE complaint_number LIKE 'SS-' || EXTRACT(YEAR FROM NOW())::TEXT || '-%';

  NEW.complaint_number = 'SS-' || EXTRACT(YEAR FROM NOW())::TEXT || '-' || LPAD(next_num::TEXT, 5, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER complaints_auto_number
  BEFORE INSERT ON complaints
  FOR EACH ROW
  WHEN (NEW.complaint_number IS NULL OR NEW.complaint_number = '')
  EXECUTE FUNCTION generate_complaint_number();

-- Update brand stats when complaint changes
CREATE OR REPLACE FUNCTION update_brand_stats()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE brands SET
    total_complaints = (SELECT COUNT(*) FROM complaints WHERE brand_id = COALESCE(NEW.brand_id, OLD.brand_id)),
    resolved_complaints = (SELECT COUNT(*) FROM complaints WHERE brand_id = COALESCE(NEW.brand_id, OLD.brand_id) AND status = 'resolved'),
    avg_rating = (SELECT AVG(rating)::DECIMAL(3,2) FROM reviews WHERE brand_id = COALESCE(NEW.brand_id, OLD.brand_id))
  WHERE id = COALESCE(NEW.brand_id, OLD.brand_id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER complaints_update_brand_stats
  AFTER INSERT OR UPDATE OR DELETE ON complaints
  FOR EACH ROW EXECUTE FUNCTION update_brand_stats();

-- Update brand avg_rating when review changes
CREATE OR REPLACE FUNCTION update_brand_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE brands SET
    avg_rating = (SELECT AVG(rating)::DECIMAL(3,2) FROM reviews WHERE brand_id = COALESCE(NEW.brand_id, OLD.brand_id))
  WHERE id = COALESCE(NEW.brand_id, OLD.brand_id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER reviews_update_brand_rating
  AFTER INSERT OR UPDATE OR DELETE ON reviews
  FOR EACH ROW EXECUTE FUNCTION update_brand_rating();

-- Handle new user signup - create profile
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'customer')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================
-- SEED DATA (sample brands)
-- ============================================

INSERT INTO brands (name, slug, category, superscore, total_complaints, resolved_complaints, avg_rating, description) VALUES
  ('Trendyol', 'trendyol', 'e-ticaret', 72, 1250, 980, 3.8, 'Türkiye''nin lider e-ticaret platformu'),
  ('Hepsiburada', 'hepsiburada', 'e-ticaret', 68, 890, 650, 3.5, 'Online alışverişin adresi'),
  ('Türk Telekom', 'turk-telekom', 'telekomünikasyon', 55, 2100, 1050, 2.8, 'Türkiye''nin telekomünikasyon devi'),
  ('Vodafone', 'vodafone', 'telekomünikasyon', 62, 1800, 1100, 3.2, 'İletişim teknolojileri şirketi'),
  ('Getir', 'getir', 'yemek', 78, 450, 380, 4.1, 'Dakikalar içinde teslimat'),
  ('Yemeksepeti', 'yemeksepeti', 'yemek', 65, 680, 420, 3.4, 'Online yemek siparişi platformu'),
  ('N11', 'n11', 'e-ticaret', 58, 720, 400, 3.0, 'E-ticaret pazaryeri'),
  ('Amazon Türkiye', 'amazon-turkiye', 'e-ticaret', 82, 320, 290, 4.3, 'Dünyanın en büyük online mağazası'),
  ('Garanti BBVA', 'garanti-bbva', 'finans', 70, 560, 420, 3.6, 'Bankacılık hizmetleri'),
  ('Akbank', 'akbank', 'finans', 66, 480, 330, 3.3, 'Dijital bankacılık')
ON CONFLICT (slug) DO NOTHING;
