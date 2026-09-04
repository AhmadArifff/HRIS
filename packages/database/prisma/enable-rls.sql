-- ==============================================================================
-- HRIS Database Security Hardening: Row Level Security (RLS) Protocol
-- Solves Supabase Linter Rule: 0013_rls_disabled_in_public
-- ==============================================================================

-- 1. Enable Row Level Security (RLS) on all 21 public tables
ALTER TABLE public.master_statuses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payroll_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employee_contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendances ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.face_biometric_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leave_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leave_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payrolls ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payroll_components ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shift_masters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.offboardings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reimbursements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_postings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applicants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.performance_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.positions ENABLE ROW LEVEL SECURITY;

-- 2. Service Role Full Access Policies (For Backend API & Prisma Direct Connection)
-- Ensures service_role and backend processes have uninterrupted CRUD access

DROP POLICY IF EXISTS "service_role_all_master_statuses" ON public.master_statuses;
CREATE POLICY "service_role_all_master_statuses" ON public.master_statuses FOR ALL TO service_role USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "service_role_all_payroll_details" ON public.payroll_details;
CREATE POLICY "service_role_all_payroll_details" ON public.payroll_details FOR ALL TO service_role USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "service_role_all_employee_contracts" ON public.employee_contracts;
CREATE POLICY "service_role_all_employee_contracts" ON public.employee_contracts FOR ALL TO service_role USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "service_role_all_attendances" ON public.attendances;
CREATE POLICY "service_role_all_attendances" ON public.attendances FOR ALL TO service_role USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "service_role_all_face_biometric_profiles" ON public.face_biometric_profiles;
CREATE POLICY "service_role_all_face_biometric_profiles" ON public.face_biometric_profiles FOR ALL TO service_role USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "service_role_all_leave_requests" ON public.leave_requests;
CREATE POLICY "service_role_all_leave_requests" ON public.leave_requests FOR ALL TO service_role USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "service_role_all_leave_types" ON public.leave_types;
CREATE POLICY "service_role_all_leave_types" ON public.leave_types FOR ALL TO service_role USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "service_role_all_payrolls" ON public.payrolls;
CREATE POLICY "service_role_all_payrolls" ON public.payrolls FOR ALL TO service_role USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "service_role_all_payroll_components" ON public.payroll_components;
CREATE POLICY "service_role_all_payroll_components" ON public.payroll_components FOR ALL TO service_role USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "service_role_all_employees" ON public.employees;
CREATE POLICY "service_role_all_employees" ON public.employees FOR ALL TO service_role USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "service_role_all_shift_masters" ON public.shift_masters;
CREATE POLICY "service_role_all_shift_masters" ON public.shift_masters FOR ALL TO service_role USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "service_role_all_offboardings" ON public.offboardings;
CREATE POLICY "service_role_all_offboardings" ON public.offboardings FOR ALL TO service_role USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "service_role_all_reimbursements" ON public.reimbursements;
CREATE POLICY "service_role_all_reimbursements" ON public.reimbursements FOR ALL TO service_role USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "service_role_all_job_postings" ON public.job_postings;
CREATE POLICY "service_role_all_job_postings" ON public.job_postings FOR ALL TO service_role USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "service_role_all_applications" ON public.applications;
CREATE POLICY "service_role_all_applications" ON public.applications FOR ALL TO service_role USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "service_role_all_applicants" ON public.applicants;
CREATE POLICY "service_role_all_applicants" ON public.applicants FOR ALL TO service_role USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "service_role_all_performance_reviews" ON public.performance_reviews;
CREATE POLICY "service_role_all_performance_reviews" ON public.performance_reviews FOR ALL TO service_role USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "service_role_all_roles" ON public.roles;
CREATE POLICY "service_role_all_roles" ON public.roles FOR ALL TO service_role USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "service_role_all_users" ON public.users;
CREATE POLICY "service_role_all_users" ON public.users FOR ALL TO service_role USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "service_role_all_departments" ON public.departments;
CREATE POLICY "service_role_all_departments" ON public.departments FOR ALL TO service_role USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "service_role_all_positions" ON public.positions;
CREATE POLICY "service_role_all_positions" ON public.positions FOR ALL TO service_role USING (true) WITH CHECK (true);

-- 3. Public / Anon Access Policies for Recruitment Careers Page
DROP POLICY IF EXISTS "anon_select_job_postings" ON public.job_postings;
CREATE POLICY "anon_select_job_postings" ON public.job_postings 
    FOR SELECT TO anon, authenticated 
    USING (deleted_at IS NULL);

DROP POLICY IF EXISTS "anon_insert_applicants" ON public.applicants;
CREATE POLICY "anon_insert_applicants" ON public.applicants 
    FOR INSERT TO anon, authenticated 
    WITH CHECK (true);

DROP POLICY IF EXISTS "anon_insert_applications" ON public.applications;
CREATE POLICY "anon_insert_applications" ON public.applications 
    FOR INSERT TO anon, authenticated 
    WITH CHECK (true);

-- 4. Authenticated Read Access for Master Data Reference Lookups
DROP POLICY IF EXISTS "auth_select_master_statuses" ON public.master_statuses;
CREATE POLICY "auth_select_master_statuses" ON public.master_statuses 
    FOR SELECT TO authenticated 
    USING (deleted_at IS NULL);

DROP POLICY IF EXISTS "auth_select_departments" ON public.departments;
CREATE POLICY "auth_select_departments" ON public.departments 
    FOR SELECT TO authenticated 
    USING (deleted_at IS NULL);

DROP POLICY IF EXISTS "auth_select_positions" ON public.positions;
CREATE POLICY "auth_select_positions" ON public.positions 
    FOR SELECT TO authenticated 
    USING (deleted_at IS NULL);

DROP POLICY IF EXISTS "auth_select_leave_types" ON public.leave_types;
CREATE POLICY "auth_select_leave_types" ON public.leave_types 
    FOR SELECT TO authenticated 
    USING (deleted_at IS NULL);

DROP POLICY IF EXISTS "auth_select_shift_masters" ON public.shift_masters;
CREATE POLICY "auth_select_shift_masters" ON public.shift_masters 
    FOR SELECT TO authenticated 
    USING (deleted_at IS NULL);
