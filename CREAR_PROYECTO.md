# Cómo Crear un Nuevo Proyecto

## Descripción
Esta funcionalidad permite crear nuevos proyectos en la aplicación ALPHA3 desde el Dashboard.

## Instrucciones de Uso

### Para Usuarios de la Aplicación:

1. **Abrir el Dashboard**
   - Inicia la aplicación y ve a la página principal (Dashboard)
   - Verás el botón **"+ Nuevo Proyecto"** en la esquina superior derecha

2. **Crear un Proyecto**
   - Haz clic en el botón **"+ Nuevo Proyecto"**
   - Se abrirá un modal con un formulario
   - Ingresa el nombre del proyecto (ej: "Estructura Legal", "Operativa", etc.)
   - Haz clic en **"Crear"** o presiona Enter

3. **Ver el Proyecto Creado**
   - El nuevo proyecto aparecerá inmediatamente en el menú lateral
   - Aparecerá con 0% de progreso (ya que no tiene categorías ni tareas aún)
   - Haz clic en el proyecto para agregar categorías y tareas

### Para Desarrolladores:

#### Endpoint del Backend

```javascript
POST /api/projects
Content-Type: application/json

{
  "name": "Nombre del Proyecto"
}
```

**Respuesta exitosa:**
```json
{
  "message": "created",
  "project": {
    "id": 123,
    "name": "Nombre del Proyecto",
    "created_at": "2026-01-15T..."
  }
}
```

**Respuesta de error:**
```json
{
  "error": "Project name is required"
}
```

#### Sincronización en Tiempo Real

Cuando se crea un proyecto:
1. El servidor emite un evento Socket.io: `projectCreated`
2. Todos los clientes conectados reciben la actualización
3. La interfaz se actualiza automáticamente sin recargar la página

#### Estructura del Código

**Frontend (client/src/App.jsx):**
- Componente `DashboardView` contiene el botón y modal
- Función `handleCreateProject` maneja la creación
- Socket listener `projectCreated` sincroniza cambios

**Backend (server/server.js):**
- Endpoint `POST /api/projects` 
- Validación del nombre del proyecto
- Inserción en la base de datos Supabase
- Emisión de evento Socket.io

## Requisitos Previos

1. **Base de Datos**: Tabla `projects` en Supabase con al menos:
   - `id` (auto-increment)
   - `name` (texto)
   
2. **Variables de Entorno** (server/.env):
   ```
   SUPABASE_URL=tu_url_de_supabase
   SUPABASE_KEY=tu_key_de_supabase
   PORT=3001
   ```

3. **Dependencias Instaladas**:
   ```bash
   cd server && npm install
   cd ../client && npm install
   ```

## Inicio de la Aplicación

### Windows (PowerShell):
```powershell
.\start-app.ps1
```

### Linux/Mac:
```bash
# Terminal 1 - Backend
cd server
npm start

# Terminal 2 - Frontend
cd client
npm run dev
```

La aplicación estará disponible en:
- Frontend: http://localhost:5173
- Backend: http://localhost:3001

## Flujo Completo

```
Usuario                   Frontend                  Backend                  Database
   |                         |                         |                         |
   |--[Click "+ Nuevo]------>|                         |                         |
   |                         |                         |                         |
   |<---[Abre Modal]---------| |                         |                         |
   |                         |                         |                         |
   |--[Ingresa Nombre]------>|                         |                         |
   |                         |                         |                         |
   |--[Click "Crear"]------->|                         |                         |
   |                         |                         |                         |
   |                         |--[POST /api/projects]-->|                         |
   |                         |                         |                         |
   |                         |                         |--[INSERT project]------>|
   |                         |                         |                         |
   |                         |                         |<--[Proyecto creado]-----|
   |                         |                         |                         |
   |                         |<--[{project}]-----------|                         |
   |                         |                         |                         |
   |                         |--[Actualiza UI]         |--[emit 'projectCreated']|
   |                         |                         |                         |
   |<---[Muestra Proyecto]---|                         |                         |
   |                         |                         |                         |
   |                         |<--[Socket: projectCreated (otros clientes)]       |
   |                         |                         |                         |
```

## Características

✅ **Validación**: No permite crear proyectos sin nombre  
✅ **Tiempo Real**: Sincronización automática entre clientes  
✅ **Optimistic UI**: La interfaz se actualiza instantáneamente  
✅ **Accesibilidad**: Modal con atributos ARIA apropiados  
✅ **Responsive**: Funciona en dispositivos móviles y desktop  

## Próximos Pasos Recomendados

Después de crear un proyecto, puedes:
1. Agregar categorías al proyecto (usar el botón "+ Categoría")
2. Agregar tareas a cada categoría
3. Marcar tareas como completadas
4. Ver el progreso en tiempo real
