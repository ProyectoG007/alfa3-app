# ALPHA3 Dashboard

Sistema de gestión de proyectos y tareas con visualización en tiempo real para el control de avance de estructuras legales y operativas.

## 📋 Descripción

ALPHA3 es un dashboard interactivo que permite:
- Gestionar proyectos organizados en categorías y tareas
- Visualizar el progreso en tiempo real con gráficos
- Sincronización instantánea entre múltiples usuarios mediante WebSockets
- Interfaz moderna y responsive con tema oscuro

## 🛠️ Tecnologías

### Frontend
- **React 19** - Framework UI
- **Vite 7** - Build tool y dev server
- **React Router 7** - Enrutamiento
- **Socket.io Client** - Comunicación en tiempo real
- **Recharts** - Visualización de datos
- **Lucide React** - Iconos

### Backend
- **Node.js** - Runtime
- **Express 5** - Framework web
- **Socket.io** - WebSockets
- **Supabase** - Base de datos y autenticación
- **CORS** - Control de acceso

## 📦 Estructura del Proyecto

```
alfa3-app/
├── client/                 # Frontend React
│   ├── src/
│   │   ├── App.jsx        # Componente principal
│   │   ├── main.jsx       # Punto de entrada
│   │   ├── index.css      # Estilos globales
│   │   └── assets/        # Recursos estáticos
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── server/                # Backend Node.js
│   ├── server.js         # Servidor Express + Socket.io
│   ├── database.js       # Configuración Supabase
│   └── package.json
├── render.yaml           # Configuración despliegue Render
└── start-app.ps1         # Script inicio Windows
```

## 🚀 Instalación y Configuración

### Requisitos Previos
- Node.js 18+ 
- npm o yarn
- Cuenta de Supabase (para la base de datos)

### 1. Clonar el Repositorio
```bash
git clone https://github.com/ProyectoG007/alfa3-app.git
cd alfa3-app
```

### 2. Configurar el Backend

```bash
cd server
npm install
```

Crear archivo `.env` con las credenciales de Supabase:
```env
SUPABASE_URL=tu_url_de_supabase
SUPABASE_KEY=tu_clave_anon_de_supabase
PORT=3001
```

### 3. Configurar el Frontend

```bash
cd ../client
npm install
```

Crear archivo `.env` (opcional):
```env
VITE_API_URL=http://localhost:3001
```

### 4. Estructura de la Base de Datos (Supabase)

Crear las siguientes tablas en Supabase:

#### Tabla `projects`
```sql
CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### Tabla `categories`
```sql
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  project_id INTEGER REFERENCES projects(id),
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### Tabla `tasks`
```sql
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT FALSE,
  category_id INTEGER REFERENCES categories(id),
  created_at TIMESTAMP DEFAULT NOW()
);
```

## 🎮 Uso

### Desarrollo Local

**Opción 1: Iniciar servicios por separado**

Terminal 1 - Backend:
```bash
cd server
npm start
```

Terminal 2 - Frontend:
```bash
cd client
npm run dev
```

**Opción 2: Script de Windows**
```powershell
.\start-app.ps1
```

La aplicación estará disponible en:
- Frontend: http://localhost:5173
- Backend: http://localhost:3001

### Producción

```bash
# Backend
cd server
npm start

# Frontend (build)
cd client
npm run build
npm run preview
```

## 📡 API Endpoints

### GET `/api/data`
Obtiene todos los proyectos con sus categorías y tareas organizadas jerárquicamente.

**Respuesta:**
```json
{
  "message": "success",
  "data": [
    {
      "id": 1,
      "name": "Proyecto",
      "categories": [...],
      "completed_count": 5,
      "total_count": 10,
      "progress": 50
    }
  ]
}
```

### PUT `/api/tasks/:id/toggle`
Actualiza el estado de completado de una tarea.

**Body:**
```json
{
  "completed": true
}
```

**Respuesta:**
```json
{
  "message": "updated",
  "id": "123",
  "completed": true
}
```

## 🔧 Scripts Disponibles

### Frontend (client/)
```bash
npm run dev      # Inicia servidor de desarrollo
npm run build    # Genera build de producción
npm run preview  # Preview del build
npm run lint     # Ejecuta ESLint
```

### Backend (server/)
```bash
npm start        # Inicia el servidor
npm test         # Ejecuta tests (no configurado aún)
```

## 🎨 Características

- ✅ **Actualización en tiempo real** - Los cambios se sincronizan instantáneamente
- ✅ **Optimistic UI** - Respuesta inmediata antes de confirmación del servidor
- ✅ **Diseño responsive** - Funciona en desktop y móvil
- ✅ **Tema oscuro** - Interfaz moderna y cómoda para la vista
- ✅ **Gráficos interactivos** - Visualización de progreso con Recharts
- ✅ **Validación de entrada** - Validación robusta en backend
- ✅ **Manejo de errores** - Recovery automático en fallos de red

## 🔒 Seguridad

- CORS configurado con orígenes específicos
- Validación de entrada en todos los endpoints
- Variables de entorno para credenciales sensibles
- Dependencias actualizadas sin vulnerabilidades conocidas

## 🚢 Despliegue en Render

El proyecto incluye `render.yaml` para despliegue automático:

1. Conectar repositorio en Render
2. Configurar variables de entorno:
   - `SUPABASE_URL`
   - `SUPABASE_KEY`
3. Render desplegará automáticamente el backend

Para el frontend, se recomienda usar:
- Vercel
- Netlify
- Render Static Site

## 📝 Licencia

ISC

## 👥 Contribución

1. Fork el proyecto
2. Crea tu rama de feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📧 Contacto

Proyecto: [https://github.com/ProyectoG007/alfa3-app](https://github.com/ProyectoG007/alfa3-app)
