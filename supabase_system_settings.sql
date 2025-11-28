-- Create a key-value store for system settings
CREATE TABLE IF NOT EXISTS public.system_settings (
  key TEXT PRIMARY KEY,
  value TEXT,
  description TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Enable RLS
ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Allow public read access
CREATE POLICY "Public can read system settings"
  ON public.system_settings
  FOR SELECT
  TO public
  USING (true);

-- Allow admin full access (using service_role or authenticated admin if you have admin check)
-- For simplicity, we'll allow authenticated users with admin role, or service role.
-- Assuming we trust authenticated users who are admins, or we use service_role for admin ops.
-- Let's stick to the pattern: anon/auth can read, service_role can write.
CREATE POLICY "Admins can update settings"
  ON public.system_settings
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Insert default WhatsApp Group URL
INSERT INTO public.system_settings (key, value, description)
VALUES 
  ('whatsapp_group_url', 'https://chat.whatsapp.com/placeholder', 'WhatsApp 討論群連結')
ON CONFLICT (key) DO NOTHING;

