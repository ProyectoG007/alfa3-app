# Guía Visual: Crear Nuevo Proyecto

Esta guía muestra paso a paso cómo usar la nueva funcionalidad de creación de proyectos.

---

## Paso 1: Vista del Dashboard

Cuando abres la aplicación, verás el Dashboard principal con el botón **"+ Nuevo Proyecto"** en la esquina superior derecha:

```
┌────────────────────────────────────────────────────────────────┐
│  ALPHA3 v1.0                                                   │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  Dashboard        Control ALPHA3          [+ Nuevo Proyecto]  │
│  Gráficos                                                      │
│                   ┌─────────────┐  ┌─────────────┐            │
│  ─────────        │ Sub-items   │  │ Completados │            │
│                   │  Totales    │  │             │            │
│  Proyecto 1  50%  │     25      │  │     12      │            │
│  Proyecto 2  30%  └─────────────┘  └─────────────┘            │
│                                                                │
│                   ┌─────────────┐                             │
│                   │   Avance    │                             │
│                   │   Global    │                             │
│                   │     40%     │                             │
│                   └─────────────┘                             │
│                                                                │
│  Haz clic en el nombre de cualquier proyecto en el menú       │
│  para ver y editar los procedimientos.                        │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**→ Haz clic en el botón "+ Nuevo Proyecto"**

---

## Paso 2: Modal de Creación

Se abrirá un modal con un formulario:

```
┌────────────────────────────────────────────────────────────────┐
│  ALPHA3 v1.0                                                   │
├────────────────────────────────────────────────────────────────┤
│                    ┌───────────────────────────────┐           │
│  Dashboard         │ Crear Nuevo Proyecto          │           │
│  Gráficos          │                               │           │
│                    │ Nombre del Proyecto:          │           │
│  ─────────         │ ┌───────────────────────────┐ │           │
│                    │ │ Ej: Estructura Legal      │ │           │
│  Proyecto 1  50%   │ └───────────────────────────┘ │           │
│  Proyecto 2  30%   │                               │           │
│                    │        [Cancelar]  [Crear]    │           │
│                    └───────────────────────────────┘           │
│                                                                │
│  Haz clic en el nombre de cualquier proyecto en el menú       │
│  para ver y editar los procedimientos.                        │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**Instrucciones:**
1. Escribe el nombre de tu proyecto en el campo de texto
2. Puedes usar nombres como:
   - "Estructura Legal"
   - "Operativa Comercial"
   - "Marketing Digital"
   - "Desarrollo de Producto"
   - Cualquier nombre que desees

**→ Escribe el nombre y haz clic en "Crear" (o presiona Enter)**

---

## Paso 3: Proyecto Creado

El modal se cierra y el nuevo proyecto aparece inmediatamente en el menú lateral:

```
┌────────────────────────────────────────────────────────────────┐
│  ALPHA3 v1.0                                                   │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  Dashboard        Control ALPHA3          [+ Nuevo Proyecto]  │
│  Gráficos                                                      │
│                   ┌─────────────┐  ┌─────────────┐            │
│  ─────────        │ Sub-items   │  │ Completados │            │
│                   │  Totales    │  │             │            │
│  Proyecto 1  50%  │     25      │  │     12      │            │
│  Proyecto 2  30%  └─────────────┘  └─────────────┘            │
│  Proyecto 3   0%  ← NUEVO!                                    │
│                   ┌─────────────┐                             │
│                   │   Avance    │                             │
│                   │   Global    │                             │
│                   │     27%     │                             │
│                   └─────────────┘                             │
│                                                                │
│  Haz clic en el nombre de cualquier proyecto en el menú       │
│  para ver y editar los procedimientos.                        │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**✅ ¡Proyecto creado exitosamente!**

El proyecto aparece con:
- **0% de progreso** (porque aún no tiene tareas)
- **Nombre visible** en el menú lateral
- **Listo para agregar** categorías y tareas

**→ Haz clic en el proyecto para comenzar a agregar categorías**

---

## Paso 4: Agregar Contenido al Proyecto

Al hacer clic en el proyecto nuevo, verás:

```
┌────────────────────────────────────────────────────────────────┐
│  ALPHA3 v1.0                                                   │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  Dashboard        3. Proyecto 3            0%  [+ Categoría]   │
│  Gráficos         (0 de 0)                                     │
│                   ▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░      │
│  ─────────                                                     │
│                   (No hay categorías aún)                      │
│  Proyecto 1  50%                                               │
│  Proyecto 2  30%  Usa el botón "+ Categoría" para comenzar    │
│  Proyecto 3   0%                                               │
│                                                                │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

