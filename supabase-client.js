// supabase-client.js
// Inicializa el cliente Supabase. NO pongas keys permanentes aquí en el repo.
// Reemplaza los valores con variables de entorno o con GitHub Secrets en production.

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = (window.SUPABASE_URL || '{{SUPABASE_URL_PLACEHOLDER}}'); // e.g. https://*.supabase.co
const SUPABASE_ANON_KEY = (window.SUPABASE_ANON_KEY || '{{SUPABASE_ANON_KEY_PLACEHOLDER}}');

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);