# API Documentation - ALPHA3 Backend

## Base URL
```
http://localhost:3001
```

## Endpoints

### 1. Get Dashboard Data

Recupera todos los proyectos con su jerarquía completa de categorías y tareas, incluyendo cálculos de progreso.

**Endpoint:** `GET /api/data`

**Autenticación:** No requerida

**Respuesta Exitosa:** `200 OK`

```json
{
  "message": "success",
  "data": [
    {
      "id": 1,
      "name": "Estructura Legal",
      "created_at": "2024-01-15T10:00:00.000Z",
      "categories": [
        {
          "id": 1,
          "name": "Documentación Legal",
          "project_id": 1,
          "created_at": "2024-01-15T10:00:00.000Z",
          "tasks": [
            {
              "id": 1,
              "title": "Revisar estatutos",
              "description": "1. Descargar documentos\n2. Revisar cada artículo\n3. Validar firma",
              "completed": false,
              "category_id": 1,
              "created_at": "2024-01-15T10:00:00.000Z"
            }
          ]
        }
      ],
      "completed_count": 5,
      "total_count": 20,
      "progress": 25
    }
  ]
}
```

**Errores:**
- `500 Internal Server Error` - Error al consultar la base de datos

```json
{
  "error": "Error message"
}
```

---

### 2. Toggle Task Completion

Actualiza el estado de completado de una tarea específica y notifica a todos los clientes conectados vía WebSocket.

**Endpoint:** `PUT /api/tasks/:id/toggle`

**Parámetros de URL:**
- `id` (number, required) - ID de la tarea a actualizar

**Body:**
```json
{
  "completed": true
}
```

**Validación:**
- `id` debe ser un número válido
- `completed` debe ser un booleano (true/false)

**Respuesta Exitosa:** `200 OK`

```json
{
  "message": "updated",
  "id": "1",
  "completed": true
}
```

**Errores:**

`400 Bad Request` - ID inválido
```json
{
  "error": "Invalid task ID"
}
```

`400 Bad Request` - Valor de completed inválido
```json
{
  "error": "completed must be a boolean value"
}
```

`400 Bad Request` - Error de base de datos
```json
{
  "error": "Database error message"
}
```

---

## WebSocket Events

El servidor utiliza Socket.io para comunicación en tiempo real.

### Conexión

**URL:** `ws://localhost:3001` o `http://localhost:3001` (fallback polling)

**Configuración del Cliente:**
```javascript
const socket = io('http://localhost:3001', {
  withCredentials: true,
  transports: ['websocket', 'polling']
});
```

### Eventos del Servidor

#### `taskUpdated`

Emitido cuando una tarea es actualizada (completada/descompletada).

**Payload:**
```json
{
  "id": "1",
  "completed": true
}
```

**Uso del Cliente:**
```javascript
socket.on('taskUpdated', (data) => {
  console.log(`Task ${data.id} updated to ${data.completed}`);
  // Refrescar datos o actualizar UI
});
```

#### `connect`

Emitido cuando el cliente se conecta exitosamente.

```javascript
socket.on('connect', () => {
  console.log('Connected to server');
});
```

#### `connect_error`

Emitido cuando hay un error de conexión.

```javascript
socket.on('connect_error', (error) => {
  console.error('Connection error:', error.message);
});
```

#### `disconnect`

Emitido cuando el cliente se desconecta.

```javascript
socket.on('disconnect', (reason) => {
  console.log('Disconnected:', reason);
});
```

---

## Modelos de Datos

### Project
```typescript
{
  id: number;
  name: string;
  created_at: string (ISO 8601);
  categories: Category[];
  completed_count: number;  // Calculado
  total_count: number;      // Calculado
  progress: number;         // Calculado (0-100)
}
```

### Category
```typescript
{
  id: number;
  name: string;
  project_id: number;
  created_at: string (ISO 8601);
  tasks: Task[];
}
```

### Task
```typescript
{
  id: number;
  title: string;
  description: string;
  completed: boolean;
  category_id: number;
  created_at: string (ISO 8601);
}
```

---

## Códigos de Estado HTTP

| Código | Descripción |
|--------|-------------|
| 200 | Solicitud exitosa |
| 400 | Error de validación o solicitud incorrecta |
| 500 | Error interno del servidor |

---

## CORS

El servidor está configurado para aceptar solicitudes de:
- `http://localhost:5173` (desarrollo)
- `http://127.0.0.1:5173` (desarrollo)

**Métodos permitidos:** GET, POST, PUT

**Credenciales:** Habilitadas

---

## Variables de Entorno

```env
# Supabase
SUPABASE_URL=tu_url_de_supabase
SUPABASE_KEY=tu_clave_anon_de_supabase

# Server
PORT=3001
```

---

## Ejemplos de Uso

### Fetch con JavaScript Vanilla

```javascript
// GET Dashboard Data
fetch('http://localhost:3001/api/data')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));

// Toggle Task
fetch('http://localhost:3001/api/tasks/1/toggle', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ completed: true })
})
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

### Axios

```javascript
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3001/api'
});

// GET Dashboard Data
const data = await API.get('/data');

// Toggle Task
await API.put('/tasks/1/toggle', { completed: true });
```

### curl

```bash
# GET Dashboard Data
curl http://localhost:3001/api/data

# Toggle Task
curl -X PUT http://localhost:3001/api/tasks/1/toggle \
  -H "Content-Type: application/json" \
  -d '{"completed":true}'
```

---

## Notas de Desarrollo

1. **Actualización Optimista**: El cliente actualiza la UI inmediatamente antes de recibir confirmación del servidor para mejor UX.

2. **Sincronización**: Cuando se actualiza una tarea, todos los clientes conectados reciben el evento `taskUpdated` y refrescan sus datos.

3. **Cálculo de Progreso**: El progreso de cada proyecto se calcula como:
   ```
   progress = (completed_count / total_count) * 100
   ```
   Redondeado al entero más cercano.

4. **Manejo de Errores**: Todos los endpoints capturan errores y devuelven respuestas JSON consistentes.
