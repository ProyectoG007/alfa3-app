# ALPHA3 - Sistema de Gestión de Proyectos

![ALPHA3 v1.0](https://img.shields.io/badge/version-1.0-blue)
![React](https://img.shields.io/badge/React-19.2.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![Supabase](https://img.shields.io/badge/Database-Supabase-green)

## 📋 ¿Qué hace este proyecto?

**ALPHA3** es una aplicación web de gestión de proyectos que permite organizar, monitorear y controlar el avance de proyectos mediante una estructura jerárquica de **Proyectos → Categorías → Tareas**.

La aplicación proporciona:
- ✅ **Gestión de proyectos** con seguimiento de progreso en tiempo real
- 📊 **Dashboard interactivo** con estadísticas y métricas globales
- 📈 **Visualización de datos** mediante gráficos radar y de barras
- ⚡ **Sincronización en tiempo real** entre múltiples usuarios usando WebSocket
- 🎯 **Seguimiento de tareas** con sistema de check/uncheck
- 📱 **Interfaz responsive** que funciona en desktop y móviles

## 🎯 Características Principales

### 1. **Dashboard de Control**
Vista general con:
- Contador de sub-items totales
- Items completados
- Avance global en porcentaje
- Acceso rápido a todos los proyectos

### 2. **Gestión de Proyectos**
- Crear nuevos proyectos con un clic
- Organizar proyectos en categorías
- Asignar tareas específicas a cada categoría
- Visualización del progreso por proyecto

### 3. **Sistema de Tareas**
- Marcar/desmarcar tareas como completadas
- Descripción paso a paso para cada tarea
- Modal de detalles con guía de implementación
- Actualización automática del progreso

### 4. **Análisis Visual**
- **Gráfico Radar**: Equilibrio entre módulos del proyecto
- **Gráfico de Barras**: Progreso por área en porcentaje
- Visualización clara del estado de cada proyecto

### 5. **Sincronización en Tiempo Real**
- Todos los usuarios ven cambios instantáneamente
- Sin necesidad de recargar la página
- Notificaciones automáticas de actualizaciones

## 🏗️ Arquitectura del Proyecto

```
alfa3-app/
├── client/                 # Frontend React + Vite
│   ├── src/
│   │   ├── App.jsx        # Componente principal con rutas
│   │   ├── index.css      # Estilos globales
│   │   └── main.jsx       # Punto de entrada
│   └── package.json
│
├── server/                 # Backend Node.js + Express
│   ├── server.js          # API REST y WebSocket
│   ├── database.js        # Configuración Supabase
│   └── package.json
│
├── CREAR_PROYECTO.md      # Guía técnica de creación de proyectos
├── GUIA_VISUAL.md         # Guía visual paso a paso
├── render.yaml            # Configuración para deploy en Render
└── start-app.ps1          # Script para iniciar la app (Windows)
```

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 19.2.0**: Biblioteca para interfaces de usuario
- **Vite 7.2.4**: Build tool y dev server ultrarrápido
- **React Router DOM**: Navegación entre vistas
- **Recharts**: Librería para gráficos interactivos
- **Lucide React**: Iconos modernos
- **Socket.io Client**: Comunicación en tiempo real

### Backend
- **Node.js**: Entorno de ejecución JavaScript
- **Express 5.2.1**: Framework web minimalista
- **Socket.io**: WebSocket para tiempo real
- **Supabase**: Base de datos PostgreSQL en la nube
- **CORS**: Manejo de políticas de origen cruzado
- **dotenv**: Gestión de variables de entorno

### Base de Datos (Supabase)
Estructura de tres tablas:
- `projects`: Proyectos principales
- `categories`: Categorías dentro de cada proyecto
- `tasks`: Tareas específicas por categoría

## 🚀 Instalación y Configuración

### Requisitos Previos
- Node.js 18+ instalado
- Cuenta en [Supabase](https://supabase.com/) (gratuita)
- Git instalado

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

Crear archivo `.env` en la carpeta `server/`:
```env
SUPABASE_URL=tu_url_de_supabase
SUPABASE_KEY=tu_clave_de_supabase
PORT=3001
```

### 3. Configurar el Frontend

```bash
cd ../client
npm install
```

Crear archivo `.env` en la carpeta `client/` (opcional):
```env
VITE_API_URL=http://localhost:3001
```

### 4. Configurar la Base de Datos

En tu proyecto de Supabase, ejecuta:

```sql
-- Tabla de proyectos
CREATE TABLE projects (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de categorías
CREATE TABLE categories (
  id BIGSERIAL PRIMARY KEY,
  project_id BIGINT REFERENCES projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de tareas
CREATE TABLE tasks (
  id BIGSERIAL PRIMARY KEY,
  category_id BIGINT REFERENCES categories(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 🎮 Uso de la Aplicación

### Opción 1: Iniciar manualmente

**Terminal 1 - Backend:**
```bash
cd server
npm start
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

### Opción 2: Script de Windows
```powershell
.\start-app.ps1
```

Accede a la aplicación en: **http://localhost:5173**

## 📖 Guías de Usuario

### Crear un Nuevo Proyecto
1. Haz clic en **"+ Nuevo Proyecto"** en el Dashboard
2. Ingresa el nombre del proyecto
3. Presiona **"Crear"** o Enter
4. El proyecto aparece inmediatamente en el menú lateral

Ver guía completa en: [CREAR_PROYECTO.md](CREAR_PROYECTO.md)

### Gestionar Tareas
1. Selecciona un proyecto del menú lateral
2. Haz clic en **"+ Categoría"** para agregar una categoría
3. Agrega tareas con **"+ Agregar Paso"**
4. Marca/desmarca tareas haciendo clic en el círculo
5. El progreso se actualiza automáticamente

Ver guía visual en: [GUIA_VISUAL.md](GUIA_VISUAL.md)

## 🌐 API Endpoints

### GET /api/data
Obtiene todos los proyectos con su jerarquía completa (categorías y tareas).

**Respuesta:**
```json
{
  "message": "success",
  "data": [
    {
      "id": 1,
      "name": "Estructura Legal",
      "progress": 50,
      "completed_count": 5,
      "total_count": 10,
      "categories": [...]
    }
  ]
}
```

### PUT /api/tasks/:id/toggle
Marca/desmarca una tarea como completada.

**Body:**
```json
{
  "completed": true
}
```

### POST /api/projects
Crea un nuevo proyecto.

**Body:**
```json
{
  "name": "Nombre del Proyecto"
}
```

## 🔌 WebSocket Events

### taskUpdated
Se emite cuando una tarea cambia de estado.
```javascript
socket.on('taskUpdated', (data) => {
  // { id: 123, completed: true }
});
```

### projectCreated
Se emite cuando se crea un nuevo proyecto.
```javascript
socket.on('projectCreated', (project) => {
  // { id: 4, name: "Nuevo Proyecto", ... }
});
```

## 🎨 Estructura de la Interfaz

### Componentes Principales

1. **Sidebar**: Navegación con lista de proyectos
2. **DashboardView**: Vista general con estadísticas
3. **ChartsView**: Gráficos de análisis
4. **ProjectView**: Vista detallada de proyecto con categorías y tareas

### Rutas

- `/` - Dashboard principal
- `/charts` - Análisis visual con gráficos
- `/project/:id` - Detalle de proyecto específico

## 🚢 Deploy en Producción

El proyecto incluye configuración para deploy en [Render](https://render.com/):

1. Conecta tu repositorio a Render
2. El archivo `render.yaml` configura automáticamente:
   - Servicio backend Node.js
   - Variables de entorno necesarias
   - Comandos de build y start

3. Configura las variables de entorno en Render:
   - `SUPABASE_URL`
   - `SUPABASE_KEY`

Para el frontend, puedes usar:
- Vercel
- Netlify
- Render Static Sites

## 🔒 Seguridad

- Las credenciales de Supabase se gestionan mediante variables de entorno
- CORS configurado para orígenes específicos
- Validación de datos en el backend
- No se exponen secretos en el código fuente

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto es de código abierto. Ver el archivo LICENSE para más detalles.

## 👥 Autores

- ProyectoG007 - *Desarrollo inicial*

## 🙏 Agradecimientos

- Comunidad de React por la excelente documentación
- Supabase por la plataforma de base de datos
- Todos los contribuidores del proyecto

---

**¿Necesitas ayuda?** Revisa las guías en [CREAR_PROYECTO.md](CREAR_PROYECTO.md) y [GUIA_VISUAL.md](GUIA_VISUAL.md)
