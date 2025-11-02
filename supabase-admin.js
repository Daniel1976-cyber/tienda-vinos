// supabase-admin.js
// Funciones CRUD para la tabla public.productos y utilidades admin.

import { supabase } from './supabase-client.js';

// Obtener productos ordenados por 'orden'
export async function fetchProducts() {
  const { data, error } = await supabase
    .from('productos')
    .select('*')
    .order('orden', { ascending: true });
  if (error) throw error;
  return data || [];
}

export async function createProduct(product) {
  // product: { nombre, precio, categoria, disponible, img, orden }
  const { data, error } = await supabase
    .from('productos')
    .insert([product])
    .select();
  if (error) throw error;
  return data?.[0] ?? null;
}

export async function updateProduct(id, updates) {
  const { data, error } = await supabase
    .from('productos')
    .update(updates)
    .eq('id', id)
    .select();
  if (error) throw error;
  return data?.[0] ?? null;
}

export async function deleteProduct(id) {
  const { error } = await supabase
    .from('productos')
    .delete()
    .eq('id', id);
  if (error) throw error;
  return true;
}

// Para reordenar pasar array de ids en el nuevo orden
export async function reorderProducts(idsInNewOrder = []) {
  // actualizamos campo 'orden' por lotes
  const updates = idsInNewOrder.map((id, idx) => ({ id, orden: idx + 1 }));
  const { error } = await supabase.from('productos').upsert(updates);
  if (error) throw error;
  return true;
}