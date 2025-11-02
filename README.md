````markdown
```markdown
# Integración Supabase — tienda-vinos

Esta rama añade integración básica con Supabase para usar la tabla `public.productos` como backend del catálogo y Supabase Storage (bucket `public`) para las imágenes.

Pasos rápidos de configuración
1. Crear la tabla y políticas
   - Ejecuta los scripts SQL en `01_create_table.sql` y `02_policies.sql` desde SQL editor en Supabase.

2. Crear bucket
   - Ya creaste el bucket `public` (Storage -> Buckets -> public, público).

3. Añadir keys (RECOMENDADO: usar GitHub Secrets)
   - En GitHub: Settings → Secrets → Actions
     - SUPABASE_URL = https://<tu-proyecto>.supabase.co
     - SUPABASE_ANON_KEY = <anon key>
   - En local, puedes poner las variables globales antes de probar:
     - window.SUPABASE_URL = 'https://...';
     - window.SUPABASE_ANON_KEY = '...';

4. Uso en el frontend
   - `supabase-client.js` lee los placeholders. Reemplaza los placeholders con variables de entorno en tu build o configura los valores en runtime como se indica arriba.
   - `supabase-admin.js` contiene funciones para listar/crear/editar/borrar productos.
   - `upload-to-supabase.js` sube imágenes al bucket `public` y devuelve la URL pública.

5. Autenticación / seguridad
   - Si deseas controlar quién puede escribir, habilita RLS y añade tu user auth UUID a la tabla `public.admins`.
   - Para pruebas, la anon key permite operaciones desde frontend; en producción aplica políticas RLS o usa un backend.

6. Qué queda por hacer en la UI
   - Integrar las llamadas JS en el panel admin (index.html). Esto incluye:
     - Replace localStorage-based CRUD with calls a `fetchProducts()`, `createProduct()`, `updateProduct()`, `deleteProduct()`.
     - Al subir imagen, usar `uploadToSupabaseStorage(file)` y guardar la URL resultante.
     - Hacer login de admin (opcional) o mantener protección con ?admin + RLS.

7. Recomendaciones de seguridad
   - No exponer service_role key.
   - Rotar la anon key si se publicó (yo recomiendo rotarla tras pruebas).
```
````