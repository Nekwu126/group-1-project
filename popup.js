
const popup = document.getElementById('taskPopup');
const closePopupBtn = document.getElementById('closePopupBtn');
const taskForm = document.getElementById('taskForm');
const taskTitleInput = document.getElementById('taskTitle');
const taskDescriptionInput = document.getElementById('taskDescription');
const iconButtons = document.querySelectorAll('.icon-button');
const statusButtons = document.querySelectorAll('.status-button');
const deleteTaskBtn = document.getElementById('deleteTaskBtn');
const saveTaskBtn = document.getElementById('saveTaskBtn');

// --- Track state while the popup is open ---
let currentTaskId = null;   
let selectedIcon = null;
let selectedStatus = null;

// clear all selected highlights
function clearSelections() {
  iconButtons.forEach(btn => btn.classList.remove('selected'));
  statusButtons.forEach(btn => btn.classList.remove('selected'));
}

// highlight the icon/status matching a given task ---
function highlightSelections(icon, status) {
  iconButtons.forEach(btn => {
    if (btn.dataset.icon === icon) btn.classList.add('selected');
  });
  statusButtons.forEach(btn => {
    if (btn.dataset.status === status) btn.classList.add('selected');
  });
}

// Open popup for a NEW task (empty fields) 
function openPopupForNewTask() {
  currentTaskId = null;
  taskTitleInput.value = '';
  taskDescriptionInput.value = '';
  selectedIcon = null;
  selectedStatus = null;
  clearSelections();

  deleteTaskBtn.classList.add('hidden');

  popup.classList.remove('hidden');
}

// Open popup for an EXISTING task (filled with its info) 
function openPopupForEditTask(taskId) {
  const tasks = getTasks(); 
  const task = tasks.find(t => t.id === taskId);

  if (!task) {
    console.warn(`Task with id ${taskId} not found.`);
    return;
  }

  currentTaskId = task.id;
  taskTitleInput.value = task.name;
  taskDescriptionInput.value = task.description;
  selectedIcon = task.icon;
  selectedStatus = task.status;

  clearSelections();
  highlightSelections(task.icon, task.status);

  deleteTaskBtn.classList.remove('hidden'); 

  popup.classList.remove('hidden');
}

// --- Close the popup ---
function closePopup() {
  popup.classList.add('hidden');
}

// --- Icon selection ---
iconButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    iconButtons.forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    selectedIcon = btn.dataset.icon;
  });
});

// --- Status selection ---
statusButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    statusButtons.forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    selectedStatus = btn.dataset.status;
  });
});

// --- Close button (×) ---
closePopupBtn.addEventListener('click', closePopup);

// --- Save (form submit — triggered by clicking the Save button) ---
taskForm.addEventListener('submit', (e) => {
  e.preventDefault(); // stop the page from reloading

  const name = taskTitleInput.value.trim();
  const description = taskDescriptionInput.value.trim();

  if (!name) {
    alert('Task name is required.');
    return;
  }

  const taskData = {
    name,
    description,
    icon: selectedIcon || '📌',
    status: selectedStatus || 'in-progress',
  };

  if (currentTaskId) {
    // Editing an existing task
    updateTask(currentTaskId, taskData);
  } else {
    // Creating a new task
    addTask(taskData); 
  }

  // Tell the board to re-render (boaard.js is listening for this)
  document.dispatchEvent(new CustomEvent('tasks:changed'));

  closePopup();
});

// --- Delete ---
deleteTaskBtn.addEventListener('click', () => {
  if (!currentTaskId) return; 

  const confirmed = confirm('Delete this task?');
  if (!confirmed) return;

  deleteTask(currentTaskId); 

  document.dispatchEvent(new CustomEvent('tasks:changed'));

  closePopup();
});

// --- Listen for events fired by board.js ---
document.addEventListener('task:add', () => {
  openPopupForNewTask();
});

document.addEventListener('task:open', (event) => {
  const { taskId } = event.detail;
  openPopupForEditTask(taskId);
});