async function getTasks() {
    const response = await fetch('http://localhost:3000/todos');
    const tasks = await response.json();
    const currentFilter = sessionStorage.getItem('filter') || 'all';
    // Aquí filtras las tasks según currentFilter y renderizas al DOM
}

async function addTask(title) {
    await fetch('http://localhost:3000/todos', {
        method: 'POST',
        body: JSON.stringify({ title, completed: false }),
        headers: { 'Content-type': 'application/json' }
    });
    getTasks(); // Recargar interfaz
}