Ahora puedes:
1. Agregar categorías con el botón **"+ Categoría"**
2. Dentro de cada categoría, agregar pasos/tareas
3. Marcar tareas como completadas
4. Ver el progreso actualizarse automáticamente

---

## Características Adicionales

### 🔄 Sincronización en Tiempo Real
Si varios usuarios están conectados:
- Cuando uno crea un proyecto, **todos lo ven instantáneamente**
- No necesitas recargar la página
- La sincronización es automática vía WebSocket

### ✅ Validación
- No puedes crear un proyecto sin nombre
- El botón "Crear" está deshabilitado si el campo está vacío
- Los espacios en blanco se eliminan automáticamente

### ⌨️ Atajos de Teclado
- **Enter** en el campo de texto → Crea el proyecto
- **Escape** → Cierra el modal sin crear

### 📱 Responsive
- Funciona en computadoras, tablets y móviles
- El modal se adapta al tamaño de pantalla

---

## Ejemplo Completo

**Escenario:** Quieres crear un proyecto para "Marketing Digital"

1. **Click** en "+ Nuevo Proyecto"
2. **Escribe** "Marketing Digital"
3. **Click** en "Crear" o presiona **Enter**
4. **Resultado:** Nuevo proyecto "Marketing Digital" aparece con 0%
5. **Click** en "Marketing Digital" en el menú
6. **Click** en "+ Categoría" para agregar secciones como:
   - "Redes Sociales"
   - "Email Marketing"
   - "SEO"
   - etc.

---

## Solución de Problemas

### El botón "+ Nuevo Proyecto" no aparece
- ✅ Verifica que estás en la vista Dashboard (página principal)
- ✅ El botón está en la esquina superior derecha del header

### El proyecto no se crea
- ✅ Asegúrate de que el campo no esté vacío
- ✅ Verifica la conexión con el servidor backend
- ✅ Revisa la consola del navegador (F12) para errores

### El proyecto no aparece en el menú
- ✅ Verifica que la base de datos Supabase esté configurada
- ✅ Revisa que las credenciales en `.env` sean correctas
- ✅ Espera 1-2 segundos para la sincronización

---

## Para Desarrolladores

### Probar la Funcionalidad

```bash
# 1. Configurar variables de entorno
cd server
cp .env.example .env
# Edita .env con tus credenciales de Supabase

# 2. Instalar dependencias
cd server && npm install
cd ../client && npm install

# 3. Iniciar la aplicación
# Terminal 1
cd server && npm start

# Terminal 2
cd client && npm run dev

# 4. Abrir en navegador
http://localhost:5173
```

### Probar el API directamente

```bash
# Crear proyecto vía curl
curl -X POST http://localhost:3001/api/projects \
  -H "Content-Type: application/json" \
  -d '{"name": "Mi Nuevo Proyecto"}'

# Respuesta esperada:
# {
#   "message": "created",
#   "project": {
#     "id": 4,
#     "name": "Mi Nuevo Proyecto"
#   }
# }
```

### Verificar en la Base de Datos

```sql
-- Ver todos los proyectos
SELECT * FROM projects ORDER BY id DESC;

-- Ver el último proyecto creado
SELECT * FROM projects ORDER BY id DESC LIMIT 1;
```

---

## Resumen

✨ **Ahora puedes crear proyectos fácilmente desde el Dashboard**

🎯 **Flujo simple:** Click → Escribe → Crear → Listo

🚀 **Próximo paso:** Agregar categorías y tareas a tu nuevo proyecto
