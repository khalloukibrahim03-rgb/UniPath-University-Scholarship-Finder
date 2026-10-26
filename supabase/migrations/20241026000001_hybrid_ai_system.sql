-- Migration: Hybrid AI System Schema, Verification States, and Admin Security
-- Description: Establishes research_tasks, research_task_logs, proposed_records, claim_evidences, admin_audit_logs, and admin_users with strict RLS policies.

-- Create Data Quality Status ENUM type equivalent
-- States: 'DISCOVERED', 'UNVERIFIED', 'PARTIALLY_VERIFIED', 'VERIFIED', 'OUTDATED', 'CONFLICTED', 'REJECTED', 'DEMO_ONLY'

-- 1. Admin Users Table
CREATE TABLE IF NOT EXISTS public.admin_users (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role VARCHAR(50) NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Research Tasks Table
CREATE TABLE IF NOT EXISTS public.research_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  instruction TEXT NOT NULL,
  task_type VARCHAR(100) NOT NULL, -- e.g. 'research_university', 'find_requirements', 'verify_deadlines'
  status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'failed', 'cancelled')),
  target_institution VARCHAR(255),
  target_country VARCHAR(100) DEFAULT 'Morocco',
  metadata JSONB DEFAULT '{}'::jsonb,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Research Task Logs Table
CREATE TABLE IF NOT EXISTS public.research_task_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id UUID NOT NULL REFERENCES public.research_tasks(id) ON DELETE CASCADE,
  log_level VARCHAR(20) DEFAULT 'info' CHECK (log_level IN ('info', 'warn', 'error', 'debug')),
  message TEXT NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb,
  timestamp TIMESTAMPTZ DEFAULT now()
);

-- 4. Proposed Records (Staging Queue before Human Approval)
CREATE TABLE IF NOT EXISTS public.proposed_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id UUID REFERENCES public.research_tasks(id) ON DELETE SET NULL,
  entity_type VARCHAR(50) NOT NULL CHECK (entity_type IN ('university', 'program', 'scholarship')),
  existing_entity_id UUID, -- NULL if new institution, non-null if updating existing
  proposed_data JSONB NOT NULL,
  verification_status VARCHAR(50) NOT NULL DEFAULT 'UNVERIFIED' CHECK (verification_status IN ('DISCOVERED', 'UNVERIFIED', 'PARTIALLY_VERIFIED', 'VERIFIED', 'OUTDATED', 'CONFLICTED', 'REJECTED', 'DEMO_ONLY')),
  review_status VARCHAR(50) NOT NULL DEFAULT 'pending_review' CHECK (review_status IN ('pending_review', 'approved', 'rejected', 'draft', 'deferred')),
  rejection_reason TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  reviewed_at TIMESTAMPTZ,
  reviewed_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- 5. Claim-Level Evidences Table
CREATE TABLE IF NOT EXISTS public.claim_evidences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  proposed_record_id UUID REFERENCES public.proposed_records(id) ON DELETE CASCADE,
  entity_type VARCHAR(50) NOT NULL,
  entity_id UUID,
  field_name VARCHAR(100) NOT NULL, -- e.g. 'application_deadline', 'tuition_fee', 'eligibility_criteria'
  claim_value TEXT NOT NULL,
  source_url TEXT NOT NULL,
  source_title VARCHAR(255) NOT NULL,
  source_type VARCHAR(50) NOT NULL DEFAULT 'official_website' CHECK (source_type IN ('official_website', 'government_portal', 'admissions_portal', 'third_party')),
  evidence_excerpt TEXT NOT NULL,
  academic_cycle VARCHAR(50) DEFAULT '2025/2026',
  verification_status VARCHAR(50) DEFAULT 'VERIFIED',
  verified_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 6. Administrative Audit Logs Table
CREATE TABLE IF NOT EXISTS public.admin_audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action_type VARCHAR(100) NOT NULL, -- e.g. 'APPROVE_RECORD', 'REJECT_RECORD', 'EDIT_RECORD', 'CREATE_RESEARCH_TASK'
  target_entity_type VARCHAR(50) NOT NULL,
  target_entity_id UUID,
  changes_diff JSONB DEFAULT '{}'::jsonb,
  timestamp TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on all administrative tables
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.research_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.research_task_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.proposed_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.claim_evidences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_audit_logs ENABLE ROW LEVEL SECURITY;

-- Security Policies: Restrict access strictly to admin users and service_role
-- 1. Helper function checking if caller is admin
CREATE OR REPLACE FUNCTION public.is_admin_user()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE user_id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Admin Tasks RLS
CREATE POLICY "Admins can manage research_tasks" ON public.research_tasks
  FOR ALL USING (public.is_admin_user());

-- Admin Logs RLS
CREATE POLICY "Admins can view research_task_logs" ON public.research_task_logs
  FOR ALL USING (public.is_admin_user());

-- Proposed Records RLS (Never readable by anonymous or standard public users)
CREATE POLICY "Admins can manage proposed_records" ON public.proposed_records
  FOR ALL USING (public.is_admin_user());

-- Claim Evidences RLS
CREATE POLICY "Public can view verified evidences on published entities" ON public.claim_evidences
  FOR SELECT USING (
    verification_status = 'VERIFIED' AND proposed_record_id IS NULL
  );

CREATE POLICY "Admins can manage all claim_evidences" ON public.claim_evidences
  FOR ALL USING (public.is_admin_user());

-- Audit Logs RLS
CREATE POLICY "Admins can view admin_audit_logs" ON public.admin_audit_logs
  FOR ALL USING (public.is_admin_user());
