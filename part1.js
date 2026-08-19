/* ===========================================
   DATA LAYER — Task Dashboard
   Defines what a task looks like, and how it's
   saved/loaded from localStorage.
=========================================== */

const STORAGE_KEY = `tasks_${localStorage.getItem("loggedInUser")}`;

const STATUS = {
  IN_PROGRESS: "in-progress",
  COMPLETED: "completed",
  WONT_DO: "wont-do",
};

// Default starter tasks shown on first visit
const DEFAULT_TASKS = [
  {
    id: "1",
    name: "Fitness Run",
    description: "5km run with Gunna.",
    icon: "🏃",
    status: STATUS.IN_PROGRESS,
    createdAt: Date.now(),
  },
  {
    id: "2",
    name: "Drink More Water",
    description: "Aim for at least 2 litres today.",
    icon: "💧",
    status: STATUS.IN_PROGRESS,
    createdAt: Date.now(),
  },
  {
    id: "3",
    name: "Gym Session",
    description: "Upper body workout, 45 mins.",
    icon: "🏋️",
    status: STATUS.WONT_DO,
    createdAt: Date.now(),
  },
  {
    id: "4",
    name: "Meal Prep",
    description: "Prepare healthy meals for the week.",
    icon: "🥗",
    status: STATUS.COMPLETED,
    createdAt: Date.now(),
  },
];

/**
 * Generates a unique-enough ID for a new task.
 */
function generateId() {
  return Date.now().toString() + Math.floor(Math.random() * 1000);
}

/**
 * Saves the full tasks array to localStorage.
 */
function saveTasks(tasks) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (e) {
    console.error("Failed to save tasks:", e);
  }
}

/**
 * Retrieves all tasks from localStorage.
 * If none exist yet (first visit), seeds with default tasks.
 */
function getTasks() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);

    if (!data) {
      // First-time visit — seed with defaults
      saveTasks(DEFAULT_TASKS);
      return DEFAULT_TASKS;
    }

    return JSON.parse(data);
  } catch (e) {
    console.error("Failed to load tasks, resetting to defaults:", e);
    saveTasks(DEFAULT_TASKS);
    return DEFAULT_TASKS;
  }
}

function addTask(taskData = {}) {
  const tasks = getTasks();

  const newTask = {
    id: generateId(),
    name: taskData.name || "New Task",
    description: taskData.description || "",
    icon: taskData.icon || "📝",
    status: taskData.status || STATUS.IN_PROGRESS,
    createdAt: Date.now(),
  };

  tasks.push(newTask);
  saveTasks(tasks);
  return tasks;
}

/**
 * Updates a task by id with the given changes.
 * `updates` is an object like { name: "...", status: "completed" }
 * Returns the updated tasks array.
 */
function updateTask(id, updates) {
  const tasks = getTasks();

  const index = tasks.findIndex((task) => task.id === id);
  if (index === -1) {
    console.warn(`Task with id ${id} not found.`);
    return tasks;
  }

  tasks[index] = { ...tasks[index], ...updates };
  saveTasks(tasks);
  return tasks;
}

/**
 * Deletes a task by id.
 * Returns the updated tasks array.
 */
function deleteTask(id) {
  const tasks = getTasks();
  const updatedTasks = tasks.filter((task) => task.id !== id);
  saveTasks(updatedTasks);
  return updatedTasks;
}
