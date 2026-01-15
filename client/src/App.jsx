import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import io from 'socket.io-client';
import { LayoutDashboard, PieChart, Activity, Layers, CheckCircle, Circle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import './index.css';

// --- Socket & API ---
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const socket = io(API_URL, {
  withCredentials: true,
  transports: ['websocket', 'polling']
});

// Handle socket connection errors
socket.on('connect_error', (error) => {
  console.error('Socket connection error:', error.message);
});

socket.on('connect', () => {
  console.log('Socket connected successfully');
});

// --- Components ---

// 1. Sidebar Component
const Sidebar = ({ projects }) => {
  return (
    <aside className="sidebar">
      <div className="logo-area">
        <h2>ALPHA3 <span className="badge" style={{ background: '#333', color: '#ccc' }}>v1.0</span></h2>
      </div>

      <nav>
        <NavLink to="/" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/charts" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          <PieChart size={20} />
          <span>Gráficos</span>
        </NavLink>

        <div className="separator" />

        {projects.map(p => (
          <NavLink key={p.id} to={`/project/${p.id}`} className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <Layers size={20} />
            <div className="nav-text">
              <span>{p.name.replace("Estructura Legal ", "").replace("Operativa ", "")}</span>
              <span className="nav-percent">{p.progress || 0}%</span>
            </div>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

// 2. Dashboard View
const DashboardView = ({ projects }) => {
  const totalSubItems = projects.reduce((acc, p) => acc + p.total_count, 0);
  const completedItems = projects.reduce((acc, p) => acc + p.completed_count, 0);
  const globalProgress = totalSubItems === 0 ? 0 : Math.round((completedItems / totalSubItems) * 100);

  return (
    <div className="view-content animate-fade-in">
      <header className="view-header">
        <h1>Control ALPHA3</h1>
      </header>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Sub-items Totales</h3>
          <div className="number purple">{totalSubItems}</div>
        </div>
        <div className="stat-card">
          <h3>Completados</h3>
          <div className="number">{completedItems}</div>
        </div>
        <div className="stat-card">
          <h3>Avance Global</h3>
          <div className="number purple">{globalProgress}%</div>
        </div>
      </div>

      <p className="hint-text">
        Haz clic en el nombre de cualquier proyecto en el menú para ver y editar los procedimientos.
      </p>
    </div>
  );
};

// 3. Analytics View
const ChartsView = ({ projects }) => {
  // Transform data for charts
  const radarData = projects.map(p => ({
    subject: p.name.replace("Estructura Legal ", "").replace("Operativa ", ""),
    A: p.progress,
    fullMark: 100
  }));
  // Add dummy third point for triangle shape if only 2 projects
  if (radarData.length < 3) radarData.push({ subject: 'Token', A: 0, fullMark: 100 });

  return (
    <div className="view-content animate-fade-in">
      <header className="view-header">
        <h1>Análisis de Avance</h1>
      </header>

      <div className="charts-grid">
        <div className="chart-card">
          <h3>Equilibrio por Módulo</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#333" />
                <PolarAngleAxis dataKey="subject" stroke="#888" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#333" />
                <Radar name="Avance" dataKey="A" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} />
                <Tooltip contentStyle={{ backgroundColor: '#1e1e1e', border: 'none' }} itemStyle={{ color: '#fff' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="chart-card">
          <h3>Progreso por Área (%)</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={radarData}>
                <XAxis dataKey="subject" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip cursor={{ fill: '#333' }} contentStyle={{ backgroundColor: '#1e1e1e', border: 'none' }} />
                <Bar dataKey="A" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

// 4. Project Detail View
const ProjectView = ({ projects, onToggle }) => {
  const location = useLocation();
  const projectId = parseInt(location.pathname.split("/").pop());
  const project = projects.find(p => p.id === projectId);

  const [selectedTask, setSelectedTask] = useState(null);

  if (!project) return <div>Cargando proyecto...</div>;

  return (
    <div className="view-content animate-fade-in">
      <header className="view-header">
        <div className="header-row">
          <h1>
            {project.id}. {project.name}
            <span className="project-percent-tag">
              {Number(project.progress || 0)} %
              <small style={{ marginLeft: '8px', opacity: 0.6, fontSize: '0.8em' }}>
                ({project.completed_count} de {project.total_count})
              </small>
            </span>
          </h1>
          <button className="btn-primary">+ Categoría</button>
        </div>
        {/* Visual Progress Bar */}
        <div className="project-progress-bar-container">
          <div
            className="project-progress-fill"
            style={{ width: `${Number(project.progress || 0)}%` }}
          />
        </div>
      </header>

      <div className="categories-list">
        {project.categories.map(cat => (
          <div key={cat.id} className="category-card">
            <div className="category-header">
              <h3>{cat.name}</h3>
              <button className="btn-icon">🗑️</button>
            </div>
            <div className="tasks-list">
              {cat.tasks.map(task => (
                <div key={task.id} className="task-row">
                  <div className="task-main" onClick={() => onToggle(task.id, !task.completed)}>
                    {task.completed
                      ? <CheckCircle className="check-icon completed" size={20} />
                      : <Circle className="check-icon" size={20} />
                    }
                    <span className={task.completed ? "task-title completed" : "task-title"}>
                      {task.title}
                    </span>
                  </div>
                  <span
                    className="edit-step"
                    onClick={() => setSelectedTask(task)}
                  >
                    Ver pasos
                  </span>
                </div>
              ))}
              <button className="btn-text">+ Agregar Paso</button>
            </div>
          </div>
        ))}
      </div>

      {/* Step-by-step Modal */}
      {selectedTask && (
        <div className="modal-overlay" onClick={() => setSelectedTask(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2>{selectedTask.title}</h2>
            <h3>Guía paso a paso:</h3>
            <div className="step-content">
              {selectedTask.description.split('\n').map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
            <button className="btn-close" onClick={() => setSelectedTask(null)}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};


// --- Main App Logic ---
function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    fetch(`${API_URL}/api/data`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(res => {
        if (res.data) {
          setData(res.data);
          setLoading(false);
        }
      })
      .catch(err => {
        console.error('Error fetching data:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();

    socket.on('taskUpdated', () => {
      // Simple strategy: Re-fetch full tree on any update to keep consistency
      fetchData();
    });

    return () => {
      socket.off('taskUpdated');
    };
  }, []);

  const handleToggle = (taskId, newState) => {
    // 1. Optimistic Update (Instant feedback)
    setData(prevData => {
      return prevData.map(proj => {
        // Find if the task belongs to this project
        const taskExists = proj.categories.some(cat => cat.tasks.some(t => t.id === taskId));

        if (!taskExists) return proj;

        // Clone and Update
        const updatedCategories = proj.categories.map(cat => ({
          ...cat,
          tasks: cat.tasks.map(t => (t.id === taskId ? { ...t, completed: newState } : t))
        }));

        // Calculate new counts
        const allTasks = updatedCategories.flatMap(c => c.tasks);
        const completedCount = allTasks.filter(t => t.completed === true || t.completed === 1 || t.completed === "1").length;
        const totalCount = allTasks.length;
        const newProgress = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

        return {
          ...proj,
          categories: updatedCategories,
          completed_count: completedCount,
          total_count: totalCount,
          progress: newProgress
        };
      });
    });

    // 2. Network Request
    fetch(`${API_URL}/api/tasks/${taskId}/toggle`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: newState })
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .catch(err => {
        console.error("Update failed:", err);
        // Revert optimistic update on failure
        fetchData();
      });
  };

  if (loading) return <div className="loading-screen">Cargando Dashboard ALPHA3...</div>;

  return (
    <BrowserRouter>
      <div className="app-layout">
        <Sidebar projects={data} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<DashboardView projects={data} />} />
            <Route path="/charts" element={<ChartsView projects={data} />} />
            <Route path="/project/:id" element={<ProjectView projects={data} onToggle={handleToggle} />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
