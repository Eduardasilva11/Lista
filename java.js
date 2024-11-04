const taskInput = document.getElementById('new-task');
const startDateInput = document.getElementById('start-date');
const endDateInput = document.getElementById('end-date');
const addButton = document.getElementById('add-task');
const clearButton = document.getElementById('clear-tasks');
const taskList = document.getElementById('task-list');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Função para renderizar a lista de tarefas
function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = `${task.name} - Início: ${task.startDate} - Término: ${task.endDate}`;
        li.className = task.completed ? 'completed' : '';
        
        const completeButton = document.createElement('button');
        completeButton.textContent = task.completed ? 'Reverter' : 'Concluir';
        completeButton.onclick = () => toggleTask(index);
        
        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.onclick = () => editTask(index);

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remover';
        removeButton.onclick = () => removeTask(index);

        li.appendChild(completeButton);
        li.appendChild(editButton);
        li.appendChild(removeButton);
        taskList.appendChild(li);
    });
}

// Função para adicionar uma tarefa
function addTask() {
    if (taskInput.value.trim() && startDateInput.value && endDateInput.value) {
        tasks.push({
            name: taskInput.value.trim(),
            startDate: startDateInput.value,
            endDate: endDateInput.value,
            completed: false
        });
        taskInput.value = '';
        startDateInput.value = '';
        endDateInput.value = '';
        saveTasks();
        renderTasks();
    } else {
        alert('Por favor, adicione uma tarefa e selecione as datas.');
    }
}

// Função para editar uma tarefa
function editTask(index) {
    const newName = prompt("Editar tarefa:", tasks[index].name);
    const newStartDate = prompt("Editar data de início:", tasks[index].startDate);
    const newEndDate = prompt("Editar data de término:", tasks[index].endDate);
    if (newName !== null && newStartDate !== null && newEndDate !== null) {
        tasks[index].name = newName.trim();
        tasks[index].startDate = newStartDate;
        tasks[index].endDate = newEndDate;
        saveTasks();
        renderTasks();
    }
}

// Função para marcar uma tarefa como concluída
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

// Função para remover uma tarefa
function removeTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

// Função para limpar a lista de tarefas
function clearTasks() {
    tasks = [];
    saveTasks();
    renderTasks();
}

// Função para salvar tarefas no localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Eventos
addButton.onclick = addTask;
clearButton.onclick = clearTasks;
window.onload = renderTasks;

