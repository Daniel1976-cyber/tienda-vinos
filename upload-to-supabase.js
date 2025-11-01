// upload-to-supabase.js
// Sube una imagen al bucket 'public' y devuelve la URL pública
import { supabase } from './supabase-client.js';

export async function uploadToSupabaseStorage(file, bucket = 'public') {
  if (!file) throw new Error('No file provided');
  const ext = file.name.split('.').pop();
  const fileName = `productos/${Date.now()}.${ext}`;
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(fileName, file, { cacheControl: '3600', upsert: false });

  if (error) throw error;
  const { publicURL, error: urlError } = supabase.storage
    .from(bucket)
    .getPublicUrl(data.path);

  if (urlError) throw urlError;
  return publicURL;
}