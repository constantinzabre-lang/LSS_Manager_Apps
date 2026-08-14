-- =========================================================================
-- SCRIPT SQL D'INITIALISATION — LIVING STONE SERVICE (LSS) MANAGEMENT SYSTEM
-- Base de données PostgreSQL pour Supabase Cloud
-- Conformité Fiscale : Code Général des Impôts (CGI) Burkina Faso - TVA 18%
-- =========================================================================

-- 1. Table Paramètres Système & Identité Entreprise
CREATE TABLE IF NOT EXISTS public.settings (
  id TEXT PRIMARY KEY DEFAULT 'default',
  company_name TEXT DEFAULT 'LIVING STONE SERVICE (LSS)',
  promoter_name TEXT DEFAULT 'ZABRE S. Constantin',
  location TEXT DEFAULT 'Ouagadougou, Burkina Faso',
  po_box TEXT DEFAULT '06 BV 30379 Ouaga Zogona 10020 OUAGADOUGOU BURKINA FASO',
  phone TEXT DEFAULT '+226 70 00 00 00 / +226 76 00 00 00',
  email TEXT DEFAULT 'contact@livingstoneservice.bf',
  ifu TEXT DEFAULT '00320159Z',
  ifu_date DATE DEFAULT '2026-07-20',
  rccm TEXT DEFAULT 'BF-OUA-01-2026-A10-13450',
  rccm_date DATE DEFAULT '2026-07-17',
  vat_rate NUMERIC DEFAULT 18.0,
  admin_pin TEXT DEFAULT '1234',
  supabase_url TEXT DEFAULT '',
  supabase_key TEXT DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Table CRM Clients
CREATE TABLE IF NOT EXISTS public.clients (
  id TEXT PRIMARY KEY, -- ex: CL-001
  name TEXT NOT NULL,
  type TEXT DEFAULT 'Particulier', -- Particulier / Entreprise
  phone TEXT,
  email TEXT,
  ifu TEXT,
  address TEXT,
  total_spent NUMERIC DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Table Catalogue Produits & Stock Matériel
CREATE TABLE IF NOT EXISTS public.inventory (
  id TEXT PRIMARY KEY, -- ex: LSS-PRD-001
  name TEXT NOT NULL,
  category TEXT DEFAULT 'Informatique',
  buy_price NUMERIC DEFAULT 0,
  sell_price_ht NUMERIC DEFAULT 0,
  sell_price_ttc NUMERIC DEFAULT 0,
  stock_qty INT DEFAULT 0,
  min_alert INT DEFAULT 2,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Table Tickets de Maintenance Informatique
CREATE TABLE IF NOT EXISTS public.tickets (
  id TEXT PRIMARY KEY, -- ex: TKT-2026-001
  client_id TEXT,
  client_name TEXT NOT NULL,
  client_phone TEXT,
  device_model TEXT NOT NULL,
  serial_number TEXT,
  accessories TEXT,
  problem_desc TEXT NOT NULL,
  diagnosis TEXT,
  status TEXT DEFAULT 'Reçu', -- Reçu, Diagnostic, En cours, Prêt, Livré
  cost_ht NUMERIC DEFAULT 0,
  vat_18 NUMERIC DEFAULT 0,
  cost_ttc NUMERIC DEFAULT 0,
  date_received DATE DEFAULT CURRENT_DATE,
  date_delivered DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Table Prestations & Projets IT
CREATE TABLE IF NOT EXISTS public.projects (
  id TEXT PRIMARY KEY, -- ex: PRJ-2026-01
  client_name TEXT NOT NULL,
  title TEXT NOT NULL,
  category TEXT DEFAULT 'Installation Réseau', -- Audit, Réseau, Contrat Maintenance, Conseil
  budget_ttc NUMERIC DEFAULT 0,
  status TEXT DEFAULT 'En étude', -- En étude, En cours, Terminé, Suspendu
  start_date DATE DEFAULT CURRENT_DATE,
  deadline DATE,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Table Stagiaires & Formations (LSS Académie)
CREATE TABLE IF NOT EXISTS public.students (
  id TEXT PRIMARY KEY, -- ex: STG-2026-001
  full_name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  track TEXT DEFAULT 'Initiation Maintenance & Secrétariat Numérique',
  start_date DATE DEFAULT CURRENT_DATE,
  end_date DATE,
  mentor TEXT DEFAULT 'ZABRE S. Constantin',
  status TEXT DEFAULT 'En cours', -- En cours, Validé, Certifié
  cert_number TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Table Factures & Devis (Conforme DGI Burkina Faso)
CREATE TABLE IF NOT EXISTS public.invoices (
  id TEXT PRIMARY KEY, -- ex: FACT-2026-001 ou DEV-2026-001
  doc_type TEXT DEFAULT 'facture', -- devis, facture
  client_name TEXT NOT NULL,
  client_phone TEXT,
  client_ifu TEXT,
  items JSONB NOT NULL DEFAULT '[]'::jsonb,
  subtotal_ht NUMERIC DEFAULT 0,
  vat_amount NUMERIC DEFAULT 0,
  total_ttc NUMERIC DEFAULT 0,
  payment_status TEXT DEFAULT 'Non payé', -- Payé, Non payé, Acompte
  amount_paid NUMERIC DEFAULT 0,
  date_created DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Table Dépenses & Charges Atelier
CREATE TABLE IF NOT EXISTS public.expenses (
  id TEXT PRIMARY KEY, -- ex: DEP-2026-001
  category TEXT NOT NULL, -- Achats pièces IT, Loyer, SONABEL/ONEA, Internet, Transport, Salaires, Autres
  description TEXT NOT NULL,
  amount NUMERIC DEFAULT 0,
  expense_date DATE DEFAULT CURRENT_DATE,
  payment_method TEXT DEFAULT 'Espèces', -- Espèces, Mobile Money, Chèque, Virement
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Table Journal d'Activité / Audit Logs
CREATE TABLE IF NOT EXISTS public.logs (
  id SERIAL PRIMARY KEY,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  action TEXT NOT NULL,
  user_name TEXT DEFAULT 'ZABRE S. Constantin',
  details TEXT
);

-- =========================================================================
-- 10. Table de Synchronisation Cloud Multi-Appareils (JSON Sync)
CREATE TABLE IF NOT EXISTS public.app_sync (
  id TEXT PRIMARY KEY DEFAULT 'lss_main_db',
  data JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================================================================
-- CONFIGURATION SECURITE & SUPABASE REALTIME
-- =========================================================================
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.app_sync ENABLE ROW LEVEL SECURITY;

-- Politiques RLS permissives pour l'application cliente
CREATE POLICY "Accès complet settings" ON public.settings FOR ALL USING (true);
CREATE POLICY "Accès complet clients" ON public.clients FOR ALL USING (true);
CREATE POLICY "Accès complet inventory" ON public.inventory FOR ALL USING (true);
CREATE POLICY "Accès complet tickets" ON public.tickets FOR ALL USING (true);
CREATE POLICY "Accès complet projects" ON public.projects FOR ALL USING (true);
CREATE POLICY "Accès complet students" ON public.students FOR ALL USING (true);
CREATE POLICY "Accès complet invoices" ON public.invoices FOR ALL USING (true);
CREATE POLICY "Accès complet expenses" ON public.expenses FOR ALL USING (true);
CREATE POLICY "Accès complet logs" ON public.logs FOR ALL USING (true);
CREATE POLICY "Accès complet app_sync" ON public.app_sync FOR ALL USING (true) WITH CHECK (true);

-- Activation du Temps Réel Supabase (Publication)
DROP PUBLICATION IF EXISTS supabase_realtime;
CREATE PUBLICATION supabase_realtime FOR TABLE 
  public.settings, 
  public.clients, 
  public.inventory, 
  public.tickets, 
  public.projects, 
  public.students, 
  public.invoices, 
  public.expenses, 
  public.logs,
  public.app_sync;

