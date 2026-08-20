-- Enable storage schema if not exist (Usually Supabase has this by default, but just in case)
CREATE SCHEMA IF NOT EXISTS storage;

-- Create avatars bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('avatars', 'avatars', true) 
ON CONFLICT (id) DO NOTHING;

-- Create kanban-documents bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('kanban-documents', 'kanban-documents', false) 
ON CONFLICT (id) DO NOTHING;

-- Create leave-attachments bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('leave-attachments', 'leave-attachments', false) 
ON CONFLICT (id) DO NOTHING;

-- Create reimbursement-claims bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('reimbursement-claims', 'reimbursement-claims', false) 
ON CONFLICT (id) DO NOTHING;

-- Create applicant-resumes bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('applicant-resumes', 'applicant-resumes', false) 
ON CONFLICT (id) DO NOTHING;
