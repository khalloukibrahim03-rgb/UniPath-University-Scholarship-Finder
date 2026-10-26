-- Migration: Initial UniPath Schema & RLS Policies
-- Description: Creates universities, academic_programs, admission_requirements, scholarships, student_profiles, user_applications, and application_tasks tables.

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Universities Table
CREATE TABLE IF NOT EXISTS public.universities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  country VARCHAR(100) NOT NULL,
  city VARCHAR(100) NOT NULL,
  website_url TEXT NOT NULL,
  logo_url TEXT,
  description TEXT,
  ranking_national INT,
  ranking_global INT,
  is_public BOOLEAN DEFAULT true,
  verification_status VARCHAR(50) DEFAULT 'unverified' CHECK (verification_status IN ('verified', 'unverified', 'needs_review')),
  verified_at TIMESTAMPTZ,
  source_url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Academic Programs Table
CREATE TABLE IF NOT EXISTS public.academic_programs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  university_id UUID NOT NULL REFERENCES public.universities(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  degree_level VARCHAR(50) NOT NULL CHECK (degree_level IN ('Bachelor', 'Master', 'Doctorate', 'Certificate', 'Diploma')),
  field_of_study VARCHAR(100) NOT NULL,
  language_of_instruction VARCHAR(50) NOT NULL,
  duration_months INT NOT NULL,
  tuition_fee_annual NUMERIC(10,2) NOT NULL DEFAULT 0.00,
  currency VARCHAR(10) NOT NULL DEFAULT 'EUR',
  application_open_date DATE,
  application_deadline DATE,
  verification_status VARCHAR(50) DEFAULT 'unverified',
  verified_at TIMESTAMPTZ,
  source_url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Admission Requirements Table
CREATE TABLE IF NOT EXISTS public.admission_requirements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id UUID NOT NULL REFERENCES public.academic_programs(id) ON DELETE CASCADE,
  requirement_type VARCHAR(100) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  is_mandatory BOOLEAN DEFAULT true,
  accepted_qualifications JSONB DEFAULT '[]'::jsonb,
  verification_status VARCHAR(50) DEFAULT 'unverified',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Scholarships Table
CREATE TABLE IF NOT EXISTS public.scholarships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  provider_name VARCHAR(255) NOT NULL,
  target_countries JSONB DEFAULT '[]'::jsonb,
  destination_countries JSONB DEFAULT '[]'::jsonb,
  coverage_type VARCHAR(50) NOT NULL CHECK (coverage_type IN ('Full Ride', 'Full Tuition', 'Partial Tuition', 'Living Stipend')),
  stipend_amount_annual NUMERIC(10,2) DEFAULT 0.00,
  currency VARCHAR(10) DEFAULT 'EUR',
  eligible_degrees JSONB DEFAULT '[]'::jsonb,
  application_deadline DATE,
  application_url TEXT NOT NULL,
  verification_status VARCHAR(50) DEFAULT 'unverified',
  verified_at TIMESTAMPTZ,
  source_url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Student Profiles Table
CREATE TABLE IF NOT EXISTS public.student_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name VARCHAR(255),
  nationality VARCHAR(100) DEFAULT 'Moroccan',
  current_education_level VARCHAR(100),
  baccalaureate_track VARCHAR(100),
  gpa_average NUMERIC(4,2),
  preferred_destinations JSONB DEFAULT '[]'::jsonb,
  max_annual_budget NUMERIC(10,2) DEFAULT 0.00,
  language_skills JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 6. User Applications Table
CREATE TABLE IF NOT EXISTS public.user_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.student_profiles(id) ON DELETE CASCADE,
  program_id UUID REFERENCES public.academic_programs(id) ON DELETE SET NULL,
  scholarship_id UUID REFERENCES public.scholarships(id) ON DELETE SET NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'Saved' CHECK (status IN ('Saved', 'Preparing Docs', 'Submitted', 'Interview Scheduled', 'Accepted', 'Rejected')),
  notes TEXT,
  target_deadline DATE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 7. Application Tasks Table
CREATE TABLE IF NOT EXISTS public.application_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID NOT NULL REFERENCES public.user_applications(id) ON DELETE CASCADE,
  task_title VARCHAR(255) NOT NULL,
  is_completed BOOLEAN DEFAULT false,
  due_date DATE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on user tables
ALTER TABLE public.student_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.application_tasks ENABLE ROW LEVEL SECURITY;

-- Grant public read access to universities, programs, requirements, scholarships
GRANT SELECT ON public.universities TO anon, authenticated;
GRANT SELECT ON public.academic_programs TO anon, authenticated;
GRANT SELECT ON public.admission_requirements TO anon, authenticated;
GRANT SELECT ON public.scholarships TO anon, authenticated;

-- RLS Policies for Student Profiles
CREATE POLICY "Users can view own profile" ON public.student_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.student_profiles
  FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for User Applications
CREATE POLICY "Users can manage own applications" ON public.user_applications
  FOR ALL USING (auth.uid() = user_id);

-- RLS Policies for Application Tasks
CREATE POLICY "Users can manage own application tasks" ON public.application_tasks
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.user_applications
      WHERE id = application_tasks.application_id
      AND user_id = auth.uid()
    )
  );
