const API_URL = 'http://localhost:3000/todos';
const taskList = document.getElementById('task-list');
const taskInput = document.getElementById('task-input');

// 1. Cargar datos al iniciar
document.addEventListener('DOMContentLoaded', () => {
    applyDarkMode();
    renderTasks();
});

// 2. Obtener y Filtrar Tareas (GET + sessionStorage)
async function renderTasks() {
    const res = await fetch(API_URL);
    const tasks = await res.json();
    const filter = sessionStorage.getItem('filter') || 'all';

    taskList.innerHTML = '';
    
    tasks.filter(t => {
        if(filter === 'pending') return !t.completed;
        if(filter === 'completed') return t.completed;
        return true;
    }).forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span style="text-decoration: ${task.completed ? 'line-through' : 'none'}">${task.title}</span>
            <button onclick="toggleTask('${task.id}', ${task.completed})">✔</button>
            <button onclick="deleteTask('${task.id}')">🗑</button>
        `;
        taskList.appendChild(li);
    });
}

// 3. Crear Tarea (POST)
document.getElementById('add-btn').onclick = async () => {
    const title = taskInput.value;
    if(!title) return;
    await fetch(API_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ title, completed: false })
    });
    taskInput.value = '';
    renderTasks();
};

// 4. Actualizar (PATCH) y Eliminar (DELETE)
async function toggleTask(id, status) {
    await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ completed: !status })
    });
    renderTasks();
}

async function deleteTask(id) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    renderTasks();
}

// 5. Filtros (sessionStorage)
function setFilter(filter) {
    sessionStorage.setItem('filter', filter);
    renderTasks();
}

// 6. Modo Oscuro (localStorage)
document.getElementById('toggle-dark').onclick = () => {
    const isDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', isDark);
};

function applyDarkMode() {
    if(localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }
}
