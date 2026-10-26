-- Migration: Configure Secure Administrator Access
-- Description: Assigns super_admin role to authorized administrator ibrahimkhallouki2@gmail.com upon account creation in Supabase Auth.

-- 1. Helper function to check if email is authorized admin
CREATE OR REPLACE FUNCTION public.is_authorized_admin_email(user_email TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  -- Strict whitelist check for primary administrator email
  RETURN LOWER(user_email) = 'ibrahimkhallouki2@gmail.com';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Trigger function to auto-assign admin role when authorized email registers or verifies
CREATE OR REPLACE FUNCTION public.handle_admin_user_signup()
RETURNS TRIGGER AS $$
BEGIN
  IF public.is_authorized_admin_email(NEW.email) THEN
    INSERT INTO public.admin_users (user_id, role)
    VALUES (NEW.id, 'super_admin')
    ON CONFLICT (user_id) DO UPDATE SET role = 'super_admin';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Attach trigger to auth.users table
DROP TRIGGER IF EXISTS on_auth_user_created_admin ON auth.users;
CREATE TRIGGER on_auth_user_created_admin
  AFTER INSERT OR UPDATE OF email ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_admin_user_signup();

-- 4. If user with email ibrahimkhallouki2@gmail.com already exists in auth.users, promote immediately
INSERT INTO public.admin_users (user_id, role)
SELECT id, 'super_admin'
FROM auth.users
WHERE LOWER(email) = 'ibrahimkhallouki2@gmail.com'
ON CONFLICT (user_id) DO UPDATE SET role = 'super_admin';

-- 5. Updated RLS check to verify email authorization
CREATE OR REPLACE FUNCTION public.is_admin_user()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM public.admin_users au
    JOIN auth.users u ON u.id = au.user_id
    WHERE au.user_id = auth.uid()
      AND public.is_authorized_admin_email(u.email)
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
