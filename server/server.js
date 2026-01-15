const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const supabase = require('./database');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
        methods: ["GET", "POST", "PUT"],
        credentials: true
    }
});

// --- REST API Endpoints ---

// 1. Get FULL Dashboard Data (Hierarchy)
// Returns all projects with nested categories and tasks, including calculated progress
app.get('/api/data', async (req, res) => {
    try {
        // Fetch Projects
        const { data: projects, error: pErr } = await supabase
            .from('projects')
            .select('*');

        if (pErr) throw pErr;

        // Fetch Categories
        const { data: categories, error: cErr } = await supabase
            .from('categories')
            .select('*');

        if (cErr) throw cErr;

        // Fetch Tasks
        const { data: tasks, error: tErr } = await supabase
            .from('tasks')
            .select('*');

        if (tErr) throw tErr;

        // Construct Hierarchy: Projects > Categories > Tasks
        const fullData = projects.map(p => {
            const projectCats = categories.filter(c => c.project_id === p.id);
            const catsWithTasks = projectCats.map(c => {
                return {
                    ...c,
                    tasks: tasks.filter(t => t.category_id === c.id)
                };
            });

            // Calculate Progress: percentage of completed tasks
            const allTasks = catsWithTasks.flatMap(c => c.tasks);
            const completed = allTasks.filter(t => t.completed === true || t.completed === 1).length;
            const total = allTasks.length;
            const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

            return { ...p, categories: catsWithTasks, completed_count: completed, total_count: total, progress };
        });

        res.json({ message: "success", data: fullData });
    } catch (err) {
        console.error("Error fetching data:", err.message);
        res.status(500).json({ error: err.message });
    }
});

// 2. Toggle Task Check
app.put('/api/tasks/:id/toggle', async (req, res) => {
    const id = req.params.id;
    const { completed } = req.body;

    // Input validation
    if (!id || !Number.isInteger(Number(id)) || Number(id) <= 0) {
        return res.status(400).json({ error: 'Invalid task ID' });
    }

    if (typeof completed !== 'boolean') {
        return res.status(400).json({ error: 'completed must be a boolean value' });
    }

    try {
        const { data, error } = await supabase
            .from('tasks')
            .update({ completed })
            .eq('id', id)
            .select();

        if (error) throw error;

        io.emit('taskUpdated', { id, completed }); // Notify all clients
        res.json({ message: "updated", id, completed });
    } catch (err) {
        console.error("Error toggling task:", err.message);
        res.status(400).json({ error: err.message });
    }
});

// --- Socket.io Handlers ---
io.on('connection', (socket) => {
    console.log('User connected', socket.id);
    socket.on('disconnect', () => {
        console.log('User disconnected', socket.id);
    });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
